/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'custom': '#171717',
        'op2':'#151c2f',
      },
      screens: {
        'phone': {'max': '1023px'},
        'pc': {'min': '1024px'},
      },
      boxShadow: {
        card: 'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset',
        'white-effect': ' 5px 5px 0px 0px rgba(109,40,217);',
        'dark-effect': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}

