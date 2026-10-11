import { locales, type Locale } from '@/content/site';

export const defaultLocale: Locale = 'en';

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** Build a locale-prefixed path: href('ar', '/services') -> '/ar/services' */
export const href = (locale: Locale, path = '') => {
  const clean = path.replace(/^\/+/, '');
  return clean ? `/${locale}/${clean}` : `/${locale}`;
};

/** Swap the locale on the current pathname, preserving the rest of the route. */
export const switchLocalePath = (pathname: string, next: Locale) => {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return `/${next}`;
  if (isLocale(parts[0])) {
    parts[0] = next;
    return `/${parts.join('/')}`;
  }
  return `/${next}/${parts.join('/')}`;
};

export const otherLocale = (locale: Locale): Locale => (locale === 'en' ? 'ar' : 'en');

export type { Locale };
