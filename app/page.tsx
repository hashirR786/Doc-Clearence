import { locales } from '@/content/site';

/**
 * Root redirect to a locale.
 *
 * On a Node host (Vercel) `middleware.ts` handles `/` before this ever
 * renders, picking the locale from the visitor's Accept-Language header.
 *
 * On a static host there is no middleware, so this page is the entry point:
 * it ships the same language preference check as a tiny inline script, with a
 * meta refresh and a real link behind it for anyone without JavaScript.
 */
export const metadata = {
  robots: { index: false, follow: true },
};

const redirectScript = `
(function () {
  try {
    var saved = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]*)/);
    var pick = saved && ${JSON.stringify(locales)}.indexOf(saved[1]) !== -1
      ? saved[1]
      : ((navigator.language || 'en').toLowerCase().indexOf('ar') === 0 ? 'ar' : 'en');
    location.replace(new URL(pick + '/', document.baseURI).href);
  } catch (e) {
    location.replace('en/');
  }
})();
`.trim();

export default function RootRedirect() {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content="0; url=en/" />
        <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      </head>
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A1F44',
          color: '#F8F6F1',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <p>
          <a href="en/" style={{ color: '#E3C46F' }}>
            Continue to Gulf Nejoom
          </a>
        </p>
      </body>
    </html>
  );
}
