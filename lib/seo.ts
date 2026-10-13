import type { Metadata } from 'next';
import { site, type Locale } from '@/content/site';
import { href } from './locale';

interface MetaArgs {
  locale: Locale;
  /** Path without locale prefix, e.g. 'services/pro-services' */
  path?: string;
  title: string;
  description: string;
  keywords?: string[];
  /** Set to true for pages that should not be indexed. */
  noindex?: boolean;
  type?: 'website' | 'article';
  publishedTime?: string;
}

/**
 * Builds page metadata with canonical URL, hreflang alternates,
 * Open Graph and Twitter cards.
 */
export function buildMetadata({
  locale,
  path = '',
  title,
  description,
  keywords,
  noindex,
  type = 'website',
  publishedTime,
}: MetaArgs): Metadata {
  const url = `${site.url}${href(locale, path)}`;
  const enUrl = `${site.url}${href('en', path)}`;
  const arUrl = `${site.url}${href('ar', path)}`;

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(site.url),
    alternates: {
      canonical: url,
      languages: {
        en: enUrl,
        ar: arUrl,
        'x-default': enUrl,
      },
    },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: site.legalName,
      locale: locale === 'ar' ? 'ar_AE' : 'en_AE',
      alternateLocale: locale === 'ar' ? 'en_AE' : 'ar_AE',
      images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: site.legalName }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/og-image.png'],
    },
  };
}

/* ---------------------------------------------------------------- *
 * JSON-LD builders
 * ---------------------------------------------------------------- */

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: `${site.address.street}, ${site.address.district}`,
  addressLocality: site.address.locality,
  addressRegion: site.address.region,
  // Omit rather than publish a placeholder — the UAE rarely uses postcodes.
  ...(site.address.postalCode.startsWith('[') ? {} : { postalCode: site.address.postalCode }),
  addressCountry: site.address.country,
};

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${site.url}/#organization`,
  name: site.legalName,
  alternateName: site.shortName,
  url: site.url,
  logo: `${site.url}/images/logo.png`,
  email: site.email,
  telephone: site.phone,
  address: postalAddress,
  sameAs: Object.values(site.social).filter((v) => !v.startsWith('[')),
});

export const localBusinessSchema = (locale: Locale) => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${site.url}/#localbusiness`,
  name: site.legalName,
  alternateName: site.shortName,
  description:
    locale === 'ar'
      ? 'شركة خاصة لتخليص المستندات والطباعة وخدمات العلاقات العامة في الإمارات.'
      : 'Private document clearance, typing centre and PRO services company in the UAE.',
  url: `${site.url}${href(locale)}`,
  image: `${site.url}/images/logo.png`,
  logo: `${site.url}/images/logo.png`,
  telephone: site.phone,
  email: site.email,
  priceRange: '$$',
  address: postalAddress,
  geo: {
    '@type': 'GeoCoordinates',
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  openingHoursSpecification: site.openingHours.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  })),
  // All seven emirates named individually. The country entry alone would be
  // true, but naming each one gives Google an explicit signal for searches
  // like "document clearance Ajman".
  areaServed: [
    { '@type': 'City', name: 'Dubai' },
    { '@type': 'City', name: 'Abu Dhabi' },
    { '@type': 'City', name: 'Sharjah' },
    { '@type': 'City', name: 'Ajman' },
    { '@type': 'City', name: 'Ras Al Khaimah' },
    { '@type': 'City', name: 'Fujairah' },
    { '@type': 'City', name: 'Umm Al Quwain' },
    { '@type': 'Country', name: 'United Arab Emirates' },
  ],
  sameAs: Object.values(site.social).filter((v) => !v.startsWith('[')),
});

export const serviceSchema = (opts: {
  locale: Locale;
  name: string;
  description: string;
  slug: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: opts.name,
  description: opts.description,
  serviceType: opts.name,
  url: `${site.url}${href(opts.locale, `services/${opts.slug}`)}`,
  provider: {
    '@type': 'ProfessionalService',
    '@id': `${site.url}/#localbusiness`,
    name: site.legalName,
    telephone: site.phone,
    address: postalAddress,
  },
  areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: `${site.url}${href(opts.locale, `services/${opts.slug}`)}`,
    servicePhone: site.phone,
  },
});

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export const breadcrumbSchema = (items: { name: string; path: string }[], locale: Locale) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${site.url}${href(locale, item.path)}`,
  })),
});

export const articleSchema = (opts: {
  locale: Locale;
  title: string;
  description: string;
  slug: string;
  date: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: opts.title,
  description: opts.description,
  datePublished: opts.date,
  dateModified: opts.date,
  inLanguage: opts.locale === 'ar' ? 'ar-AE' : 'en-AE',
  mainEntityOfPage: `${site.url}${href(opts.locale, `blog/${opts.slug}`)}`,
  author: { '@type': 'Organization', name: site.legalName },
  publisher: {
    '@type': 'Organization',
    name: site.legalName,
    logo: { '@type': 'ImageObject', url: `${site.url}/images/logo.png` },
  },
});
