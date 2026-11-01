import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const MARKETPLACE_THEME = {
  colors: {
    primary: {
      DEFAULT: '#7000FF', // Uzum / Modern vibrant purple
      foreground: '#FFFFFF',
      50: '#F5F0FF',
      100: '#EAE0FF',
      500: '#7000FF',
      600: '#5F00D9',
      700: '#4D00B3',
    },
    accent: {
      yellow: '#FFE600', // Uzum yellow badge
      red: '#F43F5E',
      green: '#10B981',
      orange: '#F97316',
    },
    uzbekistan: {
      blue: '#0099B5',
      green: '#1EB53A',
      red: '#CE1126',
    }
  }
};
