'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

/**
 * Next's router works in paths WITHOUT the deployment base path — it adds it
 * back itself — while `location.pathname` and `anchor.href` include it. Mixing
 * the two pushes /Doc-Clearence/Doc-Clearence/... and the navigation silently
 * does nothing.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const stripBase = (path: string) =>
  basePath && path.startsWith(basePath) ? path.slice(basePath.length) || '/' : path;

/**
 * Cross-fades between pages using the View Transitions API.
 *
 * The native `@view-transition` CSS rule only covers full document loads, and
 * Next navigates on the client, so the transition has to be driven by hand:
 * intercept the click, start a transition, and hold it open until the new
 * route has actually rendered.
 *
 * Mounted once in the layout rather than by swapping every `<Link>`, so no
 * call site has to change and nothing breaks if this is removed.
 *
 * Degrades silently: browsers without `startViewTransition` (Firefox and
 * Safari before 18) navigate exactly as before, and the animation is disabled
 * outright under prefers-reduced-motion via CSS.
 */
export default function ViewTransitions() {
  const router = useRouter();
  const pathname = usePathname();

  /** Resolves once the new route has painted, ending the transition. */
  const finish = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (!('startViewTransition' in document)) return;

    const onClick = (event: MouseEvent) => {
      // Leave anything that isn't a plain left-click alone: modifier clicks
      // open tabs and windows, and hijacking those is infuriating.
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      if (event.defaultPrevented) return;

      const anchor = (event.target as HTMLElement)?.closest?.('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Skip new tabs, downloads, and anything that is not an internal page:
      // mailto:, tel:, wa.me and the rest must behave normally.
      if (anchor.target && anchor.target !== '_self') return;
      if (anchor.hasAttribute('download')) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;

      // In-page anchors (the skip link, #services) should just scroll.
      if (url.pathname === window.location.pathname && url.hash) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;

      // Leave language switching alone. It re-renders <html lang dir>, and
      // changing the root element mid-transition aborts it with
      // InvalidStateError — which swallowed the navigation entirely. A
      // cross-fade is worth little there in any case, since the whole page
      // changes direction.
      const localeOf = (path: string) => stripBase(path).split('/').filter(Boolean)[0];
      if (localeOf(url.pathname) !== localeOf(window.location.pathname)) return;

      event.preventDefault();

      // Next's own Link handler bails when the event is already prevented, so
      // from here the navigation is ours to make.
      const transition = (document as Document & {
        startViewTransition: (cb: () => Promise<void>) => {
          ready: Promise<void>;
          updateCallbackDone: Promise<void>;
          finished: Promise<void>;
        };
      }).startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            // A view transition holds the old frame on screen until this
            // resolves, so a slow route would look like a frozen page. Cap the
            // wait: past this the new page simply appears without the fade,
            // which is far better than an unresponsive one.
            const bail = window.setTimeout(() => {
              finish.current = null;
              resolve();
            }, 500);

            finish.current = () => {
              window.clearTimeout(bail);
              resolve();
            };

            router.push(stripBase(url.pathname) + url.search + url.hash);
          }),
      );

      // A transition exposes three promises and every one of them rejects when
      // it is skipped — which is routine: a second click, a tab switch, or a
      // hot reload in development all do it. Unhandled, they surface as
      // "AbortError: Transition was skipped" in the console. Swallow all
      // three, and make sure nothing is left holding the old frame.
      const settle = () => {
        finish.current = null;
      };
      transition.ready.catch(settle);
      transition.updateCallbackDone.catch(settle);
      transition.finished.catch(settle);
    };

    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, [router]);

  // The route has rendered — release the transition so it can animate.
  useEffect(() => {
    if (finish.current) {
      finish.current();
      finish.current = null;
    }
  }, [pathname]);

  return null;
}
