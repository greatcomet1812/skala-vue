<script setup>
import { computed, ref, watch, watchEffect } from 'vue'

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

// 도시 선택 상태바에 표시
const cardSelected = (weather) => {
  selectedCityInfo.value = weather
  statusMessage.value = `${weather.name}이/가 선택되었습니다.`
}

// 날씨 상세 내용 alert
const showDetail = (weatherName, status) => {
  window.alert(`${weatherName}의 현재 날씨는 [${status}] 상태입니다.`)
}

// 검색 결과 필터링
const filteredWeatherList = computed(() => {
  // weatherList, searchQuery에서 자동 계산 결과
  return weatherList.value.filter((weather) => weather.name.includes(searchQuery.value))
})

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

// 추가 기능: 맑은 도시만 조회
// 맑음 필터 on/off
const showSunnyOnly = ref(false)

// 검색 결과 + 맑음 필터 함께 반영한 결과 표시
const displayedWeatherList = computed(() => {
  return showSunnyOnly.value
    ? filteredWeatherList.value.filter((weather) => weather.status === '맑음')
    : filteredWeatherList.value
})

watch(showSunnyOnly, (isSunnyOnly) => {
  console.log(`[watch] 맑은 도시만 보기: ${isSunnyOnly ? '켜짐' : '꺼짐'}`)
})
</script>

<template>
  <main class="weather-mockup">
    <h1>과제 2: 날씨 (Composition)</h1>
    <section class="search-section">
      <h2>🔎 도시 검색</h2>

      <input
        id="search-query"
        type="text"
        :value="searchQuery"
        @input="searchQuery = $event.target.value"
        placeholder="검색할 도시 입력"
      />

      <p>
        검색 중인 도시:
        <strong>{{ searchQuery || '입력된 도시 없음' }}</strong>
      </p>
    </section>

    <label class="sunny-filter">
      <input type="checkbox" v-model="showSunnyOnly" />
      맑은 도시만 보기
    </label>

    <section class="weather-section">
      <h2>지역별 날씨 현황</h2>

      <div class="weather-list">
        <article
          v-for="weather in displayedWeatherList"
          :key="weather.id"
          class="weather-card"
          @click="cardSelected(weather)"
        >
          <div>
            <h3>{{ weather.name }} ({{ weather.status }})</h3>
            <p>현재 기온: {{ weather.temp }}°C</p>

            <p v-if="weather.temp >= 25" class="hot-label">🔥 더움 (25도 이상)</p>
            <p v-else class="cool-label">❄️ 선선함 (25도 미만)</p>
          </div>

          <button @click.stop="showDetail(weather.name, weather.status)">상세보기</button>
        </article>

        <p v-if="displayedWeatherList.length === 0" class="no-results">
          조건에 맞는 도시가 없습니다.
        </p>
      </div>
    </section>

    <div class="status-bar">
      {{ statusMessage }}
    </div>
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

.weather-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
}

.weather-card:hover {
  background-color: #f8fafc;
}

.weather-card h3,
.weather-card p {
  margin: 4px 0;
}

.hot-label {
  color: #e74c3c;
}

.cool-label {
  color: #3498db;
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

.sunny-filter {
  display: block;
  margin-top: 12px;
  margin-bottom: 24px;
}

.sunny-filter input {
  margin-right: 6px;
}
</style>
