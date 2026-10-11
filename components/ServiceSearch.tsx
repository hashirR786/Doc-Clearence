'use client';

import { useMemo, useState } from 'react';
import ServiceCard from './ServiceCard';
import { SearchIcon } from './icons';
import { categories, services, type ServiceCategory } from '@/content/services';
import type { Locale } from '@/content/site';
import { t } from '@/content/ui';

/**
 * Client-side search and category filter for the services overview page.
 * Matches on service name, summary and the target keyword list, so searching
 * "TRN" or "labour card" finds the right page even when the words differ.
 */
export default function ServiceSearch({ locale }: { locale: Locale }) {
  const d = t(locale);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ServiceCategory | 'all'>('all');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter((s) => {
      if (category !== 'all' && s.category !== category) return false;
      if (!q) return true;
      const haystack = [
        s[locale].name,
        s[locale].summary,
        s[locale].h1,
        s.en.name,
        s.slug.replace(/-/g, ' '),
        ...s.keywords,
      ]
        .join(' ')
        .toLowerCase();
      return q.split(/\s+/).every((word) => haystack.includes(word));
    });
  }, [query, category, locale]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <label htmlFor="service-search" className="sr-only">
            {d.servicesPage.searchLabel}
          </label>
          <SearchIcon className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slateblue" />
          <input
            id="service-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={d.servicesPage.searchPlaceholder}
            className="w-full rounded-xl border border-navy/12 bg-white py-3 pe-4 ps-11 text-sm text-navy
                       placeholder:text-slateblue/70 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/25"
          />
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label={d.servicesPage.searchLabel}>
          <FilterChip active={category === 'all'} onClick={() => setCategory('all')}>
            {d.servicesPage.filterAll}
          </FilterChip>
          {categories.map((c) => (
            <FilterChip key={c.id} active={category === c.id} onClick={() => setCategory(c.id)}>
              {c[locale]}
            </FilterChip>
          ))}
        </div>
      </div>

      <p className="mt-5 text-xs uppercase tracking-wider text-slateblue" aria-live="polite">
        {d.servicesPage.resultsCount(results.length)}
      </p>

      {results.length === 0 ? (
        <p className="mt-10 rounded-2xl bg-cream p-8 text-center text-sm text-slateblue">
          {d.servicesPage.noResults}
        </p>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((s) => (
            <ServiceCard key={s.slug} service={s} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
        active
          ? 'border-gold bg-gold/10 text-gold-dark'
          : 'border-navy/12 text-slateblue hover:border-gold/50 hover:text-navy'
      }`}
    >
      {children}
    </button>
  );
}
