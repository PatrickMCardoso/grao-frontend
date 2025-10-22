import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

export default {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#67A22D',
          foreground: '#ffffff',
        },

        muted: {
          DEFAULT: '#EDF2E8',
          foreground: '#1f2937',
        },
      },
      fontFamily: {
        serif: ['var(--font-newsreader)'],
      },
    },
  },
  plugins: [animate],
} satisfies Config;
