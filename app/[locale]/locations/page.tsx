import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import Reveal from '@/components/Reveal';
import { ArrowIcon, PinIcon } from '@/components/icons';
import { CtaBand, MapEmbed, PageHero } from '@/components/sections/Shared';
import { locations } from '@/content/general';
import type { Locale } from '@/content/site';
import { t } from '@/content/ui';
import { href } from '@/lib/locale';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const en = params.locale === 'en';
  return buildMetadata({
    locale: params.locale,
    path: 'locations',
    title: en ? 'Areas We Serve in the UAE | Gulf Nejoom' : 'المناطق التي نخدمها | الخليج نجوم',
    description: en
      ? 'Document clearance, PRO and typing services across Dubai, Abu Dhabi, Sharjah and the Northern Emirates.'
      : 'تخليص المستندات وخدمات العلاقات العامة والطباعة في دبي وأبوظبي والشارقة والإمارات الشمالية.',
    keywords: ['document clearance Dubai', 'document clearance Abu Dhabi', 'PRO services Sharjah'],
  });
}

export default function LocationsPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const d = t(locale);

  return (
    <>
      <PageHero
        locale={locale}
        crumbs={[{ name: d.nav.locations }]}
        eyebrow={d.nav.locations}
        title={locale === 'ar' ? 'المناطق التي نخدمها في الإمارات' : 'Where we work across the UAE'}
        lead={
          locale === 'ar'
            ? 'نعالج المستندات في جميع الإمارات. تختلف المتطلبات والرسوم والمدد بين إمارة وأخرى، ونسعّر وفقاً لذلك ونخبرك حين ينطبق متطلب خاص بإمارة معينة.'
            : 'We process documents across every emirate. Requirements, fees and timelines differ from one to the next — we quote accordingly and tell you plainly when an emirate-specific requirement applies to your file.'
        }
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page grid gap-6 sm:grid-cols-2">
          {locations.map((location, i) => {
            const c = location[locale];
            return (
              <Reveal key={location.slug} delay={(i % 2) * 0.08}>
                <article className="card card-hover group relative h-full">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cream text-gold-dark">
                    <PinIcon className="h-5 w-5" />
                  </span>
                  <h2 className="mt-5 font-serif text-xl font-semibold text-navy">
                    <Link
                      href={href(locale, `locations/${location.slug}`)}
                      className="before:absolute before:inset-0"
                    >
                      {c.name}
                    </Link>
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-slateblue">{c.blurb}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-gold-dark">
                    {d.cta.viewService}
                    <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </span>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="container-page mt-12">
          <MapEmbed locale={locale} className="h-[380px]" />
        </div>
      </section>

      <CtaBand locale={locale} title={d.finalCta.title} body={d.finalCta.body} />

      <JsonLd
        data={breadcrumbSchema(
          [
            { name: d.breadcrumb.home, path: '' },
            { name: d.nav.locations, path: 'locations' },
          ],
          locale,
        )}
      />
    </>
  );
}
