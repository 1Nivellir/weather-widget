<template>
	<div class="container">
		<div class="weather__block">
			<NuxtLink to="/" class="link__back">&lt; Назад</NuxtLink>
			<h2 class="details__title">Детальный прогноз на: {{ date }}</h2>
			<ul class="details__list list-reset">
				<li class="details__item" v-for="item in listDetails">
					<img :src="getImage(item.weather[0].icon)" alt="" />
					<span class="details__descr">{{
						firstLetter(item.weather[0].description)
					}}</span>
					<span class="details__date">{{ getTime(item.dt_txt) }}</span>
					<span class="details__temp">{{ item.main.temp.toFixed(0) }}°</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { firstLetter, getImage, getTime } from '@/components/helpers'
const route = useRoute()
const store = useMyStoreStore()
const listDetails = computed(() => {
	return store.getForecast.filter((item) => {
		return item.dt_txt.includes(date.value)
	})
})
const date = ref<string>('')
onMounted(() => {
	if (typeof route.params.date === 'string') date.value = route.params.date
})
</script>

<style></style>
