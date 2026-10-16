import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Hero,
  Process,
  ServicesGrid,
  Statement,
  Testimonials,
  TrustStrip,
  WhyUs,
} from '@/components/sections/Home';
import ScrollVideoScene from '@/components/ScrollVideoScene';
import { CtaBand, ContactDetails, MapEmbed, SectionHeading } from '@/components/sections/Shared';
import FaqAccordion from '@/components/FaqAccordion';
import Reveal from '@/components/Reveal';
import JsonLd from '@/components/JsonLd';
import ContactForm from '@/components/ContactForm';
import { homeFaqs } from '@/content/general';
import { t } from '@/content/ui';
import { site, type Locale } from '@/content/site';
import { buildMetadata, faqSchema } from '@/lib/seo';
import { href } from '@/lib/locale';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const en = params.locale === 'en';
  return buildMetadata({
    locale: params.locale,
    title: en
      ? 'Document Clearance & PRO Services UAE | Gulf Nejoom'
      : 'تخليص المستندات وخدمات العلاقات العامة | الخليج نجوم',
    description: en
      ? 'Typing centre, PRO and document clearance across the UAE: visas, Emirates ID, Tasheel, attestation and tax. WhatsApp us for a free document review.'
      : 'مركز طباعة وخدمات علاقات عامة وتخليص مستندات في الإمارات. تأشيرات وهوية إماراتية وتسهيل وتصديق وضرائب. راسلنا على واتساب لمراجعة مجانية.',
    keywords: [
      'typing center UAE',
      'PRO services UAE',
      'document clearance Dubai',
      'document clearance Abu Dhabi',
      'Emirates ID renewal',
      'Tasheel services',
      'visa services UAE',
      'document attestation UAE',
    ],
  });
}

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const d = t(locale);

  const faqs = homeFaqs.map((f) => ({ q: f.q[locale], a: f.a[locale] }));

  return (
    <>
      {/* Scene 1 — aerial skyline, scrubbed across the hero, trust strip
          and brand statement. Giving the scene more height makes the
          footage play out over a longer stretch of scrolling. */}
      <ScrollVideoScene
        id="hero-scene"
        src={site.video.hero.src}
        srcMobile={site.video.hero.srcMobile}
        poster={site.video.hero.poster}
        posterMobile={site.video.hero.posterMobile}
        enabled={site.video.hero.enabled}
        overlay="navy"
        className="bg-navy text-white"
      >
        <Hero locale={locale} />
        <TrustStrip locale={locale} />
        <Statement locale={locale} />
      </ScrollVideoScene>

      {/* Scene 2 — brand motion graphic behind the services grid. */}
      <ScrollVideoScene
        src={site.video.services.src}
        srcMobile={site.video.services.srcMobile}
        poster={site.video.services.poster}
        posterMobile={site.video.services.posterMobile}
        enabled={site.video.services.enabled}
        overlay="cream"
        className="bg-cream"
        lazy
      >
        <ServicesGrid locale={locale} />
      </ScrollVideoScene>

      <Process locale={locale} />
      <WhyUs locale={locale} />
      <Testimonials locale={locale} />

      {/* FAQ */}
      <section className="relative bg-white py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading label={d.faq.label} title={d.faq.title} />
            <p className="mt-6 text-sm leading-relaxed text-slateblue">
              {d.finalCta.body}{' '}
              <Link href={href(locale, 'contact')} className="font-medium text-navy underline underline-offset-4">
                {d.nav.contact}
              </Link>
            </p>
          </div>
          <div className="lg:col-span-8">
            <FaqAccordion items={faqs} idPrefix="home-faq" />
          </div>
        </div>
      </section>

      <CtaBand locale={locale} title={d.finalCta.title} body={d.finalCta.body} />

      {/* Contact + map */}
      <section id="contact" className="relative bg-cream py-20 sm:py-28">
        <div className="container-page">
          <SectionHeading label={d.contact.label} title={d.contact.title} subtitle={d.contact.subtitle} />

          <div className="mt-14 grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <ContactDetails locale={locale} />
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-8">
              <div className="rounded-2xl border border-navy/[0.07] bg-white p-6 shadow-soft sm:p-8">
                <ContactForm locale={locale} />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="mt-10">
            <MapEmbed locale={locale} className="h-[360px]" />
          </Reveal>
        </div>
      </section>

      <JsonLd data={faqSchema(faqs)} />
    </>
  );
}
