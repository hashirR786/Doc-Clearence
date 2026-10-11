'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { assetPath } from '@/lib/asset';

interface ScrollVideoSceneProps {
  /** Compressed MP4 with dense keyframes — see public/video/README.md */
  src: string;
  /** Lighter encode of the same footage, served below 768px. */
  srcMobile?: string;
  /** Shown before load, on mobile, on slow links and with reduced motion. */
  poster: string;
  /** false renders the poster only, with no video request. */
  enabled?: boolean;
  /** Veil over the footage: 'navy' for light text, 'cream' for dark text. */
  overlay?: 'navy' | 'cream';
  /** Background behind the scene, used until the poster paints. */
  className?: string;
  /** Content that scrolls over the video. */
  children: ReactNode;
  /** DOM id — the header reads `#hero-scene` to know when it is over dark footage. */
  id?: string;
  /**
   * Load the video only once the scene is close to the viewport. Leave false
   * for an above-the-fold scene so the footage is ready when it is needed.
   */
  lazy?: boolean;
}

/**
 * A section with a scroll-scrubbed video behind it.
 *
 * The video sits in a sticky, viewport-tall layer inside the section, and its
 * `currentTime` is mapped across the section's own scroll range: the first
 * frame when the section's top reaches the top of the viewport, the last frame
 * when its bottom reaches the bottom. The footage therefore plays across
 * exactly the distance it is on screen for — make the section taller and the
 * animation lasts longer.
 *
 * Falls back to the static poster when:
 *  - prefers-reduced-motion is set
 *  - the viewport is narrow (mobile)
 *  - the connection is slow or Data Saver is on
 *  - the file is missing or cannot decode
 *  - `enabled` is false
 *
 * Append ?video=1 to the URL to force the video on for previewing.
 */
export default function ScrollVideoScene({
  src,
  srcMobile,
  poster,
  enabled = true,
  overlay = 'navy',
  className = '',
  children,
  lazy = false,
  id,
}: ScrollVideoSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useVideo, setUseVideo] = useState(false);
  // Small screens get a much lighter encode of the same footage.
  const [small, setSmall] = useState(false);
  const activeSrc = small && srcMobile ? srcMobile : src;
  const [near, setNear] = useState(!lazy);
  const [failed, setFailed] = useState(false);

  // Hold off on fetching a below-the-fold scene until it is approaching.
  useEffect(() => {
    if (!lazy || near) return;
    const el = sceneRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setNear(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [lazy, near]);

  // Decide once whether this device should load the video at all.
  useEffect(() => {
    if (!enabled || !near) return;

    // ?video=1 forces the video on so the effect can be previewed from a
    // device or connection that would otherwise fall back to the poster.
    // Remembered for the tab so it survives client-side navigation.
    try {
      if (new URLSearchParams(window.location.search).get('video') === '1') {
        sessionStorage.setItem('gn-force-video', '1');
      }
      if (sessionStorage.getItem('gn-force-video') === '1') {
        setUseVideo(true);
        return;
      }
    } catch {
      // Storage blocked — fall through to the normal heuristics.
      if (new URLSearchParams(window.location.search).get('video') === '1') {
        setUseVideo(true);
        return;
      }
    }

    /**
     * Only two things switch the video off now.
     *
     * `prefers-reduced-motion` is an accessibility preference and is always
     * honoured. Save-Data is an explicit request to spare the user's
     * bandwidth, so it is too.
     *
     * `navigator.connection.effectiveType` is deliberately NOT consulted. It
     * is derived from recently observed throughput, so it swings between
     * values on a single connection — and because this check runs once while
     * the rest of the page is still downloading, it made the whole effect
     * appear intermittent: working on one load, silently falling back to the
     * poster on the next. Bandwidth is handled instead by serving a much
     * smaller file to small screens, and the poster covers the wait either
     * way.
     */
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;

    setSmall(window.matchMedia('(max-width: 767px)').matches);
    setUseVideo(!reduced && conn?.saveData !== true);
  }, [enabled, near]);

  // Map the playhead onto the scene's scroll range.
  useEffect(() => {
    if (!useVideo || failed) return;
    const video = videoRef.current;
    const scene = sceneRef.current;
    if (!video || !scene) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      // `loadedmetadata` may already have fired while the imports resolved, so
      // start as soon as a duration exists and otherwise wait for either
      // event — relying on one of them alone is a race on client-side
      // navigation, where the file is usually served from cache.
      let started = false;
      let disposeTween: (() => void) | undefined;

      const start = () => {
        if (started || cancelled) return;
        const duration = video.duration;
        if (!duration || !isFinite(duration)) return;
        started = true;

        /**
         * Prime, then pause.
         *
         * Scrubbing is smoother on a paused element, but iOS Safari will not
         * paint a frame for a video that has never played — seeking a
         * never-played element leaves the poster frozen on screen. Starting
         * playback for an instant and immediately pausing gets the decoder
         * going so subsequent seeks actually render. It is allowed without a
         * gesture because the element is muted and playsinline; if the
         * browser refuses anyway, the catch keeps the scrub working on every
         * platform that does not need this.
         */
        const primed = video.play();
        if (primed && typeof primed.then === 'function') {
          primed.then(() => video.pause()).catch(() => video.pause());
        } else {
          video.pause();
        }

        /**
         * Push the scrubbed time onto the element.
         *
         * Two cases have to be handled or the video silently stops following
         * the scroll:
         *  - while the file is still loading (readyState 0, which is normal
         *    right after a client-side navigation) the browser discards
         *    currentTime writes, and nothing re-fires once it is ready if the
         *    page has stopped scrolling;
         *  - while a seek is in flight, further writes queue up the decoder
         *    and the scrub stutters.
         * In both cases the write is deferred and replayed from the matching
         * media event, always targeting the newest scroll position.
         */
        const applySeek = () => {
          if (video.readyState < 1 || video.seeking) return;
          if (Math.abs(video.currentTime - state.time) < 0.02) return;
          video.currentTime = state.time;
        };

        // `scrub` only takes effect on a ScrollTrigger attached to an
        // animation, so tween a proxy object and mirror it onto currentTime.
        const state = { time: 0 };
        const tween = gsap.to(state, {
          time: duration,
          ease: 'none',
          scrollTrigger: {
            trigger: scene,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
          onUpdate: () => applySeek(),
        });

        // Replay the latest position whenever the element becomes able to
        // honour a seek again.
        video.addEventListener('seeked', applySeek);
        video.addEventListener('loadeddata', applySeek);
        video.addEventListener('canplay', applySeek);

        // Measure once the route has actually settled. Refreshing inline is
        // unreliable after a client-side navigation, where Next is still
        // laying out and restoring scroll — the trigger ends up measuring a
        // page that no longer matches and never updates.
        const refresh = () => ScrollTrigger.refresh();
        const raf = requestAnimationFrame(refresh);
        window.addEventListener('load', refresh);

        // Fonts and lazy images change the scene's height after first paint.
        const observer =
          typeof ResizeObserver !== 'undefined'
            ? new ResizeObserver(() => ScrollTrigger.refresh())
            : null;
        observer?.observe(scene);

        disposeTween = () => {
          video.removeEventListener('seeked', applySeek);
          video.removeEventListener('loadeddata', applySeek);
          video.removeEventListener('canplay', applySeek);
          cancelAnimationFrame(raf);
          window.removeEventListener('load', refresh);
          observer?.disconnect();
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      };

      start();
      video.addEventListener('loadedmetadata', start);
      video.addEventListener('durationchange', start);
      video.addEventListener('canplay', start);

      cleanup = () => {
        video.removeEventListener('loadedmetadata', start);
        video.removeEventListener('durationchange', start);
        video.removeEventListener('canplay', start);
        disposeTween?.();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [useVideo, failed, activeSrc]);

  const showVideo = useVideo && !failed;
  const veil = overlay === 'navy' ? 'bg-navy-veil' : 'bg-cream-veil';

  return (
    <div id={id} ref={sceneRef} className={`relative isolate ${className}`}>
      {/*
        Sticky media layer: viewport-tall, pinned for the length of the scene.
        This wrapper must NOT set `overflow` — any scrollable ancestor becomes
        the sticky element's scroll container and the pin silently stops
        working. The sticky child is exactly one viewport tall inside a
        full-height parent, so it stays within the scene without clipping.
      */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          {showVideo ? (
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              poster={assetPath(poster)}
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              onError={() => setFailed(true)}
            >
              <source src={assetPath(activeSrc)} type="video/mp4" />
            </video>
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={assetPath(poster)}
              alt=""
              className="h-full w-full object-cover"
              fetchPriority={lazy ? 'auto' : 'high'}
              loading={lazy ? 'lazy' : 'eager'}
            />
          )}

          <div className={`absolute inset-0 ${veil}`} />
        </div>
      </div>

      {/* Content scrolls over the media layer. */}
      <div className="relative">{children}</div>
    </div>
  );
}
