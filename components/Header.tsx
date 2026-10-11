'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Logo from './Logo';
import { CloseIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from './icons';
import { site, whatsappLink, type Locale } from '@/content/site';
import { t } from '@/content/ui';
import { href, otherLocale, switchLocalePath } from '@/lib/locale';
import { services } from '@/content/services';

/**
 * Sticky site header.
 *
 * It stays fully transparent for as long as it overlaps the dark hero scene
 * (`#hero-scene`), and turns solid white the moment that scene scrolls past —
 * which is exactly where the services section begins. Measuring the scene
 * rather than a fixed scroll offset keeps the two in step however tall the
 * hero grows.
 * `solidOnly` forces the solid treatment on pages without a dark hero.
 */
export default function Header({ locale, solidOnly = false }: { locale: Locale; solidOnly?: boolean }) {
  const d = t(locale);
  const pathname = usePathname();
  // Starts true so the first paint over the hero is transparent, not a flash of white.
  const [overDark, setOverDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  // Query string of the current URL, so switching language keeps it (?video=1,
  // utm_* and anything else). Read after mount rather than with
  // useSearchParams, which would opt every page out of static rendering.
  const [search, setSearch] = useState('');

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const scene = document.getElementById('hero-scene');
      if (!scene) {
        setOverDark(false);
        return;
      }
      // The header still sits over the scene while the scene's bottom edge is
      // below the header's own height.
      const headerHeight = headerRef.current?.offsetHeight ?? 76;
      setOverDark(scene.getBoundingClientRect().bottom > headerHeight);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  // Close the menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
    setSearch(window.location.search);
  }, [pathname]);

  // Lock background scroll while the mobile menu is open.
  //
  // This is the one thing on the page that can leave scrolling stuck, so the
  // lock is released defensively: on close, on unmount, on route change, and
  // if the viewport grows past the breakpoint where the menu exists at all.
  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    const desktop = window.matchMedia('(min-width: 1024px)');
    const onBreakpoint = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener('change', onBreakpoint);

    return () => {
      desktop.removeEventListener('change', onBreakpoint);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setServicesOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Only the homepage has a dark hero behind the header; everywhere else the
  // header must be solid from the top or the white logo would vanish.
  const isHome = pathname === href(locale) || pathname === `${href(locale)}/`;
  const solid = solidOnly || !isHome || !overDark || menuOpen;

  const nav = [
    { label: d.nav.home, path: '' },
    { label: d.nav.services, path: 'services' },
    { label: d.nav.locations, path: 'locations' },
    { label: d.nav.about, path: 'about' },
    { label: d.nav.contact, path: 'contact' },
  ];

  const isActive = (path: string) => {
    const full = href(locale, path);
    return path === '' ? pathname === full : pathname.startsWith(full);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? 'border-b border-navy/[0.07] bg-white/95 shadow-soft backdrop-blur-md'
          : // Completely bare over the hero — no bar, no scrim, no edge. A
            // gradient here reads as a visible band against the footage.
            'border-b-0 bg-transparent'
      }`}
    >
      <div className="container-page flex h-[76px] items-center justify-between gap-3">
        <Logo locale={locale} height={46} priority variant={solid ? 'dark' : 'light'} />

        {/*
          Over the hero the header is reduced to logo + language + WhatsApp.
          The links fade in with the solid bar once the hero scene is behind
          us. Kept mounted (not unmounted) so the change animates and so the
          links stay in the DOM for crawlers.
        */}
        <nav
          className={`hidden items-center gap-0.5 transition-all duration-300 lg:flex ${
            solid ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'
          }`}
          aria-hidden={!solid}
          aria-label="Main"
        >
          {nav.map((item) => (
            <div
              key={item.path}
              className="relative"
              onMouseEnter={() => item.path === 'services' && setServicesOpen(true)}
              onMouseLeave={() => item.path === 'services' && setServicesOpen(false)}
            >
              <Link
                href={href(locale, item.path)}
                aria-current={isActive(item.path) ? 'page' : undefined}
                className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  solid
                    ? isActive(item.path)
                      ? 'text-gold-dark'
                      : 'text-navy hover:text-gold-dark'
                    : isActive(item.path)
                      ? 'text-gold-light'
                      : 'text-white/90 hover:text-gold-light'
                }`}
              >
                {item.label}
              </Link>

              {item.path === 'services' && servicesOpen && (
                <div className="absolute start-1/2 top-full w-[36rem] -translate-x-1/2 pt-3 rtl:translate-x-1/2">
                  <div className="grid grid-cols-2 gap-0.5 rounded-2xl border border-navy/[0.07] bg-white p-3 shadow-lift">
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        href={href(locale, `services/${s.slug}`)}
                        className="rounded-lg px-3 py-2 text-[13px] text-slateblue transition-colors hover:bg-cream hover:text-navy"
                      >
                        {s[locale].name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={`${switchLocalePath(pathname, otherLocale(locale))}${search}`}
            hrefLang={otherLocale(locale)}
            lang={otherLocale(locale)}
            className={`rounded-lg border px-2.5 py-2 text-xs font-semibold tracking-wider transition-colors ${
              solid
                ? 'border-navy/15 text-navy hover:border-gold hover:text-gold-dark'
                : 'border-white/30 text-white hover:border-gold-light hover:text-gold-light'
            }`}
          >
            {d.otherLangName}
          </Link>

          <a
            href={whatsappLink(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold hidden px-5 py-2.5 text-[13px] sm:inline-flex"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {d.cta.whatsapp}
          </a>

          <a
            href={`tel:${site.phoneHref}`}
            className={`rounded-lg p-2.5 transition-colors sm:hidden ${solid ? 'text-navy' : 'text-white'}`}
            aria-label={d.cta.call}
          >
            <PhoneIcon className="h-5 w-5" />
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className={`rounded-lg p-2.5 transition-colors lg:hidden ${solid ? 'text-navy' : 'text-white'}`}
          >
            {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100dvh-76px)] overflow-y-auto border-t border-navy/[0.07] bg-white lg:hidden"
        >
          <nav
            className="container-page flex flex-col py-3"
            aria-label="Mobile"
            onClick={(e) => {
              // Covers links to the route you are already on, where the
              // pathname never changes and the close effect would not fire.
              if ((e.target as HTMLElement).closest('a')) setMenuOpen(false);
            }}
          >
            {nav.map((item) => (
              <Link
                key={item.path}
                href={href(locale, item.path)}
                className="border-b border-navy/[0.06] py-3.5 text-[15px] font-medium text-navy"
              >
                {item.label}
              </Link>
            ))}

            <details className="border-b border-navy/[0.06]">
              <summary className="cursor-pointer list-none py-3.5 text-[15px] font-medium text-navy">
                {d.cta.allServices}
              </summary>
              <div className="flex flex-col pb-2">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={href(locale, `services/${s.slug}`)}
                    className="py-2 ps-3 text-sm text-slateblue"
                  >
                    {s[locale].name}
                  </Link>
                ))}
              </div>
            </details>

            <div className="mt-5 flex flex-col gap-3 pb-6">
              <a href={whatsappLink(locale)} target="_blank" rel="noopener noreferrer" className="btn-gold">
                <WhatsAppIcon className="h-4 w-4" />
                {d.cta.whatsapp}
              </a>
              <a href={`tel:${site.phoneHref}`} className="btn-outline">
                <PhoneIcon className="h-4 w-4" />
                {site.phone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
