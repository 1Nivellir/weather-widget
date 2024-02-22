<template>
	<div class="container">
		<div class="weather__block">
			<form @submit.prevent="getNewCity(inputCity)" class="form">
				<input
					type="text"
					v-model="inputCity"
					class="form__input"
					placeholder="Введите город"
				/>
				<button class="form__btn">Получить</button>
			</form>
			<div class="preload__wrapper" v-if="!showData">
				<h2 class="preload__title">
					Введите город или дайте разрешение браузеру получить информацию о
					вашем местоположении!
				</h2>
			</div>
			<div v-if="showData">
				<h2 class="weather__city">{{ city && city.name }}</h2>
				<div v-for="item in city?.weather" :key="item.id" class="weather__img">
					<img :src="getImage(item.icon)" alt="" />
				</div>
				<div>
					<span class="weather__temp"
						>{{ city && city.main.temp.toFixed(0) }}°</span
					>
				</div>
				<div class="weather__wrapper-descr">
					<span class="weather__descr">{{
						city && firstLetter(city.weather[0].description)
					}}</span>
					<div class="weather__wrapper-min">
						<span class="weather__minmax"
							>Минимальная: {{ city && city.main.temp_min.toFixed(0) }}°</span
						>

						<span class="weather__minmax"
							>Максимальная: {{ city && city.main.temp_max.toFixed(0) }}°</span
						>
					</div>
				</div>
				<div class="weather__wind wind">
					<ul class="wind__list list-reset">
						<li class="wind__item-1 wind__item">
							{{ city && city.main.feels_like.toFixed(0) }}°C
						</li>
						<li class="wind__item-2 wind__item">
							{{ city && city.main.humidity }} %
						</li>
						<li class="wind__item-3 wind__item">
							{{ city && city.wind.speed }} м/c
						</li>
					</ul>
				</div>
				<TheForecastWeather />
				<div class="wrapper__errors">
					<ul class="errors__list list-reset">
						<li
							class="errors__item"
							v-for="(item, index) in listErrors"
							:key="index"
						>
							{{ item.message }}
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useNuxtApp } from '#app'
import { type City, type ErrorItem } from '@/types/types'
import { useMyStoreStore } from '~/stores/store'
import { firstLetter, getImage } from './helpers'

const inputCity = ref('')
const store = useMyStoreStore()
const city = ref<City | null>(null)
const nuxtApp = useNuxtApp()
const listErrors = ref<ErrorItem[]>([])
const showData = ref(false)
const getNewCity = async (text: string) => {
	await store.getWeatherCity(text)
	inputCity.value = ''
}
watch(
	() => store.error,
	(newVal) => {
		listErrors.value = newVal as ErrorItem[]
	}
)

watch(
	() => store.getCity,
	(newVal) => {
		city.value = newVal
		if (city.value) {
			showData.value = true
		} else {
			showData.value = false
		}
	}
)

onMounted(async () => {
	const coordinates = await (nuxtApp as any).$geolocation.getLocation()
	const coords = {
		longitude: coordinates.longitude,
		latitude: coordinates.latitude,
	}
	await store.getWeatherCity(undefined, coords)
	city.value = store.getCity
})
</script>
