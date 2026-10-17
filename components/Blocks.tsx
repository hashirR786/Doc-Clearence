import { CheckIcon } from './icons';
import type { Block } from '@/content/blog';
import { site, type Locale } from '@/content/site';

/**
 * Business details written into prose use tokens rather than literals, so the
 * legal pages cannot drift from content/site.ts. The trade licence is still
 * unknown, so its token renders the placeholder and stays visible until the
 * real number is filled in once, in site.ts.
 */
const fill = (text: string) =>
  text
    .replace(/\{\{phone\}\}/g, site.phone)
    .replace(/\{\{email\}\}/g, site.email)
    .replace(
      /\{\{address\}\}/g,
      `${site.address.street}, ${site.address.district}, ${site.address.locality}`,
    )
    .replace(/\{\{licence\}\}/g, site.tradeLicense);

/** Renders the bilingual block format used by blog posts and static pages. */
export default function Blocks({ blocks, locale }: { blocks: Block[]; locale: Locale }) {
  return (
    <div className="prose-site">
      {blocks.map((block, i) => {
        if (block.type === 'h2') {
          return (
            <h2 key={i} className="mt-12 font-serif text-2xl font-semibold text-navy first:mt-0">
              {fill(block[locale])}
            </h2>
          );
        }
        if (block.type === 'ul') {
          return (
            <ul key={i} className="mt-5 space-y-2.5">
              {block[locale].map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-gold" />
                  <span>{fill(item)}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="mt-4">
            {fill(block[locale])}
          </p>
        );
      })}
    </div>
  );
}
