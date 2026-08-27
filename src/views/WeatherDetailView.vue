<!-- 지역별 상세 기상관측 정보를 보여주는 동적 페이지 -->
<script setup>
import { computed, onMounted, ref } from 'vue'
import { useConfigStore } from '../stores/configStore'

const props = defineProps({
  cityId: {
    type: String,
    required: true,
  },
})

const configStore = useConfigStore()

// 도시 코드에 해당하는 임시 Mock Data
const weatherList = [
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '경주', temp: 29, status: '맑음' },
  { id: 'city_05', name: '대전', temp: 25, status: '구름' },
]

const cityInfo = ref(null)

// 단위에 맞춰 상세 페이지 기온 표시
const displayTemp = computed(() => {
  // 도시 정보가 없는 경우
  if (!cityInfo.value) return null

  const rawTemp = cityInfo.value.temp

  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }

  return rawTemp
})

// Router 동적 경로 매칭에 해당되는 도시ID (cityId)를 기반으로 Mount 시점에 Mock Data에서 도시 객체 선택
onMounted(() => {
  cityInfo.value = weatherList.find((weather) => weather.id === props.cityId)
})
</script>

<template>
  <main class="weather-detail">
    <h1>지역별 상세 기상 관측 정보</h1>

    <section v-if="cityInfo" class="detail-card">
      <h2>{{ cityInfo.name }} 날씨</h2>
      <p>도시 ID: {{ cityInfo.id }}</p>
      <p>현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>
      <p v-if="configStore.showWeatherStatus">현재 상태: {{ cityInfo.status }}</p>
    </section>

    <p v-else class="not-found-message">해당 도시의 날씨 정보를 찾을 수 없습니다.</p>

    <RouterLink to="/" class="back-link">← 메인 대시보드로 돌아가기</RouterLink>
  </main>
</template>

<style scoped>
.weather-detail {
  padding-top: 32px;
}

.weather-detail > h1 {
  margin: 0 0 24px;
}

.detail-card {
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.detail-card h2 {
  margin-top: 0;
}

.not-found-message {
  color: #e74c3c;
}

.back-link {
  display: inline-block;
  margin-top: 20px;
  color: #2e7d32;
  text-decoration: none;
}
</style>
