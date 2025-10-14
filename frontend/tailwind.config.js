import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
    '@tailwindcss/typography'
  ],
  daisyui: {
    themes: ["bumblebee", "cyberpunk", "forest", "coffee"]
  }
}