/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#040f13",
        secondary: "#0b2d39",
        disabled: "#1e7898",
        warning: "#FFA726",
        danger: "#DC3545",
        light: {
          100: "#fff",
          200: "#bee0ec",
        },
        gray: {
          100: "#1A1A1A",
        },
      },
    },
  },
  plugins: [],
};
