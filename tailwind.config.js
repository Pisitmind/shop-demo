const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: ["./src/**/*.{html,js}", "./node_modules/flowbite/**/*.js"],
  // content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  content: [flowbite.content()],
  
  darkMode: "class", // or 'media' based on your preference
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin()],
  // plugins: [require("flowbite/plugin")],
};
