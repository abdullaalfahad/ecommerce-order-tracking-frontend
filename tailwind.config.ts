/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust for your project structure
    "./pages/**/*.{js,jsx,ts,tsx}", // For Next.js
    "./components/**/*.{js,jsx,ts,tsx}", // Add other folders as needed
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
