export type City = {
	name: string
	lat: number
	lon: number
	country: string
	state: string
	main: {
		feels_like: number
		humidity: number
		pressure: number
		temp: number
		temp_max: number
		temp_min: number
	}
	weather: [
		{
			description: string
			icon: string
			id: number
			main: string
		}
	]
	sys: {
		country: string
	}
	wind: {
		deg: number
		speed: number
	}
	dt_txt: string
}

export interface ErrorItem {
	message: string
}
export interface WeatherData {
	weatherCity: City
	errors: any[]
	status: number
}
export interface CustomError extends Error {
	code?: string | number
	response?: any
}

export interface Coords {
	longitude: number
	latitude: number
}
