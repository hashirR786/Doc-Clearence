import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import Reveal from '@/components/Reveal';
import { ArrowIcon } from '@/components/icons';
import { CtaBand, PageHero } from '@/components/sections/Shared';
import { posts } from '@/content/blog';
import { getService } from '@/content/services';
import type { Locale } from '@/content/site';
import { t } from '@/content/ui';
import { href } from '@/lib/locale';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const en = params.locale === 'en';
  return buildMetadata({
    locale: params.locale,
    path: 'blog',
    title: en ? 'UAE Document Guides & Insights | Gulf Nejoom' : 'أدلة ومقالات المستندات | الخليج نجوم',
    description: en
      ? 'Plain-English guides to UAE document procedures: Emirates ID renewal, attestation, corporate tax registration and more.'
      : 'أدلة مبسّطة لإجراءات المستندات في الإمارات: تجديد الهوية والتصديق وتسجيل ضريبة الشركات والمزيد.',
  });
}

export default function BlogPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const d = t(locale);
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHero
        locale={locale}
        crumbs={[{ name: d.nav.blog }]}
        eyebrow={d.nav.blog}
        title={d.blog.title}
        lead={d.blog.subtitle}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page">
          {sorted.length === 0 ? (
            <p className="rounded-2xl bg-cream p-10 text-center text-slateblue">{d.blog.empty}</p>
          ) : (
            <div className="grid gap-6 lg:grid-cols-3">
              {sorted.map((post, i) => {
                const c = post[locale];
                const service = post.service ? getService(post.service) : undefined;

                return (
                  <Reveal key={post.slug} delay={(i % 3) * 0.08}>
                    <article className="card card-hover group relative flex h-full flex-col">
                      <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-slateblue">
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString(locale === 'ar' ? 'ar-AE' : 'en-GB', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                        {service && (
                          <>
                            <span aria-hidden="true" className="text-navy/20">
                              ·
                            </span>
                            <span className="text-gold-dark">{service[locale].name}</span>
                          </>
                        )}
                      </div>

                      <h2 className="mt-4 font-serif text-xl font-semibold leading-snug text-navy">
                        <Link
                          href={href(locale, `blog/${post.slug}`)}
                          className="before:absolute before:inset-0"
                        >
                          {c.title}
                        </Link>
                      </h2>

                      <p className="mt-3 flex-1 text-sm leading-relaxed text-slateblue">{c.excerpt}</p>

                      <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-gold-dark">
                        {d.blog.readMore}
                        <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                      </span>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <CtaBand locale={locale} title={d.finalCta.title} body={d.finalCta.body} />

      <JsonLd
        data={breadcrumbSchema(
          [
            { name: d.breadcrumb.home, path: '' },
            { name: d.nav.blog, path: 'blog' },
          ],
          locale,
        )}
      />
    </>
  );
}
