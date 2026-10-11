import type { MetadataRoute } from 'next';
import { locales, site } from '@/content/site';
import { services } from '@/content/services';
import { locations } from '@/content/general';
import { posts } from '@/content/blog';
import { href } from '@/lib/locale';

/**
 * Every page, in both locales, with hreflang alternates so Google pairs
 * the English and Arabic versions.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  type Entry = {
    path: string;
    priority: number;
    freq: 'daily' | 'weekly' | 'monthly' | 'yearly';
    date?: string;
  };

  const staticPaths: Entry[] = [
    { path: '', priority: 1, freq: 'weekly' },
    { path: 'services', priority: 0.9, freq: 'weekly' },
    { path: 'locations', priority: 0.7, freq: 'monthly' },
    { path: 'about', priority: 0.6, freq: 'monthly' },
    { path: 'contact', priority: 0.8, freq: 'monthly' },
    { path: 'blog', priority: 0.7, freq: 'weekly' },
    { path: 'privacy', priority: 0.3, freq: 'yearly' },
    { path: 'terms', priority: 0.3, freq: 'yearly' },
  ];

  const servicePaths = services.map((s) => ({
    path: `services/${s.slug}`,
    priority: 0.85,
    freq: 'monthly' as const,
  }));

  const locationPaths = locations.map((l) => ({
    path: `locations/${l.slug}`,
    priority: 0.6,
    freq: 'monthly' as const,
  }));

  const blogPaths = posts.map((p) => ({
    path: `blog/${p.slug}`,
    priority: 0.5,
    freq: 'monthly' as const,
    date: p.date,
  }));

  const all: Entry[] = [...staticPaths, ...servicePaths, ...locationPaths, ...blogPaths];

  return all.flatMap((entry) =>
    locales.map((locale) => ({
      url: `${site.url}${href(locale, entry.path)}`,
      lastModified: entry.date ? new Date(entry.date) : new Date(),
      changeFrequency: entry.freq,
      priority: entry.priority,
      alternates: {
        languages: {
          en: `${site.url}${href('en', entry.path)}`,
          ar: `${site.url}${href('ar', entry.path)}`,
        },
      },
    })),
  );
}
