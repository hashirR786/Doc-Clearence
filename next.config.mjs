/** @type {import('next').NextConfig} */

/**
 * STATIC_EXPORT=1 builds a fully static site for GitHub Pages.
 *
 * Pages serves files only, so that mode drops three things the server build
 * has: the locale-detecting middleware (replaced by a redirect page at /),
 * the /api/contact handler (set NEXT_PUBLIC_FORM_ENDPOINT to a hosted form
 * service instead), and on-demand image optimisation.
 *
 * Leave STATIC_EXPORT unset for Vercel or any Node host to get all three back.
 */
const isStaticExport = process.env.STATIC_EXPORT === '1';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  // Lets a verification build run without clobbering the .next directory a
  // dev server is using:  NEXT_BUILD_DIR=.next-build npx next build
  distDir: process.env.NEXT_BUILD_DIR || '.next',
  reactStrictMode: true,
  poweredByHeader: false,

  ...(isStaticExport
    ? {
        output: 'export',
        trailingSlash: true,
        basePath: basePath || undefined,
        images: { unoptimized: true },
      }
    : {
        images: { formats: ['image/avif', 'image/webp'] },
      }),
};

export default nextConfig;
