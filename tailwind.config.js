/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      gradientColorStops: {
        primary: '#65BAFA',
        secondary: '#9D37F2',
      },
      colors: {
        gray: {
          50: '#A2ABCC',
          500: '#727CA3',
          600: '#363F63',
          800: '#1B2031',
        },
      },
    },
  },
  plugins: [],
}
