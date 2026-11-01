import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F4E8FF',
          100: '#E9D2FF',
          200: '#D3A5FF',
          300: '#BD77FF',
          400: '#A74AFF',
          500: '#7000FF', // Uzum purple signature
          600: '#5E00D6',
          700: '#4C00AD',
          800: '#3A0085',
          900: '#28005C',
        },
        uzum: {
          purple: '#7000FF',
          yellow: '#FFDE00',
          dark: '#141416',
          gray: '#7E818C',
          lightGray: '#F2F4F7',
          border: '#E2E5EB',
        },
        uzb: {
          blue: '#0099B5',
          green: '#1EB53A',
          red: '#CE1126',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
};

export default config;
