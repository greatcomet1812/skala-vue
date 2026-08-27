<!-- 메인 날씨 대시보드 화면 -->

<!-- 모든 반응형 데이터 유지 -->
<script setup>
import { computed, ref, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useConfigStore } from '../stores/configStore'

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

// 지역별 날씨 데이터 배열
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '경주', temp: 29, status: '맑음' },
  { id: 'city_05', name: '대전', temp: 25, status: '구름' },
])

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
    <h1>과제 4: 날씨 (Router)</h1>
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

        <div class="weather-list">
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
