import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';
import JsonLd from '@/components/JsonLd';
import Reveal from '@/components/Reveal';
import ServiceCard from '@/components/ServiceCard';
import ServiceIcon from '@/components/ServiceIcon';
import { CheckIcon, WhatsAppIcon } from '@/components/icons';
import { PageHero } from '@/components/sections/Shared';
import { getService, services } from '@/content/services';
import { locales, site, whatsappLink, type Locale } from '@/content/site';
import { t } from '@/content/ui';
import { href } from '@/lib/locale';
import { breadcrumbSchema, buildMetadata, faqSchema, serviceSchema } from '@/lib/seo';

export function generateStaticParams() {
  return locales.flatMap((locale) => services.map((s) => ({ locale, slug: s.slug })));
}

export function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Metadata {
  const service = getService(params.slug);
  if (!service) return {};
  const c = service[params.locale];

  return buildMetadata({
    locale: params.locale,
    path: `services/${service.slug}`,
    title: c.title,
    description: c.description,
    keywords: service.keywords,
  });
}

export default function ServicePage({ params }: { params: { locale: Locale; slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();

  const locale = params.locale;
  const c = service[locale];
  const d = t(locale);

  const related = service.related
    .map((slug) => getService(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const faqs = c.faqs.map((f) => ({ q: f.q, a: f.a }));

  return (
    <>
      <PageHero
        locale={locale}
        crumbs={[{ name: d.nav.services, path: 'services' }, { name: c.name }]}
        title={c.h1}
        lead={c.intro}
      >
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappLink(
              locale,
              locale === 'ar'
                ? `مرحباً، أود الاستفسار عن ${c.name}.`
                : `Hello, I would like to enquire about ${c.name}.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {d.cta.whatsapp}
          </a>
          <a href={`tel:${site.phoneHref}`} className="btn-outline">
            {site.phone}
          </a>
        </div>
      </PageHero>

      {/* Quick facts */}
      <section className="border-b border-navy/[0.06] bg-white">
        <div className="container-page grid gap-px bg-navy/[0.06] sm:grid-cols-3">
          <Fact label={d.service.whoFor} value={c.whoFor} />
          <Fact label={d.service.turnaround} value={c.turnaround} />
          <Fact
            label={d.contact.hoursLabel}
            value={site.openingHoursLabel[locale]}
            icon={<ServiceIcon name={service.icon} className="h-5 w-5" />}
          />
        </div>
      </section>

      {/* Body + sidebar */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <article className="prose-site">
              {c.sections.map((section) => (
                <Reveal key={section.h2} className="mb-10">
                  <h2 className="font-serif text-2xl font-semibold text-navy">{section.h2}</h2>
                  <div className="mt-4">
                    {section.p.map((para, i) => (
                      <p key={i} className={i > 0 ? 'mt-4' : ''}>
                        {para}
                      </p>
                    ))}
                  </div>
                  {section.list && (
                    <ul className="mt-5 space-y-2.5">
                      {section.list.map((item) => (
                        <li key={item} className="flex gap-3">
                          <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-gold" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </Reveal>
              ))}

              {/* Process */}
              <Reveal className="mb-10">
                <h2 className="font-serif text-2xl font-semibold text-navy">{d.service.processTitle}</h2>
                <ol className="mt-6 space-y-6">
                  {c.steps.map((step, i) => (
                    <li key={step.title} className="flex gap-5">
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/35 font-serif text-sm font-semibold text-gold-dark">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-serif text-base font-semibold text-navy">{step.title}</h3>
                        <p className="mt-1.5 text-[15px] leading-relaxed">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>

              {/* FAQs */}
              <Reveal>
                <h2 className="mb-6 font-serif text-2xl font-semibold text-navy">{d.service.faqTitle}</h2>
                <FaqAccordion items={faqs} idPrefix={`svc-${service.slug}`} />
              </Reveal>
            </article>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <div className="rounded-2xl border border-navy/[0.07] bg-cream p-6 shadow-soft sm:p-8">
                  <h2 className="font-serif text-xl font-semibold text-navy">{d.service.documentsTitle}</h2>
                  <ul className="mt-5 space-y-3">
                    {c.documents.map((doc) => (
                      <li key={doc} className="flex gap-3 text-[15px] leading-relaxed text-slateblue">
                        <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-gold" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="mt-6 rounded-2xl border border-navy/[0.07] bg-white p-6 shadow-soft sm:p-8">
                  <h2 className="font-serif text-xl font-semibold text-navy">{d.service.ctaTitle}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-slateblue">{d.service.ctaBody}</p>
                  <div className="mt-6">
                    <ContactForm locale={locale} defaultService={service.slug} />
                  </div>
                </div>
              </Reveal>
            </div>
          </aside>
        </div>
      </section>

      {/* Related services — internal linking */}
      {related.length > 0 && (
        <section className="border-t border-navy/[0.06] bg-cream py-16 sm:py-20">
          <div className="container-page">
            <h2 className="font-serif text-2xl font-semibold text-navy">{d.service.relatedTitle}</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s, i) => (
                <Reveal key={s.slug} delay={i * 0.08}>
                  <ServiceCard service={s} locale={locale} />
                </Reveal>
              ))}
            </div>
            <Link href={href(locale, 'services')} className="btn-outline mt-10">
              {d.cta.allServices}
            </Link>
          </div>
        </section>
      )}

      <JsonLd
        data={[
          serviceSchema({
            locale,
            name: c.name,
            description: c.description,
            slug: service.slug,
          }),
          faqSchema(faqs),
          breadcrumbSchema(
            [
              { name: d.breadcrumb.home, path: '' },
              { name: d.nav.services, path: 'services' },
              { name: c.name, path: `services/${service.slug}` },
            ],
            locale,
          ),
        ]}
      />
    </>
  );
}

function Fact({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="bg-white px-1 py-7 sm:px-6">
      <div className="flex items-start gap-3">
        {icon && <span className="mt-0.5 text-gold-dark">{icon}</span>}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-label text-slateblue">{label}</p>
          <p className="mt-1.5 text-[15px] leading-relaxed text-navy">{value}</p>
        </div>
      </div>
    </div>
  );
}
