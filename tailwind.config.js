module.exports = {
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      'xxl': '1840px',
    },
	fontFamily: {
      'display': 'Merriweather Sans, sans-serif',
      'body': ['"Libre Franklin"', 'sans-serif'],
    },
    boxShadow: {
      default: '0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .06)',
       md: ' 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06)',
      lg: ' 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05)',
      xl: ' 0 20px 25px -5px rgba(0, 0, 0, .1), 0 10px 10px -5px rgba(0, 0, 0, .04)',
      inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
      outline: '0 0 0 3px rgba(96,171,210,0.5)',
      focus: '0 0 0 3px rgba(96,171,210,0.5)',
      'none': 'none',
    },
    extend: {
	    colors: {
	        gray: {
	          '100': '#F5F6F6',
	          '200': '#DEE1E1',
	          '300': '#C7CCCC',
	          '400': '#B0B7B6',
	          '500': '#99A2A1',
	          '600': '#828D8C',
	          '700': '#6B7877',
	          '800': '#546462',
	          '900': '#3D4F4D',
	        },
	        orange: {
	          '100': '#FCEAD3',
	          '200': '#FBE0BC',
	          '300': '#FAD6A6',
	          '400': '#F9CC90',
	          '500': '#F7C17A',
	          '600': '#F6B764',
	          '700': '#F5AD4D',
	          '800': '#F3A237',
	          '900': '#f29821',
	        },
	        blue: {
	          '100': '#CDEBED',
	          '200': '#B4E2E4',
	          '300': '#9BD8DB',
	          '400': '#83CED2',
	          '500': '#6AC4C9',
	          '600': '#51BAC0',
	          '700': '#38B1B7',
	          '800': '#1FA7AE',
	          '900': '#069da5',
	        },

	        red: {
	          '100': '#FCD7D4',
	          '200': '#FAC2BF',
	          '300': '#F8AEAA',
	          '400': '#F79A95',
	          '500': '#F5867F',
	          '600': '#F3726A',
	          '700': '#F15D55',
	          '800': '#F0493F',
	          '900': '#ee352a',
	        }
	      }
      }
  },
  variants: {},
  plugins: []
}
