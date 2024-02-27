import { defineStore } from 'pinia'
import { type City, type Coords, type CustomError } from '~/types/types'
import { getWeatherCity, getWeatherCityForecast } from '../entities/api'

export const useMyStoreStore = defineStore({
	id: 'myStoreStore',
	state: () => ({
		city: {} as City,
		forecast: [] as City[],
		error: [] as CustomError[],
	}),
	getters: {
		getCity: (state) => state.city,
		getForecast: (state) => state.forecast,
		getError: (state) => state.error,
	},
	actions: {
		getCityAction() {
			return this.city
		},
		async getWeatherCity(city?: string, coords?: Coords) {
			try {
				const [weatherData, forecastData] = await Promise.all([
					getWeatherCity(city, coords),
					getWeatherCityForecast(city, coords),
				])
				if (weatherData.status === 200 || forecastData.status === 200) {
					this.city = weatherData.weatherCity
					this.forecast = this.getFiltered(forecastData.weatherCityForecast)
					this.error = weatherData.errors
				}
				this.error.push(...weatherData.errors)
			} catch (error) {
				throw new Error('Error: ' + error)
			}
		},
		getFiltered(arr: City[]) {
			if (!Array.isArray(arr)) {
				throw new Error('Input is not an array')
			}
			const now = new Date()
			const tomorrow = new Date(now)
			tomorrow.setDate(tomorrow.getDate() + 1)
			tomorrow.setHours(0, 0, 0, 0)
			const threeDaysLater = new Date(now)
			threeDaysLater.setDate(threeDaysLater.getDate() + 4)
			return arr.filter((item) => {
				const date = new Date(item.dt_txt)
				return date >= tomorrow && date < threeDaysLater
			})
		},
	},
})
