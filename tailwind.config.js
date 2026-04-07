module.exports = {
	content: [
		'./src/**/*.html',
		'../deploy/templates/*.html',
		'../deploy/templates/**/*.{html,twig}',
		'../deploy/templates/_components/\_*.twig'
	  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      'xxl': '1840px',
    },
	fontFamily: {
      'display': ['"Merriweather Sans", sans-serif'],
      'body': ['"Libre Franklin"', 'sans-serif'],
    },

}
