import { type City } from '@/types/types'

export const getDate = (text: string) => {
	const date = new Date(text)
	const year = date.getFullYear()
	const month = (date.getMonth() + 1).toString().padStart(2, '0')
	const day = date.getDate().toString().padStart(2, '0')
	return `${year}-${month}-${day}`
}
export function getOneDay(arr: City[]) {
	const result: Record<string, City> = {}
	for (let i = 0; i < arr.length; ++i) {
		const item = arr[i]
		const date = item.dt_txt.split(' ')[0]
		if (
			!result[date] ||
			item.main.temp_min < result[date].main.temp_min ||
			item.main.temp_max > result[date].main.temp_max
		) {
			result[date] = item
		}
	}

	return Object.values(result)
}
export const firstLetter = (text: string | undefined) => {
	if (!text) return
	return text.charAt(0).toUpperCase() + text.slice(1)
}
export function getImage(icon: any) {
	return `http://openweathermap.org/img/wn/${icon}.png`
}

export function getTime(time: string) {
	const date = new Date(time)
	const hours = date.getHours().toString().padStart(2, '0')
	const minutes = date.getMinutes().toString().padStart(2, '0')
	return `${hours}:${minutes}`
}
