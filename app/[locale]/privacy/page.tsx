import type { Metadata } from 'next';
import Blocks from '@/components/Blocks';
import JsonLd from '@/components/JsonLd';
import { PageHero } from '@/components/sections/Shared';
import { privacy } from '@/content/pages';
import type { Locale } from '@/content/site';
import { t } from '@/content/ui';
import { breadcrumbSchema, buildMetadata } from '@/lib/seo';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const c = privacy[params.locale];
  return buildMetadata({
    locale: params.locale,
    path: 'privacy',
    title: c.metaTitle,
    description: c.description,
  });
}

export default function PrivacyPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const c = privacy[locale];
  const d = t(locale);

  return (
    <>
      <PageHero locale={locale} crumbs={[{ name: d.footer.privacy }]} title={c.h1} lead={c.lead} />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page max-w-3xl">
          <p className="text-xs uppercase tracking-wider text-slateblue">
            {d.blog.published}{' '}
            <time dateTime={privacy.updated}>
              {new Date(privacy.updated).toLocaleDateString(locale === 'ar' ? 'ar-AE' : 'en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </p>
          <div className="mt-8">
            <Blocks blocks={privacy.body} locale={locale} />
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbSchema(
          [
            { name: d.breadcrumb.home, path: '' },
            { name: d.footer.privacy, path: 'privacy' },
          ],
          locale,
        )}
      />
    </>
  );
}
