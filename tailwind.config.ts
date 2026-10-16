import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          /**
           * The client's swatch, used as sent.
           *
           * Blue contributes little to perceived luminance, so despite looking
           * far more vivid this measures as dark as the original #0A1F44:
           * 15.99:1 against white versus 16.25:1. Brightening the brand here
           * cost no contrast anywhere.
           */
          DEFAULT: '#010080',
          900: '#01005A',
          800: '#010080',
          700: '#1A1AA3',
          600: '#3A3ABF',
          /**
           * The original deep navy, kept for surfaces that must stay dark:
           * the hero scene's backdrop behind the video. The hero veil itself
           * is a separate literal gradient and is unaffected by this palette.
           */
          deep: '#0A1F44',
        },
        gold: {
          DEFAULT: '#C9A24B',
          light: '#E3C46F',
          dark: '#A8853A',
        },
        slateblue: '#5B6784',
        cream: '#F8F6F1',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 8px rgba(10,31,68,0.04), 0 12px 32px rgba(10,31,68,0.06)',
        lift: '0 8px 24px rgba(10,31,68,0.10), 0 24px 56px rgba(10,31,68,0.10)',
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(100deg, #A8853A 0%, #C9A24B 35%, #E3C46F 70%, #C9A24B 100%)',
        /**
         * Hero veil, tinted with the client's blue and lightened so more of
         * the footage reads through.
         *
         * Counter-intuitively this is safer than the deep navy it replaced:
         * green drives perceived luminance and this blue has none, so at equal
         * opacity it measured 6.09:1 against white where the navy managed
         * 5.23:1. That headroom is what paid for the lighter weight. Measured
         * worst case across the footage at these values: 4.96:1.
         */
        'navy-veil': 'linear-gradient(180deg, rgba(1,0,128,0.74) 0%, rgba(1,0,128,0.59) 45%, rgba(1,0,128,0.80) 100%)',
        'cream-veil': 'linear-gradient(180deg, rgba(248,246,241,0.78) 0%, rgba(248,246,241,0.42) 40%, rgba(248,246,241,0.80) 100%)',
      },
      letterSpacing: {
        label: '0.22em',
      },
      maxWidth: {
        content: '1200px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
