import Link from 'next/link';
import { ui } from '@/content/ui';
import { href } from '@/lib/locale';

/**
 * 404 inside a locale segment. Next does not pass params to not-found files,
 * so this uses the English copy with the Arabic underneath rather than
 * guessing the locale.
 */
export default function NotFound() {
  const en = ui.en.notFound;
  const ar = ui.ar.notFound;

  return (
    <section className="flex min-h-[70vh] items-center bg-cream py-32">
      <div className="container-page text-center">
        <p className="eyebrow justify-center">404</p>
        <h1 className="mt-5 font-serif text-4xl font-semibold text-navy sm:text-5xl">{en.title}</h1>
        <p className="mx-auto mt-5 max-w-md text-slateblue">{en.body}</p>

        <div className="gold-rule mx-auto my-8 max-w-xs" />

        <p className="font-serif text-2xl text-navy" lang="ar" dir="rtl">
          {ar.title}
        </p>
        <p className="mx-auto mt-3 max-w-md text-slateblue" lang="ar" dir="rtl">
          {ar.body}
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={href('en')} className="btn-gold">
            {en.cta}
          </Link>
          <Link href={href('ar')} className="btn-outline" lang="ar">
            {ar.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
