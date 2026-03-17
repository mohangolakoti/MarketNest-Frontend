/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 10px 30px -18px rgba(31, 41, 55, 0.5)',
      },
      colors: {
        brand: {
          50: '#f0fdfa',
          500: '#0d9488',
          600: '#0f766e',
        },
      },
    },
  },
  plugins: [],
};
