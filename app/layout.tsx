import type { ReactNode } from 'react';

/**
 * Pass-through root layout.
 * The real <html> element lives in app/[locale]/layout.tsx so that `lang`
 * and `dir` can be set per locale.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
