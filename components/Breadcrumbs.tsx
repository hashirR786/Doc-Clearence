import Link from 'next/link';
import type { Locale } from '@/content/site';
import { t } from '@/content/ui';
import { href } from '@/lib/locale';

export interface Crumb {
  name: string;
  /** Path without locale prefix. Omit on the final crumb. */
  path?: string;
}

/**
 * Breadcrumb trail. The matching BreadcrumbList JSON-LD is emitted separately
 * by each page via `breadcrumbSchema` so the two stay in sync.
 */
export default function Breadcrumbs({ locale, items }: { locale: Locale; items: Crumb[] }) {
  const d = t(locale);
  const all: Crumb[] = [{ name: d.breadcrumb.home, path: '' }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="text-[13px]">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-slateblue">
        {all.map((crumb, i) => {
          const last = i === all.length - 1;
          return (
            <li key={`${crumb.name}-${i}`} className="flex items-center gap-2">
              {last || crumb.path === undefined ? (
                <span aria-current="page" className="font-medium text-navy">
                  {crumb.name}
                </span>
              ) : (
                <Link href={href(locale, crumb.path)} className="transition-colors hover:text-gold-dark">
                  {crumb.name}
                </Link>
              )}
              {!last && (
                <span aria-hidden="true" className="text-navy/25 rtl:rotate-180">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
