import type { Metadata } from 'next';
import Blocks from '@/components/Blocks';
import JsonLd from '@/components/JsonLd';
import { PageHero } from '@/components/sections/Shared';
import { terms } from '@/content/pages';
import type { Locale } from '@/content/site';
import { t } from '@/content/ui';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const c = terms[params.locale];
  return buildMetadata({
    locale: params.locale,
    path: 'terms',
    title: c.metaTitle,
    description: c.description,
  });
}

export default function TermsPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const c = terms[locale];
  const d = t(locale);

  return (
    <>
      <PageHero locale={locale} crumbs={[{ name: d.footer.terms }]} title={c.h1} lead={c.lead} />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page max-w-3xl">
          <p className="text-xs uppercase tracking-wider text-slateblue">
            {d.blog.published}{' '}
            <time dateTime={terms.updated}>
              {new Date(terms.updated).toLocaleDateString(locale === 'ar' ? 'ar-AE' : 'en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </p>
          <div className="mt-8">
            <Blocks blocks={terms.body} locale={locale} />
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbSchema(
          [
            { name: d.breadcrumb.home, path: '' },
            { name: d.footer.terms, path: 'terms' },
          ],
          locale,
        )}
      />
    </>
  );
}
