import axios from 'axios'
import { API_KEY, URL_WEATHER_API, URL_WEATHER_FORECAST } from '~/confiig'
import type { Coords } from '~/types/types'
export const getWeatherCity = async (city?: string, state?: Coords) => {
	let params = {}
	if (state) {
		params = {
			lat: state.latitude,
			lon: state.longitude,
			appid: API_KEY,
			units: 'metric',
			lang: 'ru',
		}
	} else {
		params = {
			q: city,
			appid: API_KEY,
			units: 'metric',
			lang: 'ru',
		}
	}

	try {
		const response = await axios.get(URL_WEATHER_API, {
			params: params,
		})
		return { weatherCity: response.data, errors: [], status: response.status }
	} catch (error: any) {
		const structuredError = {
			name: error.name,
			message: 'Не корректный запрос. Попробуйте ещё раз',
			code: error.code,
			response: error.response?.data,
		}
		return {
			errors: [structuredError],
		}
	}
}

export const getWeatherCityForecast = async (city?: string, state?: Coords) => {
	let params = {}
	if (state) {
		params = {
			lat: state.latitude,
			lon: state.longitude,
			appid: API_KEY,
			units: 'metric',
			lang: 'ru',
		}
	} else {
		params = {
			q: city,
			appid: API_KEY,
			units: 'metric',
			lang: 'ru',
		}
	}
	try {
		const response = await axios.get(URL_WEATHER_FORECAST, {
			params: params,
		})
		return {
			weatherCityForecast: response.data.list,
			errors: [],
			status: response.status,
		}
	} catch (error: any) {
		const structuredError = {
			name: error.name,
			message: 'Не корректный запрос. Попробуйте ещё раз',
			code: error.code,
			response: error.response?.data,
		}
		return {
			errors: [structuredError],
		}
	}
}
