<template>
	<div>
		<div class="forecast__wrapper">
			<h2 class="forecast__title">Следующий прогноз</h2>
			<ul class="forecast__list list-reset" v-if="listForecast">
				<NuxtLink
					class="forecast__item item"
					v-for="item in listForecast"
					:key="item.dt_txt"
					:to="`details/${getDate(item.dt_txt)}`"
				>
					<span class="item__date">{{ getDate(item.dt_txt) }}</span>
					<div class="item__temp-wrapper">
						<span class="item__temp"
							>Min: {{ item.main.temp_min.toFixed(0) }}°</span
						>

						<span class="item__temp"
							>Max: {{ item.main.temp_max.toFixed(0) }}°</span
						>
					</div>
				</NuxtLink>
			</ul>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { getDate, getOneDay } from './helpers'
const store = useMyStoreStore()

const listForecast = computed(() => {
	return getOneDay(store.getForecast.slice(0, 24))
})
</script>

<style></style>
