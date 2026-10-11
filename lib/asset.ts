/**
 * Prefixes a path in `public/` with the deployment base path.
 *
 * `next/image` and `next/link` apply `basePath` automatically, but raw
 * <img>, <video> and <source> elements do not — so any asset referenced by a
 * plain string has to go through here or it 404s when the site is served from
 * a sub-path (as it is on GitHub Pages: /Doc-Clearence/).
 */
const base = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const assetPath = (path: string) => `${base}${path}`;
