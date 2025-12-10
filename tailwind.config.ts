import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        'portfolio-fade': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'portfolio-fade': 'portfolio-fade 0.7s cubic-bezier(0.4,0,0.2,1) forwards',
      },
    },
  },
  plugins: [],
} satisfies Config
