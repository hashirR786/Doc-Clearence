import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { Inter, Playfair_Display, IBM_Plex_Sans_Arabic } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import CookieBanner from '@/components/CookieBanner';
import JsonLd from '@/components/JsonLd';
import { locales, site, type Locale } from '@/content/site';
import { t } from '@/content/ui';
import { isLocale } from '@/lib/locale';
import { localBusinessSchema, organizationSchema } from '@/lib/seo';
import '../globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-arabic',
  weight: ['400', '500', '600'],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport = {
  themeColor: '#0A1F44',
  width: 'device-width',
  initialScale: 1,
};

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const d = t(locale);

  return (
    /*
      suppressHydrationWarning on <html> and <body>:
      browser extensions (QuillBot, Grammarly, password managers, dark-mode
      tools) inject attributes such as data-qb-installed onto these two
      elements before React hydrates. React sees the mismatch, throws away the
      server HTML and re-renders the whole tree on the client, which tears down
      and rebuilds every effect — including the ScrollTrigger instances driving
      the scrubbed videos. The result looks like the scroll animation randomly
      dying on some visits. This only silences the warning for these two
      elements' own attributes; real mismatches inside the app still surface.
    */
    <html
      lang={locale}
      dir={d.dir}
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable} ${arabic.variable}`}
    >
      <body suppressHydrationWarning className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[60]
                     focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          {d.skipToContent}
        </a>

        <Header locale={locale} />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer locale={locale} />
        <FloatingWhatsApp locale={locale} />
        <CookieBanner locale={locale} />

        <JsonLd data={[organizationSchema(), localBusinessSchema(locale)]} />
      </body>
    </html>
  );
}

export const metadata = {
  metadataBase: new URL(site.url),
  icons: { icon: '/icon.png', apple: '/apple-icon.png' },
};
