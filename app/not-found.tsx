import Link from 'next/link';
import './globals.css';

/**
 * Global 404 — rendered outside any locale segment, so it carries its own
 * <html> element (the root layout is a pass-through).
 */
export default function GlobalNotFound() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="flex min-h-screen items-center justify-center bg-cream px-5 text-center">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-label text-gold">404</p>
          <h1 className="mt-4 font-serif text-4xl font-semibold text-navy">Page not found</h1>
          <p className="mt-4 text-slateblue">The page you are looking for does not exist.</p>
          <Link href="/en" className="btn-gold mt-8">
            Back to home
          </Link>
        </div>
      </body>
    </html>
  );
}
