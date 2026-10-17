import Link from 'next/link';
import Reveal from '../Reveal';
import CountUp from '../CountUp';
import ServiceCard from '../ServiceCard';
import { ArrowIcon, ChatIcon, CheckIcon, PhoneIcon } from '../icons';
import { SectionHeading } from './Shared';
import { services } from '@/content/services';
import { site, type Locale } from '@/content/site';
import { t } from '@/content/ui';
import { href } from '@/lib/locale';
import { testimonials } from '@/content/general';

/* ------------------------------------------------------------------ *
 * Hero — sits over the scroll-scrubbed background video
 * ------------------------------------------------------------------ */
export function Hero({ locale }: { locale: Locale }) {
  const d = t(locale);

  return (
    <section className="relative flex min-h-[100svh] items-center pb-24 pt-32">
        <div className="container-page">
          <Reveal className="max-w-3xl">
            <p className="eyebrow eyebrow-start text-gold-light">{d.hero.label}</p>

            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
              {d.hero.title}
            </h1>

            {/*
              The hero leads with the phone number itself: calling and texting
              work from any handset with nothing installed, which is the
              shortest path to a person. The quote form further down is where
              a detailed enquiry goes.
            */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href={`tel:${site.phoneHref}`} className="btn-gold">
                <PhoneIcon className="h-4 w-4" />
                <span dir="ltr">{site.phone}</span>
              </a>
              <a href={`sms:${site.phoneHref}`} className="btn-outline-light">
                <ChatIcon className="h-4 w-4" />
                {d.cta.message}
              </a>
            </div>

            <p className="mt-8 text-sm text-white/55">
              {site.openingHoursLabel[locale]}
              <span className="mx-3 text-white/25">·</span>
              <Link href={href(locale, 'contact')} className="transition-colors hover:text-gold-light">
                {d.cta.consult}
              </Link>
            </p>
          </Reveal>
        </div>

      <span className="pointer-events-none absolute inset-x-0 bottom-8 hidden justify-center text-[10px] uppercase tracking-label text-white/40 sm:flex">
        {d.hero.scroll}
      </span>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Brand statement — also gives the hero footage room to play out
 * ------------------------------------------------------------------ */
export function Statement({ locale }: { locale: Locale }) {
  const d = t(locale);

  return (
    <section className="flex min-h-[100svh] items-center py-28">
      <div className="container-page">
        <Reveal className="max-w-3xl">
          <p className="eyebrow eyebrow-start text-gold-light">{d.statement.label}</p>
          <h2 className="mt-6 text-balance font-serif text-3xl font-semibold leading-[1.15] text-white sm:text-[2.75rem]">
            {d.statement.title}
          </h2>
          <div className="gold-rule my-8 max-w-sm" />
          <p className="text-pretty text-[1.0625rem] leading-relaxed text-white/75">{d.statement.body}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Trust strip — placeholder figures until verified
 * ------------------------------------------------------------------ */
export function TrustStrip({ locale }: { locale: Locale }) {
  const d = t(locale);

  return (
    <section className="relative border-y border-white/15 py-14">
      <div className="container-page">
        <p className="eyebrow eyebrow-start text-gold-light">{d.trust.label}</p>
        <dl className="mt-8 grid gap-8 sm:grid-cols-3">
          {site.stats.map((stat, i) => (
            <Reveal key={stat.label.en} delay={i * 0.08}>
              <dt className="sr-only">{stat.label[locale]}</dt>
              <dd>
                <CountUp
                  value={stat.value}
                  className="block font-serif text-3xl font-semibold text-gold-light sm:text-4xl"
                />
                <span className="mt-2 block text-sm text-white/65">{stat.label[locale]}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Services grid — the page turns solid from here down
 * ------------------------------------------------------------------ */
export function ServicesGrid({ locale }: { locale: Locale }) {
  const d = t(locale);

  return (
    <section id="services" className="relative py-24 sm:py-32">
      {/*
        The scene veil is kept light so the footage shows through behind the
        cards. This local scrim sits behind the intro copy only, which is the
        one place text meets the footage directly — the cards carry their own
        background.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-gradient-to-b from-cream via-cream/90 to-transparent"
      />

      <div className="container-page relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            label={d.servicesSection.label}
            title={d.servicesSection.title}
            subtitle={d.servicesSection.subtitle}
            onMedia
          />
          <Link href={href(locale, 'services')} className="btn-outline shrink-0">
            {d.cta.allServices}
            <ArrowIcon className="h-3.5 w-3.5 rtl:rotate-180" />
          </Link>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 0.08}>
              <ServiceCard service={service} locale={locale} floating />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Four-step process
 * ------------------------------------------------------------------ */
export function Process({ locale }: { locale: Locale }) {
  const d = t(locale);

  return (
    <section className="relative bg-cream py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading label={d.process.label} title={d.process.title} align="center" />

        <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {d.process.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.1} className="relative">
              {/* Connector rule between steps on wide screens */}
              {i < d.process.steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-6 hidden h-px w-full bg-gradient-to-r from-gold/40 to-transparent lg:block ltr:left-16 rtl:right-16 rtl:bg-gradient-to-l"
                />
              )}
              <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/35 bg-white font-serif text-lg font-semibold text-gold-dark">
                {i + 1}
              </span>
              <h3 className="mt-6 font-serif text-lg font-semibold text-navy">{step.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slateblue">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Why choose us
 * ------------------------------------------------------------------ */
export function WhyUs({ locale }: { locale: Locale }) {
  const d = t(locale);

  return (
    <section className="relative bg-white py-20 sm:py-28">
      <div className="container-page grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading label={d.why.label} title={d.why.title} />
          <Link href={href(locale, 'about')} className="btn-outline mt-9">
            {d.nav.about}
            <ArrowIcon className="h-3.5 w-3.5 rtl:rotate-180" />
          </Link>
        </div>

        <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:col-span-7">
          {d.why.points.map((point, i) => (
            <Reveal as="li" key={point.title} delay={(i % 2) * 0.08}>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10 text-gold-dark">
                <CheckIcon className="h-4 w-4" />
              </span>
              <h3 className="mt-4 font-serif text-base font-semibold text-navy">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slateblue">{point.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Testimonials
 * ------------------------------------------------------------------ */
export function Testimonials({ locale }: { locale: Locale }) {
  const d = t(locale);

  return (
    <section className="relative bg-cream py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading label={d.testimonials.label} title={d.testimonials.title} align="center" />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {testimonials.map((item, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <figure className="card h-full">
                <span aria-hidden="true" className="font-serif text-4xl leading-none text-gold/40">
                  &ldquo;
                </span>
                <blockquote className="mt-3 text-[15px] leading-relaxed text-slateblue">
                  {item.quote[locale]}
                </blockquote>
                <figcaption className="mt-6 border-t border-navy/[0.07] pt-4">
                  <span className="block text-sm font-semibold text-navy">{item.author}</span>
                  <span className="mt-0.5 block text-xs text-slateblue">{item.role[locale]}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
