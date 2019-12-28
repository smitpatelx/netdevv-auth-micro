// See default config https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
module.exports = {
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary-100': '#bed3f4',
      'primary-200': '#92b5ec',
      'primary-300': '#6698e5',
      'primary-400': '#3b7bde',
      'primary-500': '#2161c4',
      'primary-600': '#1a4c99',
      'primary-700': '#13366d',
      'primary-800': '#0b2041'
    }),
    textColor: theme => ({
      ...theme('colors'),
      'primary-100': '#bed3f4',
      'primary-200': '#92b5ec',
      'primary-300': '#6698e5',
      'primary-400': '#3b7bde',
      'primary-500': '#2161c4',
      'primary-600': '#1a4c99',
      'primary-700': '#13366d',
      'primary-800': '#0b2041',
    }),
    borderColor: theme => ({
      ...theme('colors'),
      'primary-100': '#bed3f4',
      'primary-200': '#92b5ec',
      'primary-300': '#6698e5',
      'primary-400': '#3b7bde',
      'primary-500': '#2161c4',
      'primary-600': '#1a4c99',
      'primary-700': '#13366d',
      'primary-800': '#0b2041',
    }),
    boxShadow: {
      'default': '0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .06)',
      'md': ' 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06)',
      'lg': ' 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05)',
      'xl': ' 0 20px 25px -5px rgba(0, 0, 0, .1), 0 10px 10px -5px rgba(0, 0, 0, .04)',
      'md-e': ' 0 0px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06)',
      'lg-e': ' 0 0px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05)',
      'xl-e': ' 0 0px 25px -5px rgba(0, 0, 0, .1), 0 10px 10px -5px rgba(0, 0, 0, .04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, .25)',
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, .3)',
      'inner': 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
      'outline': '0 0 0 3px rgba(66,153,225,0.5)',
      'focus': '0 0 0 3px rgba(66,153,225,0.5)',
      'none': 'none'
    },
    extend: {
      width: {
        '96': '29rem',
        '97': '44rem',
      }
    }
  },
  variants: {
    borderWidth: ['responsive', 'focus'],
  },
  plugins: []
};
