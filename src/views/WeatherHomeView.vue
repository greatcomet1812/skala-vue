<!-- 메인 날씨 대시보드 화면 -->

<!-- 모든 반응형 데이터 유지 -->
<script setup>
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useConfigStore } from '../stores/configStore'
import { fetchCurrentWeather } from '../services/weatherApi'

import BaseDashboardCard from '../components/exercise/BaseDashboardCard.vue'
import SearchBar from '../components/exercise/SearchBar.vue'
import WeatherCard from '../components/exercise/WeatherCard.vue'
import SunnyFilter from '../components/exercise/SunnyFilter.vue'

const configStore = useConfigStore()
const router = useRouter()

// ====================================================
// 반응형 상태
// ====================================================
// 검색어
const searchQuery = ref('')

// 선택된 도시
const selectedCityInfo = ref(null)

// API 요청에 사용할 도시 좌표
const cityList = [
  { id: 'city_01', name: '서울', lat: 37.5665, lon: 126.978 },
  { id: 'city_02', name: '수원', lat: 37.2636, lon: 127.0286 },
  { id: 'city_03', name: '부산', lat: 35.1796, lon: 129.0756 },
  { id: 'city_04', name: '경주', lat: 35.8562, lon: 129.2247 },
  { id: 'city_05', name: '대전', lat: 36.3504, lon: 127.3845 },
]

// OpenWeatherMap에서 받아온 지역별 실제 날씨
const weatherList = ref([])
const isLoading = ref(false)
const errorMessage = ref('')

// 상태바 문구
const statusMessage = ref('카드를 클릭하거나 검색해 보세요.')

// 추가 기능: 맑은 도시만 조회
// 맑음 필터 on/off
const showSunnyOnly = ref(false)

// ====================================================
// 계산된 목록
// ====================================================
// 검색 결과 필터링
const filteredWeatherList = computed(() => {
  // weatherList, searchQuery에서 자동 계산 결과
  return weatherList.value.filter((weather) => weather.name.includes(searchQuery.value))
})

// 검색 결과 + 맑음 필터 함께 반영한 결과 표시
const displayedWeatherList = computed(() => {
  return showSunnyOnly.value
    ? filteredWeatherList.value.filter((weather) => weather.status === '맑음')
    : filteredWeatherList.value
})

// ====================================================
// 부모가 처리할 이벤트 함수
// ====================================================
// 도시 선택 상태바에 표시
const cardSelected = (weather) => {
  selectedCityInfo.value = weather
  statusMessage.value = `${weather.name}이/가 선택되었습니다.`
}

// 날씨 상세 내용 alert
const showDetail = (weather) => {
  // 상세보기 클릭 시 주소 변경 -> router가 화면 교체
  router.push('/weather/' + weather.id)
}

const updateSearchQuery = (newQuery) => {
  searchQuery.value = newQuery
}

const updateSunnyOnly = (isSunnyOnly) => {
  showSunnyOnly.value = isSunnyOnly
}

// 도시별 현재 날씨를 병렬로 가져와 기존 카드 형식으로 가공
const loadCurrentWeather = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    weatherList.value = await Promise.all(
      cityList.map(async (city) => {
        const data = await fetchCurrentWeather(city.lat, city.lon)

        return {
          ...city,
          temp: Math.round(data.main.temp),
          status: data.weather[0].description,
          humidity: data.main.humidity,
        }
      }),
    )
  } catch (error) {
    console.error('현재 날씨 조회 실패:', error)
    errorMessage.value = '실시간 날씨 데이터를 가져오지 못했습니다.'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadCurrentWeather)
// ====================================================
// 상태 감시
// ====================================================
// 상태바 문구가 바뀔때 마다 콘솔로그 작성
watch(selectedCityInfo, (newCity) => {
  // 도시 값이 비어있는 경우 종료
  if (!newCity) return
  console.log(`[watch] 상태바 문구 변경: ${newCity.name}이 선택되었습니다.`)
})

// 도시 검색어를 타이핑할 때 마다 변하는 searchQuery를 추적하여 콘솔로그로 작성
watchEffect(() => {
  console.log(`[watchEffect] 현재 검색어: ${searchQuery.value}`)
})

watch(showSunnyOnly, (isSunnyOnly) => {
  console.log(`[watch] 맑은 도시만 보기: ${isSunnyOnly ? '켜짐' : '꺼짐'}`)
})
</script>

<template>
  <main class="weather-mockup">
    <h1>과제 6: Weather Axios</h1>
    <BaseDashboardCard>
      <SearchBar :search-query="searchQuery" @update-query="updateSearchQuery" />
      <SunnyFilter :show-sunny-only="showSunnyOnly" @update-sunny-only="updateSunnyOnly" />
      <div class="status-setting">
        <span>
          날씨 상태:
          <strong>{{ configStore.weatherStatusLabel }}</strong>
        </span>

        <button @click="configStore.toggleWeatherStatus">상태 표시/숨김</button>
      </div>
    </BaseDashboardCard>

    <BaseDashboardCard>
      <section class="weather-section">
        <h2>지역별 날씨 현황</h2>

        <p v-if="isLoading" class="loading-message">실시간 날씨를 불러오는 중입니다.</p>

        <p v-else-if="errorMessage" class="error-message">
          {{ errorMessage }}
          <button @click="loadCurrentWeather">다시 시도</button>
        </p>

        <div v-else class="weather-list">
          <WeatherCard
            v-for="weather in displayedWeatherList"
            :key="weather.id"
            :weather="weather"
            @select-card="cardSelected"
            @click-detail="showDetail"
          />
          <p v-if="displayedWeatherList.length === 0" class="no-results">
            조건에 맞는 도시가 없습니다.
          </p>
        </div>
      </section>
      <div class="status-bar">
        {{ statusMessage }}
      </div>
    </BaseDashboardCard>
  </main>
</template>

<style scoped>
.weather-mockup {
  padding-top: 32px;
}

.weather-mockup > h1 {
  margin: 0 0 24px;
}

.weather-list {
  display: grid;
  gap: 12px;
}

.status-bar {
  margin-top: 16px;
  padding: 12px;
  text-align: center;
  color: #2e7d32;
  background: #e8f5e9;
  border-radius: 6px;
  font-weight: bold;
}

.no-results {
  margin-top: 12px;
  color: #6b7280;
  text-align: center;
}

.loading-message,
.error-message {
  text-align: center;
}

.error-message {
  color: #e74c3c;
}

.status-setting {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
}

.status-setting strong {
  color: #2e7d32;
}
</style>
