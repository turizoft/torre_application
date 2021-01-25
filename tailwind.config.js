const colors = require('tailwindcss/colors');

module.exports = {
  purge: {
    content: ['./app/**/*.html.erb'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        gray: colors.trueGray,
        red: colors.red,
        blue: colors.lightBlue,
        white: colors.white,
        black: colors.black,
        primary: {
          100: '#f5f8d7',
          200: '#ebf1b0',
          300: '#e1ea88',
          400: '#d7e361',
          500: '#cddc39',
          600: '#a4b02e',
          700: '#7b8422',
          800: '#525817',
          900: '#292c0b',
        },
      },
      lineHeight: {
        none: '1',
        tighter: '1.125',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
        3: '.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
        12: '3rem',
      },
      minHeight: {
        0: '0',
        96: '24rem',
        full: '100%',
        screen: '100vh',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
