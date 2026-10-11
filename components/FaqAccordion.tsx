'use client';

import { useState } from 'react';
import { ChevronIcon } from './icons';

export interface FaqItem {
  q: string;
  a: string;
}

/**
 * Keyboard-accessible FAQ accordion.
 * Uses real buttons with aria-expanded/aria-controls rather than <details>,
 * so the open/closed state is announced consistently by screen readers.
 */
export default function FaqAccordion({ items, idPrefix = 'faq' }: { items: FaqItem[]; idPrefix?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-navy/[0.08] border-y border-navy/[0.08]">
      {items.map((item, i) => {
        const expanded = open === i;
        return (
          <div key={i}>
            <h3>
              <button
                type="button"
                id={`${idPrefix}-trigger-${i}`}
                aria-expanded={expanded}
                aria-controls={`${idPrefix}-panel-${i}`}
                onClick={() => setOpen(expanded ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-start transition-colors hover:text-gold-dark"
              >
                <span className="font-serif text-[1.0625rem] font-medium text-navy">{item.q}</span>
                <ChevronIcon
                  className={`h-4 w-4 shrink-0 text-gold transition-transform duration-300 ${
                    expanded ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </h3>
            <div
              id={`${idPrefix}-panel-${i}`}
              role="region"
              aria-labelledby={`${idPrefix}-trigger-${i}`}
              hidden={!expanded}
              className="pb-6 pe-10"
            >
              <p className="prose-site">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
