import type { Metadata } from 'next';
import Blocks from '@/components/Blocks';
import JsonLd from '@/components/JsonLd';
import Reveal from '@/components/Reveal';
import CountUp from '@/components/CountUp';
import { CtaBand, ContactDetails, PageHero } from '@/components/sections/Shared';
import { about } from '@/content/pages';
import { site, type Locale } from '@/content/site';
import { t } from '@/content/ui';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const c = about[params.locale];
  return buildMetadata({
    locale: params.locale,
    path: 'about',
    title: c.metaTitle,
    description: c.description,
  });
}

export default function AboutPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const c = about[locale];
  const d = t(locale);

  return (
    <>
      <PageHero locale={locale} crumbs={[{ name: d.nav.about }]} title={c.h1} lead={c.lead} />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <article className="lg:col-span-7">
            <Blocks blocks={about.body} locale={locale} />
          </article>

          <aside className="lg:col-span-5">
            <Reveal>
              <div className="rounded-2xl border border-navy/[0.07] bg-cream p-6 shadow-soft sm:p-8">
                <h2 className="mb-6 font-serif text-xl font-semibold text-navy">{d.contact.title}</h2>
                <ContactDetails locale={locale} />
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <dl className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-navy/[0.07] bg-navy/[0.06] sm:grid-cols-3">
                {site.stats.map((stat) => (
                  <div key={stat.label.en} className="bg-white p-6">
                    <dt className="text-xs text-slateblue">{stat.label[locale]}</dt>
                    <dd className="mt-1">
                      <CountUp
                        value={stat.value}
                        className="font-serif text-2xl font-semibold text-gold-dark"
                      />
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </aside>
        </div>
      </section>

      <CtaBand locale={locale} title={d.finalCta.title} body={d.finalCta.body} />

      <JsonLd
        data={breadcrumbSchema(
          [
            { name: d.breadcrumb.home, path: '' },
            { name: d.nav.about, path: 'about' },
          ],
          locale,
        )}
      />
    </>
  );
}
