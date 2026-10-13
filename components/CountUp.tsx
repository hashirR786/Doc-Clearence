'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Counts a figure up from zero the first time it scrolls into view.
 *
 * Takes the display string straight from content (`20+`, `15,000+`) rather
 * than a number, so the editable copy stays human-readable and any prefix,
 * suffix or thousands separator is preserved exactly as written.
 *
 * The server renders the final value, so the real figure is in the HTML for
 * search engines and for anyone without JavaScript. The count only replaces
 * it once the component has mounted, and is skipped entirely when the visitor
 * has asked for reduced motion.
 */
export default function CountUp({
  value,
  className = '',
  durationMs = 1800,
}: {
  value: string;
  className?: string;
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Split "15,000+" into "" / 15000 / "+", remembering whether the written
    // form groups thousands so the count matches it while it runs.
    const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
    if (!match) return;

    const [, prefix, digits, suffix] = match;
    const grouped = digits.includes(',');
    const target = Number(digits.replace(/,/g, ''));
    if (!isFinite(target) || target <= 0) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const format = (n: number) =>
      `${prefix}${grouped ? n.toLocaleString('en-US') : String(n)}${suffix}`;

    // Reset before it is on screen. The strip sits below the fold, so this
    // never shows as a flash of the final number.
    setDisplay(format(0));

    let frame = 0;
    let startedAt = 0;

    const tick = (now: number) => {
      if (!startedAt) startedAt = now;
      const progress = Math.min((now - startedAt) / durationMs, 1);
      // easeOutExpo: fast off the mark, then settling — reads as counting up
      // rather than sliding linearly.
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(format(Math.round(target * eased)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          frame = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value, durationMs]);

  return (
    // tabular-nums keeps the digits from jostling as the count climbs.
    <span ref={ref} className={`tabular-nums ${className}`}>
      {display}
    </span>
  );
}
