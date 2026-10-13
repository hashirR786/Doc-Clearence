/**
 * ---------------------------------------------------------------------------
 * SITE CONFIGURATION — edit this file to update business details site-wide.
 * Values in [SQUARE BRACKETS] are placeholders. Replace them with real data
 * and make sure they match the Google Business Profile exactly (NAP consistency).
 * ---------------------------------------------------------------------------
 */

export const site = {
  legalName: 'Gulf Nejoom Documents Clearance Service L.L.C',
  shortName: 'Gulf Nejoom',
  tagline: {
    en: 'Documents Clearance Service L.L.C',
    ar: 'ذ.م.م لخدمات تخليص المستندات',
  },
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.gulfnejoom.ae',

  // --- NAP (Name, Address, Phone) — keep identical everywhere -------------
  phone: '+971 52 324 0888',
  phoneHref: '+971523240888', // digits only with country code
  whatsapp: '971523240888', // digits only, no leading +
  email: 'gulfnejoom@gmail.com',
  tradeLicense: '[TRADE LICENSE NO.]',

  address: {
    street: 'Office No. GR 09, New Al Safiya Building, Hor Al Anz',
    district: 'Deira',
    locality: 'Dubai',
    region: 'Dubai',
    postalCode: '[POSTAL CODE]', // optional in the UAE — leave as-is if unused
    country: 'AE',
    countryName: 'United Arab Emirates',
  },

  /** Shown under the address — strong local-search signal in Dubai. */
  landmark: {
    en: 'Near Abu Hail Metro Station (Exit 3)',
    ar: 'بالقرب من محطة مترو أبو هيل (المخرج ٣)',
  },

  /**
   * APPROXIMATE coordinates for the Hor Al Anz / Abu Hail area — accurate to
   * the neighbourhood, not the building. Replace with the exact pin from your
   * Google Business Profile (open the listing, right-click the pin, copy the
   * lat/lng) so the LocalBusiness schema points at the real doorway.
   */
  geo: { lat: 25.2797, lng: 55.3352 },

  // Google Maps embed query — falls back to the full address above.
  mapsQuery:
    process.env.NEXT_PUBLIC_MAPS_QUERY ||
    'New Al Safiya Building, Hor Al Anz, Deira, Dubai',

  openingHours: [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  openingHoursLabel: {
    en: 'Monday – Saturday, 9:00 AM – 6:00 PM',
    ar: 'الاثنين – السبت، ٩:٠٠ صباحاً – ٦:٠٠ مساءً',
  },

  social: {
    // Tracking parameters stripped — they should not be published.
    instagram: 'https://www.instagram.com/gulf_nejoom',
    facebook: '[FACEBOOK URL]',
    linkedin: '[LINKEDIN URL]',
  },

  /**
   * Scroll-scrubbed background videos.
   *
   * Each `src` must be encoded with dense keyframes (-g 2) or scrubbing will
   * stutter — see PROJECT-NOTES.md (local). Set `enabled: false` on either one
   * to fall back to its poster alone, with no video request at all.
   *
   *  hero     — aerial skyline behind the hero and trust strip (dark footage,
   *             navy veil, light text over it)
   *  services — brand motion graphic behind the services grid (light footage,
   *             cream veil, dark text over it)
   */
  video: {
    hero: {
      enabled: true,
      src: '/video/hero.mp4',
      // Below 768px: a 9:16 cut of the same footage, so it fills a phone
      // screen instead of being cropped from landscape.
      srcMobile: '/video/hero-mobile.mp4',
      poster: '/images/hero-poster.jpg',
      posterMobile: '/images/hero-poster-mobile.jpg',
    },
    services: {
      enabled: true,
      src: '/video/services.mp4',
      srcMobile: '/video/services-mobile.mp4',
      poster: '/images/services-poster.jpg',
      posterMobile: '/images/services-poster-mobile.jpg',
    },
  },

  /**
   * Trust strip figures.
   *
   * All three figures are the client's. Nothing else reads these numbers,
   * so this is the only place to change them.
   */
  stats: [
    { value: '20+', label: { en: 'Years of experience', ar: 'سنة من الخبرة' } },
    { value: '15,000+', label: { en: 'Documents processed', ar: 'معاملة منجزة' } },
    { value: '1,000+', label: { en: 'Clients served', ar: 'عميل تمت خدمته' } },
  ],
};

export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const whatsappLink = (locale: Locale, message?: string) => {
  const number = site.whatsapp.replace(/\D/g, '');
  // Until a real number is configured, send people to the contact page
  // rather than to a wa.me link with no recipient.
  if (!number) return `/${locale}/contact`;

  const text =
    message ||
    (locale === 'ar'
      ? 'مرحباً، أود الاستفسار عن خدماتكم.'
      : 'Hello, I would like to enquire about your services.');
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
};
