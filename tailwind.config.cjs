/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				askrella: {
					900: "#0d1117",
					800: "#161b22",
					700: "#21262d",
					600: "#2c3138",
					500: "#373844",
					400: "#42414f",
					300: "#4d4b5b",
					200: "#585566",
					100: "#63606c"
				}
			}
		}
	},
	plugins: []
};
