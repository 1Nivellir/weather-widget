// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	app: {
		pageTransition: { name: 'page', mode: 'out-in' },
	},
	css: ['~/assets/styles/main.css'],
	modules: [
		// ...
		'@pinia/nuxt',
	],
	runtimeConfig: {
		public: {
			API_KEY: process.env.API_KEY,
		},
		server: {
			API_KEY: process.env.API_KEY,
		},
	},
	plugins: ['~/plugins/geolocation.ts'],
})
