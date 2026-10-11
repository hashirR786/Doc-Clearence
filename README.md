# Gulf Nejoom Documents Clearance Service L.L.C — website

Bilingual (English / Arabic, with full RTL), SEO-optimised marketing site for a
UAE document clearance, typing centre and PRO services company.

Built with **Next.js 14 (App Router)**, **Tailwind CSS**, **GSAP ScrollTrigger**
(scroll-scrubbed hero video) and **Framer Motion** (section reveals). Every page
is statically generated and deployable to Vercel.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

```bash
npm run build                # production build
npm start                    # serve the production build
```

Visiting `/` redirects to `/en` or `/ar` based on the visitor's `Accept-Language`
header (and a `NEXT_LOCALE` cookie once they switch manually).

---

## Before you launch — the checklist

Everything below is a placeholder in the code. The site builds and runs without
these, but **do not go live until each one is replaced.**

### 1. Business details — `content/site.ts`

This one file drives the header, footer, contact pages, `tel:`/`mailto:` links,
WhatsApp links and all structured data. Replace:

| Placeholder             | What it is                                              |
|-------------------------|---------------------------------------------------------|
| `[PHONE]`               | `phone` (display), `phoneHref` (`+97141234567`), `whatsapp` (digits only, e.g. `971501234567`) |
| `[ADDRESS]`             | `address.street`, and `postalCode`                       |
| `[EMAIL]`               | `email`                                                  |
| `[TRADE LICENSE NO.]`   | `tradeLicense` — also appears in About and Terms copy     |
| `geo.lat` / `geo.lng`   | Exact office coordinates (currently generic Dubai)        |
| `social.*`              | Facebook / Instagram / LinkedIn URLs                      |
| `openingHours`          | Real opening hours, and the matching `openingHoursLabel`  |

> **NAP consistency matters for local SEO.** The name, address and phone here
> must match your Google Business Profile character for character.

### 2. Statistics — `content/site.ts` → `stats`

`[XX]+ years`, `[XX,XXX]+ documents` and so on are deliberate placeholders, and
the site prints a visible "figures are placeholders" note beneath them. Put in
numbers you can actually support, then delete the `trust.note` string in
`content/ui.ts` (both locales) to remove the note.

### 3. Testimonials — `content/general.ts` → `testimonials`

These are marked `placeholder: true` and render with a disclaimer. **Do not
invent reviews.** Replace each with a real, verifiable client quote and set
`placeholder: false`; the disclaimer disappears once none are flagged.

### 4. Terms — `content/pages.ts`

`[EMIRATE]` in the governing-law clause. Have a lawyer review the Terms and
Privacy Policy before publishing; they are a solid starting draft, not legal
advice.

### 5. Email delivery — `.env.local`

The contact form posts to `/api/contact`. Without a mail provider configured it
validates, rejects spam and **logs the enquiry to the server console** so
nothing is lost silently — but nobody gets an email.

```env
RESEND_API_KEY=re_xxxxxxxx
CONTACT_TO_EMAIL=info@gulfnejoom.ae
CONTACT_FROM_EMAIL=website@gulfnejoom.ae   # must be a verified sender domain
```

Using something other than [Resend](https://resend.com)? Swap the `fetch` call
at the bottom of `app/api/contact/route.ts`; the validation above it is
provider-agnostic.

### 6. Site URL

Set `NEXT_PUBLIC_SITE_URL` to the production origin with no trailing slash. It
feeds canonical URLs, `hreflang`, Open Graph, `sitemap.xml` and `robots.txt`, so
getting it wrong undermines the SEO work.

---

## Editing content

All copy lives in `content/` — no CMS, no database, no digging through JSX.

| File                       | Contains                                                      |
|----------------------------|---------------------------------------------------------------|
| `content/site.ts`          | Business details, NAP, hours, stats, hero video settings       |
| `content/ui.ts`            | Every UI label and the homepage sections, EN + AR              |
| `content/services/`        | One file per service group; `index.ts` is the registry         |
| `content/general.ts`       | Homepage FAQs, testimonials, the emirates served               |
| `content/blog.ts`          | Blog posts                                                     |
| `content/pages.ts`         | About, Privacy Policy, Terms                                   |

### Adding a service

1. Add a `Service` object (see `content/services/types.ts` for the shape) to a
   file in `content/services/` — or create a new file.
2. Import it in `content/services/index.ts` and add it to the `services` array.

That is the whole job. The service page, the services grid, the search index,
the mega menu, the footer, the contact form dropdown, the sitemap and the
`Service` structured data all read from that one array.

Each service carries, per locale: a unique `h1`, a `<60` char `title`, a `<155`
char `description`, 400–600 words of body copy, a document checklist, process
steps and FAQs.

### Adding a blog post

Append to `posts` in `content/blog.ts`. Bodies are authored once as bilingual
blocks (`{ type: 'p' | 'h2' | 'ul', en, ar }`), so both locales stay in sync.

---

## The scroll-scrubbed videos

`components/ScrollVideoScene.tsx` wraps a block of sections with a sticky,
viewport-tall video behind them and drives the video's `currentTime` from
scroll position via GSAP ScrollTrigger.

The homepage has two scenes:

| Scene      | Footage                | Sections inside it                     | Veil  |
|------------|------------------------|----------------------------------------|-------|
| Hero       | `hero.mp4`             | Hero, trust strip, brand statement      | Navy  |
| Services   | `services.mp4`         | "What we do" services grid              | Cream |

**The scrub maps to the scene's own scroll range** — first frame when the
scene's top hits the top of the viewport, last frame when its bottom hits the
bottom. So the footage plays across exactly the distance it is on screen for,
and **making a scene taller makes its animation last longer**. The hero scene
is about 2.4 viewport heights because three full-height sections are stacked
inside it.

Each scene falls back to its static poster — with no video request at all —
when any of these is true:

- `prefers-reduced-motion: reduce`
- viewport under 768px (mobile)
- `navigator.connection` reports 2G/3G or Data Saver
- the file fails to load or decode
- `enabled` is `false` for that video in `content/site.ts`

The services video is additionally lazy: it is not fetched until the scene is
within one viewport of being scrolled into view.

Append `?video=1` to any URL to force the videos on and preview the effect from
a device or connection that would otherwise fall back. The override is
remembered for the tab (sessionStorage), so it survives navigating around the
site, and the language switch preserves the query string along with anything
else on the URL (utm tags and the like).

### Client-side navigation

Two things make the scrub survive Next's client-side navigation, and both are
easy to break:

- **Seeks are deferred and replayed.** Right after a route change the video
  element is new and briefly at `readyState 0`, where the browser silently
  discards `currentTime` writes. If the page is not scrolling at that moment
  nothing re-fires, and the video stays frozen on frame one for the rest of
  the visit. The component therefore skips the write while the element cannot
  honour it and replays the newest position from `seeked`, `loadeddata` and
  `canplay`.
- **Measurement is deferred.** `ScrollTrigger.refresh()` runs on the next
  animation frame, on `load`, and from a `ResizeObserver` on the scene —
  refreshing inline measures a page Next is still laying out.

**One trap when editing `ScrollVideoScene`:** the wrapper around the sticky
media layer must not set `overflow` (not `overflow-hidden`, `auto` or
`scroll`). Any scrollable ancestor becomes the sticky element's scroll
container, and the pin silently stops working — the video scrolls away with the
content instead of staying put, and you lose most of the animation.

**Replacing a video:** see `public/video/README.md`. The one thing not to skip
is encoding with dense keyframes (`-g 2`) — without them the browser decodes
from the previous keyframe on every seek and the scrub stutters badly.

The veils (`bg-navy-veil` and `bg-cream-veil` in `tailwind.config.ts`) are
tuned so text clears WCAG AA against the busiest frame of the current footage.
If you swap in footage of a different brightness, re-check the contrast.

## Brand & design system

Derived from the logo.

| Token            | Value                      | Use                                   |
|------------------|----------------------------|---------------------------------------|
| `navy`           | `#0A1F44`                  | Primary, headings, dark sections       |
| `gold`           | `#C9A24B`                  | Accents, rules, icons                  |
| `gold.light`     | `#E3C46F`                  | Gradient highlight, links on navy      |
| `cream`          | `#F8F6F1`                  | Warm off-white section background      |
| `slateblue`      | `#5B6784`                  | Secondary text                         |

Headings use **Playfair Display** (echoing the logo wordmark), body uses
**Inter**, and Arabic uses **IBM Plex Sans Arabic** — all self-hosted via
`next/font`, so there is no render-blocking request to Google.

Reusable classes live in `app/globals.css`: `.btn-gold`, `.btn-navy`,
`.btn-outline`, `.card`, `.eyebrow` (the gold-ruled label from the logo
tagline), `.gold-rule`, `.container-page`, `.prose-site`.

### Logo assets

Generated from `LOGO-removebg-preview.png`, trimmed to the artwork (exactly 2:1):

- `public/images/logo.webp` / `.png` — navy artwork, for light backgrounds
- `public/images/logo-light.webp` / `.png` — white artwork with the gold swoosh,
  for navy and video sections
- `app/icon.png`, `app/apple-icon.png` — favicon and touch icon
- `public/images/og-image.png` — 1200×630 social share card

`<Logo variant="light" />` picks the light version; the header switches
automatically between the two as you scroll past the hero.

---

## SEO

- Unique `<title>` (<60 chars) and meta description (<155 chars) per page
- Canonical URLs and `hreflang` alternates (`en`, `ar`, `x-default`) everywhere
- One `<h1>` per page with a logical `h2`/`h3` hierarchy
- Breadcrumbs on every inner page, with matching `BreadcrumbList` JSON-LD
- JSON-LD: `Organization` + `ProfessionalService` sitewide, plus `Service`,
  `FAQPage`, `BreadcrumbList` and `Article` where relevant (`lib/seo.ts`)
- `sitemap.xml` with per-URL language alternates, and `robots.txt` — both
  generated from the content files, so new pages appear automatically
- Open Graph and Twitter cards; WebP/AVIF images with descriptive alt text
- Internal linking: related services on every service page, service links from
  blog posts, every service in the footer

Target keywords are declared per service in `content/services/*` (`keywords`),
which also powers the search on the services page — searching "TRN" finds VAT
Registration.

### Core Web Vitals

Static generation, self-hosted fonts, no render-blocking JS, a 57KB hero poster
as the LCP element, and explicit image dimensions throughout (no layout shift).
The video is deferred and skipped entirely on mobile and slow connections.

After deploying, confirm with Lighthouse against the production URL — local dev
numbers are not representative.

---

## Accessibility

Skip-to-content link, visible gold focus rings, semantic landmarks, labelled
form fields with `aria-invalid` / `aria-describedby` error wiring, an FAQ
accordion built from real buttons with `aria-expanded` / `aria-controls`, a
keyboard-closable mobile menu, and `prefers-reduced-motion` honoured globally
(it disables the reveals and the video scrub).

---

## Deploying to Vercel

1. Push the repository to GitHub.
2. Import it in Vercel — the framework is detected automatically.
3. Add the environment variables from `.env.example` in **Project → Settings →
   Environment Variables**.
4. Deploy, then point your domain at it.

After the first deploy:

- Submit `https://yourdomain.com/sitemap.xml` in Google Search Console
- Verify both `/en` and `/ar` are indexed and correctly paired via `hreflang`
- Test the contact form end to end and confirm the email arrives
- Run Lighthouse against production

---

## Project structure

```
app/
  layout.tsx              Pass-through root (html lives in [locale]/layout)
  [locale]/
    layout.tsx            html/lang/dir, fonts, header, footer, sitewide JSON-LD
    page.tsx              Home
    services/             Overview + [slug] detail pages
    locations/            Overview + [slug] emirate pages
    blog/                 Listing + [slug] articles
    about/ contact/ privacy/ terms/
  api/contact/route.ts    Form handler: validation, spam checks, email
  sitemap.ts  robots.ts
components/
  sections/               Home sections and shared page sections
  ScrollVideo.tsx         GSAP scroll-scrubbed background video
  Header / Footer / ContactForm / FaqAccordion / ServiceSearch / ...
content/                  All copy — see "Editing content"
lib/
  seo.ts                  Metadata builder and JSON-LD schemas
  locale.ts               Locale helpers
middleware.ts             Locale detection and redirect
```

---

## A note on positioning

The copy throughout describes Gulf Nejoom as a **private, licensed service
provider** and states plainly that it is not a government entity and cannot
influence government decisions. The footer carries this disclaimer on every
page. Keep that framing if you edit the copy — it is both accurate and what
keeps the site on the right side of UAE advertising expectations.
