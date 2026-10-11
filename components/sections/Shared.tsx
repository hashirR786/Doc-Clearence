import Link from 'next/link';
import Reveal from '../Reveal';
import Breadcrumbs, { type Crumb } from '../Breadcrumbs';
import { ClockIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from '../icons';
import { site, whatsappLink, type Locale } from '@/content/site';
import { t } from '@/content/ui';
import { href } from '@/lib/locale';

/** Eyebrow label + H2 + optional intro, used at the top of most sections. */
export function SectionHeading({
  label,
  title,
  subtitle,
  align = 'start',
  light = false,
  onMedia = false,
  as: Tag = 'h2',
}: {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'start' | 'center';
  light?: boolean;
  /**
   * Set when the heading sits over video footage rather than a flat colour:
   * the subtitle darkens so it keeps AA contrast against the busiest frame.
   */
  onMedia?: boolean;
  as?: 'h1' | 'h2';
}) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {label && <p className={`eyebrow ${align === 'start' ? 'eyebrow-start' : ''}`}>{label}</p>}
      <Tag
        className={`mt-4 text-balance text-3xl font-semibold leading-[1.15] sm:text-[2.5rem] ${
          light ? 'text-white' : 'text-navy'
        }`}
      >
        {title}
      </Tag>
      {subtitle && (
        <p
          className={`mt-5 text-pretty text-[1.0625rem] leading-relaxed ${
            light ? 'text-white/75' : onMedia ? 'text-navy' : 'text-slateblue'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

/**
 * Standard inner-page header: breadcrumbs, H1 and an optional lead paragraph,
 * on the warm off-white background. Clears the fixed site header.
 */
export function PageHero({
  locale,
  crumbs,
  eyebrow,
  title,
  lead,
  children,
}: {
  locale: Locale;
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-navy/[0.06] bg-cream pb-16 pt-32 sm:pb-20 sm:pt-36">
      <div className="container-page">
        <Breadcrumbs locale={locale} items={crumbs} />
        <div className="mt-8 max-w-3xl">
          {eyebrow && <p className="eyebrow eyebrow-start">{eyebrow}</p>}
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.12] text-navy sm:text-5xl">
            {title}
          </h1>
          {lead && <p className="mt-6 text-pretty text-lg leading-relaxed text-slateblue">{lead}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}

/** Full-width navy call-to-action band. */
export function CtaBand({
  locale,
  title,
  body,
  message,
}: {
  locale: Locale;
  title: string;
  body: string;
  message?: string;
}) {
  const d = t(locale);
  return (
    <section className="bg-navy py-20 text-white sm:py-24">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold leading-tight sm:text-[2.5rem]">{title}</h2>
          <p className="mt-5 text-pretty leading-relaxed text-white/75">{body}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={whatsappLink(locale, message)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {d.cta.whatsapp}
            </a>
            <Link href={href(locale, 'contact')} className="btn-outline-light">
              {d.cta.consult}
            </Link>
          </div>
          <div className="gold-rule mx-auto mt-10 max-w-xs" />
          <p className="mt-6 text-sm text-white/60">
            <a href={`tel:${site.phoneHref}`} className="transition-colors hover:text-gold-light">
              {site.phone}
            </a>
            <span className="mx-3 text-white/25">·</span>
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-gold-light">
              {site.email}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/** NAP block — must stay identical to the Google Business Profile. */
export function ContactDetails({ locale }: { locale: Locale }) {
  const d = t(locale);
  const rows = [
    {
      icon: <PinIcon className="h-4 w-4" />,
      label: d.contact.addressLabel,
      value: (
        <>
          {site.address.street}
          <br />
          {site.address.district}, {site.address.locality}, {site.address.countryName}
          <br />
          <span className="text-slateblue">{site.landmark[locale]}</span>
        </>
      ),
    },
    {
      icon: <PhoneIcon className="h-4 w-4" />,
      label: d.contact.phoneLabel,
      value: (
        <a href={`tel:${site.phoneHref}`} className="transition-colors hover:text-gold-dark" dir="ltr">
          {site.phone}
        </a>
      ),
    },
    {
      icon: <MailIcon className="h-4 w-4" />,
      label: d.contact.emailLabel,
      value: (
        <a href={`mailto:${site.email}`} className="transition-colors hover:text-gold-dark" dir="ltr">
          {site.email}
        </a>
      ),
    },
    {
      icon: <ClockIcon className="h-4 w-4" />,
      label: d.contact.hoursLabel,
      value: site.openingHoursLabel[locale],
    },
  ];

  return (
    <address className="space-y-6 not-italic">
      {rows.map((row) => (
        <div key={row.label} className="flex gap-4">
          <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cream text-gold-dark">
            {row.icon}
          </span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-label text-slateblue">{row.label}</p>
            <p className="mt-1 text-[15px] leading-relaxed text-navy">{row.value}</p>
          </div>
        </div>
      ))}
      <div className="gold-rule" />
      <p className="text-xs text-slateblue">
        {d.contact.licenceLabel}: {site.tradeLicense}
      </p>
    </address>
  );
}

/** Lazy-loaded Google Maps embed. */
export function MapEmbed({ locale, className = '' }: { locale: Locale; className?: string }) {
  const d = t(locale);
  const query = encodeURIComponent(
    site.address.street.startsWith('[')
      ? site.mapsQuery
      : `${site.address.street}, ${site.address.locality}, ${site.address.countryName}`,
  );

  return (
    <div className={`overflow-hidden rounded-2xl border border-navy/[0.07] shadow-soft ${className}`}>
      <iframe
        title={d.contact.mapTitle}
        src={`https://www.google.com/maps?q=${query}&output=embed&hl=${locale}`}
        width="100%"
        height="100%"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full min-h-[320px] w-full border-0"
      />
    </div>
  );
}
