'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/content/site';
import { t } from '@/content/ui';
import { href } from '@/lib/locale';

const KEY = 'gn-cookie-consent';

/**
 * Minimal cookie consent banner.
 * Essential cookies always run; analytics are only enabled after an explicit
 * "accept". The choice is stored in localStorage under `gn-cookie-consent`.
 */
export default function CookieBanner({ locale }: { locale: Locale }) {
  const d = t(locale);
  const [show, setShow] = useState(false);
  const banner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      // Storage blocked (private mode) — do not nag on every page view.
    }
  }, []);

  /**
   * The floating WhatsApp button sits in the same corner and was hidden
   * behind this banner. Rather than have it guess an offset — the banner is
   * one line on a desktop and three on a narrow phone — publish the measured
   * height as a custom property for anything that needs to sit clear of it.
   * Neither component has to import the other.
   */
  useEffect(() => {
    const root = document.documentElement;
    const el = banner.current;
    if (!el) {
      root.style.setProperty('--gn-cookie-banner', '0px');
      return;
    }
    const publish = () => root.style.setProperty('--gn-cookie-banner', `${el.offsetHeight}px`);
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(el);
    return () => {
      observer.disconnect();
      root.style.setProperty('--gn-cookie-banner', '0px');
    };
  }, [show]);

  const decide = (value: 'accepted' | 'declined') => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    setShow(false);
    // Hook your analytics loader here when value === 'accepted'.
    window.dispatchEvent(new CustomEvent('gn:cookie-consent', { detail: value }));
  };

  if (!show) return null;

  return (
    <div
      ref={banner}
      role="dialog"
      aria-live="polite"
      aria-label={d.cookies.policy}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-navy/10 bg-white/97 shadow-lift backdrop-blur-md"
    >
      <div className="container-page flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-slateblue">
          {d.cookies.text}{' '}
          <Link href={href(locale, 'privacy')} className="font-medium text-navy underline underline-offset-4">
            {d.cookies.policy}
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button type="button" onClick={() => decide('declined')} className="btn-outline px-5 py-2.5 text-[13px]">
            {d.cookies.decline}
          </button>
          <button type="button" onClick={() => decide('accepted')} className="btn-gold px-5 py-2.5 text-[13px]">
            {d.cookies.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
