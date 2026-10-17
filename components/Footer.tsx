import Link from 'next/link';
import Logo from './Logo';
import { ClockIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon } from './icons';
import { site, type Locale } from '@/content/site';
import { t } from '@/content/ui';
import { href } from '@/lib/locale';
import { services } from '@/content/services';
import { locations } from '@/content/general';

export default function Footer({ locale }: { locale: Locale }) {
  const d = t(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white/75">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        {/* Brand + NAP */}
        <div className="lg:col-span-4">
          <Logo locale={locale} variant="light" height={58} />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">{d.footer.about}</p>

          <address className="mt-6 space-y-3 text-sm not-italic">
            <p className="flex items-start gap-3">
              <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                {site.address.street}
                <br />
                {site.address.district}, {site.address.locality}
                <br />
                <span className="text-white/55">{site.landmark[locale]}</span>
              </span>
            </p>
            <p className="flex items-center gap-3">
              <PhoneIcon className="h-4 w-4 shrink-0 text-gold" />
              <a href={`tel:${site.phoneHref}`} className="transition-colors hover:text-gold-light">
                {site.phone}
              </a>
            </p>
            <p className="flex items-center gap-3">
              <MailIcon className="h-4 w-4 shrink-0 text-gold" />
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-gold-light">
                {site.email}
              </a>
            </p>
            <p className="flex items-start gap-3">
              <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{site.openingHoursLabel[locale]}</span>
            </p>
          </address>

          {site.social.instagram.startsWith('http') && (
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${site.shortName} on Instagram`}
              className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-xl
                         border border-white/15 text-white/70 transition-colors
                         hover:border-gold hover:text-gold-light"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
          )}
        </div>

        {/* Services */}
        <div className="lg:col-span-4">
          <h2 className="text-[11px] font-semibold uppercase tracking-label text-gold">
            {d.footer.servicesTitle}
          </h2>
          <ul className="mt-5 grid gap-x-6 gap-y-2.5 text-sm sm:grid-cols-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={href(locale, `services/${s.slug}`)}
                  className="transition-colors hover:text-gold-light"
                >
                  {s[locale].name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company + locations */}
        <div className="lg:col-span-2">
          <h2 className="text-[11px] font-semibold uppercase tracking-label text-gold">
            {d.footer.companyTitle}
          </h2>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li>
              <Link href={href(locale, 'about')} className="transition-colors hover:text-gold-light">
                {d.nav.about}
              </Link>
            </li>
            <li>
              <Link href={href(locale, 'services')} className="transition-colors hover:text-gold-light">
                {d.nav.services}
              </Link>
            </li>
            <li>
              <Link href={href(locale, 'blog')} className="transition-colors hover:text-gold-light">
                {d.nav.blog}
              </Link>
            </li>
            <li>
              <Link href={href(locale, 'contact')} className="transition-colors hover:text-gold-light">
                {d.nav.contact}
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-[11px] font-semibold uppercase tracking-label text-gold">
            {d.nav.locations}
          </h2>
          <ul className="mt-5 space-y-2.5 text-sm">
            {locations.map((l) => (
              <li key={l.slug}>
                <Link
                  href={href(locale, `locations/${l.slug}`)}
                  className="transition-colors hover:text-gold-light"
                >
                  {l[locale].name}
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="mt-8 text-[11px] font-semibold uppercase tracking-label text-gold">
            {d.footer.legalTitle}
          </h2>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li>
              <Link href={href(locale, 'privacy')} className="transition-colors hover:text-gold-light">
                {d.footer.privacy}
              </Link>
            </li>
            <li>
              <Link href={href(locale, 'terms')} className="transition-colors hover:text-gold-light">
                {d.footer.terms}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-page">
        <div className="gold-rule" />
        <div className="py-7 text-xs leading-relaxed text-white/55">
          <p className="mb-3">{d.footer.disclaimer}</p>
          <p>
            © {year} {site.legalName}. {d.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
