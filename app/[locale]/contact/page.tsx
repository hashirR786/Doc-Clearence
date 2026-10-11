import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import JsonLd from '@/components/JsonLd';
import Reveal from '@/components/Reveal';
import { PhoneIcon, WhatsAppIcon } from '@/components/icons';
import { ContactDetails, MapEmbed, PageHero } from '@/components/sections/Shared';
import { site, whatsappLink, type Locale } from '@/content/site';
import { t } from '@/content/ui';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const en = params.locale === 'en';
  return buildMetadata({
    locale: params.locale,
    path: 'contact',
    title: en ? 'Contact Gulf Nejoom | Document Clearance UAE' : 'اتصل بالخليج نجوم | تخليص المستندات',
    description: en
      ? 'Call, WhatsApp or visit Gulf Nejoom for document clearance, PRO and typing services in the UAE. Free document review.'
      : 'اتصل أو راسلنا على واتساب أو زرنا لخدمات تخليص المستندات والعلاقات العامة والطباعة في الإمارات. مراجعة مجانية.',
  });
}

export default function ContactPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const d = t(locale);

  return (
    <>
      <PageHero
        locale={locale}
        crumbs={[{ name: d.nav.contact }]}
        eyebrow={d.contact.label}
        title={d.contact.title}
        lead={d.contact.subtitle}
      >
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href={whatsappLink(locale)} target="_blank" rel="noopener noreferrer" className="btn-gold">
            <WhatsAppIcon className="h-4 w-4" />
            {d.cta.whatsapp}
          </a>
          <a href={`tel:${site.phoneHref}`} className="btn-outline">
            <PhoneIcon className="h-4 w-4" />
            {site.phone}
          </a>
        </div>
      </PageHero>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <ContactDetails locale={locale} />
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-8">
            <div className="rounded-2xl border border-navy/[0.07] bg-white p-6 shadow-soft sm:p-8">
              <h2 className="mb-6 font-serif text-xl font-semibold text-navy">{d.cta.enquire}</h2>
              <ContactForm locale={locale} />
            </div>
          </Reveal>
        </div>

        <div className="container-page mt-12">
          <MapEmbed locale={locale} className="h-[420px]" />
        </div>
      </section>

      <JsonLd
        data={breadcrumbSchema(
          [
            { name: d.breadcrumb.home, path: '' },
            { name: d.nav.contact, path: 'contact' },
          ],
          locale,
        )}
      />
    </>
  );
}
