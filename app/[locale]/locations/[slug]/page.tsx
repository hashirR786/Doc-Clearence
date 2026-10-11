import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import Reveal from '@/components/Reveal';
import ServiceCard from '@/components/ServiceCard';
import { ContactDetails, CtaBand, MapEmbed, PageHero } from '@/components/sections/Shared';
import { getLocation, locations } from '@/content/general';
import { services } from '@/content/services';
import { locales, site, type Locale } from '@/content/site';
import { t } from '@/content/ui';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return locales.flatMap((locale) => locations.map((l) => ({ locale, slug: l.slug })));
}

export function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Metadata {
  const location = getLocation(params.slug);
  if (!location) return {};
  const c = location[params.locale];
  const en = params.locale === 'en';

  return buildMetadata({
    locale: params.locale,
    path: `locations/${location.slug}`,
    title: en
      ? `Document Clearance in ${c.metaName ?? c.name} | Gulf Nejoom`
      : `تخليص المستندات في ${c.metaName ?? c.name} | الخليج نجوم`,
    description: c.blurb,
    keywords: [`document clearance ${c.name}`, `PRO services ${c.name}`, `typing centre ${c.name}`],
  });
}

export default function LocationPage({ params }: { params: { locale: Locale; slug: string } }) {
  const location = getLocation(params.slug);
  if (!location) notFound();

  const locale = params.locale;
  const c = location[locale];
  const d = t(locale);

  // Lead with the services people most often need in a new emirate.
  const featured = services.filter((s) =>
    ['documents-clearance', 'pro-services', 'typing-services', 'visa-services', 'emirates-id-services', 'attestation-translation'].includes(
      s.slug,
    ),
  );

  return (
    <>
      <PageHero
        locale={locale}
        crumbs={[{ name: d.nav.locations, path: 'locations' }, { name: c.name }]}
        eyebrow={d.nav.locations}
        title={
          locale === 'ar'
            ? `تخليص المستندات وخدمات العلاقات العامة في ${c.name}`
            : `Document clearance & PRO services in ${c.name}`
        }
        lead={c.detail}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <h2 className="font-serif text-2xl font-semibold text-navy">{d.servicesSection.label}</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.08}>
                <ServiceCard service={s} locale={locale} />
              </Reveal>
            ))}
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <h2 className="mb-6 font-serif text-2xl font-semibold text-navy">{d.contact.title}</h2>
              <ContactDetails locale={locale} />
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-7">
              <MapEmbed locale={locale} className="h-full min-h-[340px]" />
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        locale={locale}
        title={d.finalCta.title}
        body={d.finalCta.body}
        message={
          locale === 'ar'
            ? `مرحباً، أحتاج خدمة تخليص مستندات في ${c.name}.`
            : `Hello, I need document clearance help in ${c.name}.`
        }
      />

      <JsonLd
        data={[
          breadcrumbSchema(
            [
              { name: d.breadcrumb.home, path: '' },
              { name: d.nav.locations, path: 'locations' },
              { name: c.name, path: `locations/${location.slug}` },
            ],
            locale,
          ),
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: locale === 'ar' ? `تخليص المستندات في ${c.name}` : `Document clearance in ${c.name}`,
            description: c.detail,
            areaServed: { '@type': 'Place', name: c.name },
            provider: {
              '@type': 'ProfessionalService',
              '@id': `${site.url}/#localbusiness`,
              name: site.legalName,
              telephone: site.phone,
            },
          },
        ]}
      />
    </>
  );
}
