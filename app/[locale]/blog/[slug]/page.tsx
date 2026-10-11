import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Blocks from '@/components/Blocks';
import JsonLd from '@/components/JsonLd';
import ServiceCard from '@/components/ServiceCard';
import { ArrowIcon } from '@/components/icons';
import { CtaBand, PageHero } from '@/components/sections/Shared';
import { getPost, postBody, posts } from '@/content/blog';
import { getService } from '@/content/services';
import { locales, type Locale } from '@/content/site';
import { t } from '@/content/ui';
import { href } from '@/lib/locale';
import { articleSchema, breadcrumbSchema, buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return locales.flatMap((locale) => posts.map((p) => ({ locale, slug: p.slug })));
}

export function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  const c = post[params.locale];

  return buildMetadata({
    locale: params.locale,
    path: `blog/${post.slug}`,
    title: c.metaTitle,
    description: c.description,
    type: 'article',
    publishedTime: post.date,
  });
}

export default function BlogPostPage({ params }: { params: { locale: Locale; slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const locale = params.locale;
  const c = post[locale];
  const d = t(locale);
  const service = post.service ? getService(post.service) : undefined;

  return (
    <>
      <PageHero
        locale={locale}
        crumbs={[{ name: d.nav.blog, path: 'blog' }, { name: c.title }]}
        title={c.title}
        lead={c.excerpt}
      >
        <p className="mt-6 text-sm text-slateblue">
          {d.blog.published}{' '}
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString(locale === 'ar' ? 'ar-AE' : 'en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </p>
      </PageHero>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <article className="lg:col-span-8">
            <Blocks blocks={postBody(post, locale)} locale={locale} />

            <div className="gold-rule my-12" />

            <Link href={href(locale, 'blog')} className="btn-outline">
              <ArrowIcon className="h-3.5 w-3.5 rotate-180 rtl:rotate-0" />
              {d.blog.backToBlog}
            </Link>
          </article>

          {service && (
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <h2 className="mb-5 text-[11px] font-semibold uppercase tracking-label text-slateblue">
                  {d.service.relatedTitle}
                </h2>
                <ServiceCard service={service} locale={locale} />
              </div>
            </aside>
          )}
        </div>
      </section>

      <CtaBand locale={locale} title={d.finalCta.title} body={d.finalCta.body} />

      <JsonLd
        data={[
          articleSchema({
            locale,
            title: c.title,
            description: c.description,
            slug: post.slug,
            date: post.date,
          }),
          breadcrumbSchema(
            [
              { name: d.breadcrumb.home, path: '' },
              { name: d.nav.blog, path: 'blog' },
              { name: c.title, path: `blog/${post.slug}` },
            ],
            locale,
          ),
        ]}
      />
    </>
  );
}
