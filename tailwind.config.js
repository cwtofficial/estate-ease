/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
        colors:{
            neongreen: "#D1FC56",
            black: "#17161A"
        },
        fontFamily: {
          "satoshi-black": ["Satoshi-Black"],
          "satoshi-black-italic": ["Satoshi-BlackItalic"],
          "satoshi-bold": ["Satoshi-Bold"],
          "satoshi-bold-italic": ["Satoshi-BoldItalic"],
          "satoshi-italic": ["Satoshi-Italic"],
          "satoshi-light": ["Satoshi-Light"],
          "satoshi-light-italic": ["Satoshi-LightItalic"],
          "satoshi-medium": ["Satoshi-Medium"],
          "satoshi-medium-italic": ["Satoshi-MediumItalic"],
          "satoshi-regular": ["Satoshi-Regular"],
        }
    },
  },
  plugins: [],
}