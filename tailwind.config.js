/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        xmass: "url('/src/images/xmas.jpg')",
      },
      fontFamily: {
        'xmas-font': ['Mountains of Christmas', 'serif'],
      },
    },
  },
  plugins: [],
}
