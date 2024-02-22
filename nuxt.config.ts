// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	css: ['~/assets/styles/main.css'],
	modules: [
		// ...
		'@pinia/nuxt',
	],
	runtimeConfig: {
		public: {
			API_KEY: process.env.API_KEY,
			URL_WEATHER_API: process.env.URL_WEATHER_API,
			URL_WEATHER_FORECAST: process.env.URL_WEATHER_FORECAST,
		},
	},
	plugins: ['~/plugins/geolocation.ts'],
})
