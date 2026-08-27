<!-- 지역별 상세 기상관측 정보를 보여주는 동적 페이지 -->
<script setup>
import { computed, onMounted, ref } from 'vue'
import { useConfigStore } from '../stores/configStore'
import { fetchAirQuality, fetchCurrentWeather, fetchWeatherForecast } from '../services/weatherApi'

const props = defineProps({
  cityId: {
    type: String,
    required: true,
  },
})

const configStore = useConfigStore()

// 도시 코드에 해당하는 API 요청 좌표
const weatherList = [
  { id: 'city_01', name: '서울', lat: 37.5665, lon: 126.978 },
  { id: 'city_02', name: '수원', lat: 37.2636, lon: 127.0286 },
  { id: 'city_03', name: '부산', lat: 35.1796, lon: 129.0756 },
  { id: 'city_04', name: '경주', lat: 35.8562, lon: 129.2247 },
  { id: 'city_05', name: '대전', lat: 36.3504, lon: 127.3845 },
]

const cityInfo = ref(null)
const forecastList = ref([])
const airQuality = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')

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

const convertTemp = (temp) => {
  return configStore.unit === 'fahrenheit' ? Math.round((temp * 9) / 5 + 32) : temp
}

// 현재 날씨, 5일 예보, 외부 대기질 데이터 함께 조회
const loadWeatherDetail = async () => {
  const selectedCity = weatherList.find((weather) => weather.id === props.cityId)

  if (!selectedCity) return

  isLoading.value = true
  errorMessage.value = ''

  try {
    const [currentData, forecastData, airQualityData] = await Promise.all([
      fetchCurrentWeather(selectedCity.lat, selectedCity.lon),
      fetchWeatherForecast(selectedCity.lat, selectedCity.lon),
      fetchAirQuality(selectedCity.lat, selectedCity.lon),
    ])

    cityInfo.value = {
      ...selectedCity,
      temp: Math.round(currentData.main.temp),
      status: currentData.weather[0].description,
      humidity: currentData.main.humidity,
    }

    forecastList.value = forecastData.list.map((forecast) => ({
      time: new Date(forecast.dt * 1000).toLocaleString('ko-KR', {
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
      }),
      temp: Math.round(forecast.main.temp),
      status: forecast.weather[0].description,
    }))

    airQuality.value = {
      pm10: airQualityData.current.pm10,
      pm25: airQualityData.current.pm2_5,
    }
  } catch (error) {
    console.error('상세 날씨 조회 실패:', error)
    errorMessage.value = '상세 날씨 데이터를 가져오지 못했습니다.'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadWeatherDetail)
</script>

<template>
  <main class="weather-detail">
    <h1>지역별 상세 기상 관측 정보</h1>

    <p v-if="isLoading">날씨 상세 정보를 불러오는 중입니다.</p>

    <p v-else-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <template v-else-if="cityInfo">
      <section class="detail-card">
        <h2>{{ cityInfo.name }} 날씨</h2>
        <p>도시 ID: {{ cityInfo.id }}</p>
        <p>현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>
        <p v-if="configStore.showWeatherStatus">현재 상태: {{ cityInfo.status }}</p>
        <p>현재 습도: {{ cityInfo.humidity }}%</p>
      </section>

      <section class="detail-card">
        <h2>3시간 단위 예보</h2>
        <ul>
          <li v-for="forecast in forecastList" :key="forecast.time">
            {{ forecast.time }} · {{ convertTemp(forecast.temp) }}{{ configStore.unitSymbol }} ·
            {{ forecast.status }}
          </li>
        </ul>
      </section>

      <section v-if="airQuality" class="detail-card">
        <h2>현재 대기질</h2>
        <p>PM10: {{ airQuality.pm10 }}㎍/㎥</p>
        <p>PM2.5: {{ airQuality.pm25 }}㎍/㎥</p>

        <!-- Open-Meteo 무료 API 출처 표기 -->
        <small>
          대기질 데이터 제공:
          <a href="https://open-meteo.com/" target="_blank" rel="noopener">
            Open-Meteo / CAMS ENSEMBLE
          </a>
        </small>
      </section>
    </template>

    <p v-else class="not-found-message">해당 도시의 날씨 정보를 찾을 수 없습니다.</p>

    <RouterLink to="/" class="back-link">← 대시보드 홈으로 이동</RouterLink>
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
  margin-bottom: 16px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.detail-card ul {
  margin-bottom: 0;
  padding-left: 20px;
}

.error-message {
  color: #e74c3c;
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
