const colors = require('tailwindcss/colors')

module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				violet: colors.violet,
				fuchsia: colors.fuchsia,
				rose: colors.rose,
				gray: colors.blueGray,
			},
			transitionProperty: {
				'sizing': 'height, width',
			}
		},
	},
	experimental: {
		darkModeVariant: true
	},
	variants: {
		extend: {
			scale: ['group-hover'],
			fontWeight: ['hover'],
		},
	},
	plugins: [],
}
