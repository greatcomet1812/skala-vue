<script setup>
import { computed, ref } from 'vue'
import BaseDashboardCard from '../components/exercise/BaseDashboardCard.vue'

// 통계 화면에서 임시로 사용할 날씨 Mock Data
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '경주', temp: 29, status: '맑음' },
  { id: 'city_05', name: '대전', temp: 25, status: '구름' },
])

// 전체 도시 기온의 평균 계산
const averageTemp = computed(() => {
  const totalTemp = weatherList.value.reduce((sum, weather) => sum + weather.temp, 0)
  return (totalTemp / weatherList.value.length).toFixed(1)
})

// 가장 높은 기온을 가진 도시 계산
const hottestCity = computed(() => {
  return weatherList.value.reduce((hottest, weather) =>
    weather.temp > hottest.temp ? weather : hottest,
  )
})

// 가장 낮은 기온을 가진 도시 계산
const coolestCity = computed(() => {
  return weatherList.value.reduce((coolest, weather) =>
    weather.temp < coolest.temp ? weather : coolest,
  )
})
</script>

<template>
  <main class="weather-stats">
    <h1>날씨 통계</h1>

    <BaseDashboardCard>
      <h2>지역별 기온 요약</h2>

      <div class="stats-grid">
        <article class="stat-item">
          <span>등록 도시 수</span>
          <strong>{{ weatherList.length }}개</strong>
        </article>

        <article class="stat-item">
          <span>평균 기온</span>
          <strong>{{ averageTemp }}°C</strong>
        </article>

        <article class="stat-item">
          <span>가장 더운 도시</span>
          <strong>{{ hottestCity.name }} ({{ hottestCity.temp }}°C)</strong>
        </article>

        <article class="stat-item">
          <span>가장 선선한 도시</span>
          <strong>{{ coolestCity.name }} ({{ coolestCity.temp }}°C)</strong>
        </article>
      </div>
    </BaseDashboardCard>

    <BaseDashboardCard>
      <h2>도시별 현재 기온</h2>

      <ul class="weather-summary-list">
        <li v-for="weather in weatherList" :key="weather.id">
          <span>{{ weather.name }} ({{ weather.status }})</span>
          <strong>{{ weather.temp }}°C</strong>
        </li>
      </ul>
    </BaseDashboardCard>

    <RouterLink to="/" class="back-link">← 대시보드 홈으로 이동</RouterLink>
  </main>
</template>

<style scoped>
.weather-stats {
  padding-top: 32px;
}

.weather-stats > h1 {
  margin: 0 0 24px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.stat-item {
  padding: 16px;
  background-color: #f8fafc;
  border-radius: 6px;
}

.stat-item span,
.stat-item strong {
  display: block;
}

.stat-item strong {
  margin-top: 6px;
  font-size: 1.1rem;
}

.weather-summary-list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.weather-summary-list li {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #e5e7eb;
}

.weather-summary-list li:last-child {
  border-bottom: none;
}

.back-link {
  display: inline-block;
  margin-top: 20px;
  color: #2e7d32;
  text-decoration: none;
}
</style>
