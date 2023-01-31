/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte}"],  theme: {
  extend: {},
},
daisyui: {
  themes: [ "dark","fantasy"],
},
plugins: [
  require("daisyui")
],
}