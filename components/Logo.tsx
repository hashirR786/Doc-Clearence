import Image from 'next/image';
import Link from 'next/link';
import { site, type Locale } from '@/content/site';
import { href } from '@/lib/locale';
import { assetPath } from '@/lib/asset';

interface LogoProps {
  locale: Locale;
  /** 'dark' = navy artwork for light backgrounds. 'light' = white artwork for navy/video sections. */
  variant?: 'dark' | 'light';
  className?: string;
  /** Rendered height in pixels; width follows the logo's 2:1 aspect ratio. */
  height?: number;
  priority?: boolean;
}

/**
 * The company logo, linked to the homepage.
 *
 * Both variants are generated from LOGO-removebg-preview.png and trimmed to
 * the artwork, which lands at exactly 2:1 — so `width = height * 2` is the
 * intrinsic ratio and the image never letterboxes inside its own box.
 */
export default function Logo({
  locale,
  variant = 'dark',
  className = '',
  height = 46,
  priority = false,
}: LogoProps) {
  // assetPath, not a bare path: with images.unoptimized (the static export
  // for GitHub Pages) next/image emits the src verbatim and does NOT prefix
  // basePath, so a sub-path deployment would 404 on the logo.
  const src = assetPath(variant === 'light' ? '/images/logo-light.webp' : '/images/logo.webp');

  return (
    <Link
      href={href(locale)}
      className={`inline-flex shrink-0 items-center ${className}`}
      aria-label={`${site.shortName} — ${locale === 'ar' ? 'الصفحة الرئيسية' : 'home'}`}
    >
      <Image
        src={src}
        alt={site.legalName}
        width={height * 2}
        height={height}
        priority={priority}
        sizes={`${height * 2}px`}
        className="h-auto w-auto object-contain"
        style={{ height: `${height}px` }}
      />
    </Link>
  );
}
