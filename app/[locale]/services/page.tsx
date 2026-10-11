import type { Metadata } from 'next';
import ServiceSearch from '@/components/ServiceSearch';
import JsonLd from '@/components/JsonLd';
import { CtaBand, PageHero } from '@/components/sections/Shared';
import { t } from '@/content/ui';
import type { Locale } from '@/content/site';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const en = params.locale === 'en';
  return buildMetadata({
    locale: params.locale,
    path: 'services',
    title: en ? 'Our Services | Gulf Nejoom UAE' : 'خدماتنا | الخليج نجوم الإمارات',
    description: en
      ? 'Fifteen document clearance, PRO, typing and tax services across the UAE. Search by service or browse by category.'
      : 'خمس عشرة خدمة لتخليص المستندات والعلاقات العامة والطباعة والضرائب في الإمارات. ابحث أو تصفّح حسب الفئة.',
    keywords: [
      'typing center UAE',
      'PRO services UAE',
      'document clearance Dubai',
      'visa services UAE',
      'VAT registration UAE',
    ],
  });
}

export default function ServicesPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const d = t(locale);

  return (
    <>
      <PageHero
        locale={locale}
        crumbs={[{ name: d.nav.services }]}
        eyebrow={d.servicesSection.label}
        title={d.servicesSection.title}
        lead={d.servicesSection.subtitle}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          <ServiceSearch locale={locale} />
        </div>
      </section>

      <CtaBand locale={locale} title={d.finalCta.title} body={d.finalCta.body} />

      <JsonLd
        data={breadcrumbSchema(
          [
            { name: d.breadcrumb.home, path: '' },
            { name: d.nav.services, path: 'services' },
          ],
          locale,
        )}
      />
    </>
  );
}
