/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0A1F44',
          800: '#1B2A4E',
        },
        blush: {
          200: '#F8C8DC',
          100: '#FADADD',
        },
        beige: {
          100: '#F5E6D3',
          200: '#EFE3D0',
        },
        cream: '#FFF9F0',
        gold: '#C7A66B',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Montserrat', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        luxe: '0 30px 80px rgba(10, 31, 68, 0.14)',
      },
      letterSpacing: {
        luxe: '0.28em',
      },
    },
  },
  plugins: [],
};
