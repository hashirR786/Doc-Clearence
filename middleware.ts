import { NextResponse, type NextRequest } from 'next/server';
import { locales } from '@/content/site';

const PUBLIC_FILE = /\.(.*)$/;

/**
 * Routes every request to a locale-prefixed path.
 * The locale is taken from a previously set cookie, then from Accept-Language,
 * and falls back to English.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  const headerLocale = request.headers.get('accept-language')?.toLowerCase().startsWith('ar')
    ? 'ar'
    : 'en';
  const locale = locales.includes(cookieLocale as (typeof locales)[number])
    ? cookieLocale
    : headerLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|.*\..*).*)'],
};
