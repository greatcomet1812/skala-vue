<script setup>
import { ref } from 'vue'

// 지역별 날씨 데이터 배열
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
  { id: 'city_04', name: '경주', temp: 29, status: '맑음' },
  { id: 'city_05', name: '대전', temp: 25, status: '구름' },
])

const city = ref('')
const statusMessage = ref('카드를 클릭하거나 검색해 보세요.')

// 도시 선택 상태바에 표시
const cardSelected = (cityName) => {
  statusMessage.value = `${cityName}이 선택되었습니다.`
}

// 날씨 상세 내용 alert
const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <main class="weather-mockup">
    <h1>과제 1: 날씨 (Mockup)</h1>
    <section class="search-section">
      <h2>🔎 도시 검색</h2>

      <input
        id="search-by-city"
        type="text"
        :value="city"
        @input="city = $event.target.value"
        placeholder="검색할 도시 입력"
      />

      <p>
        검색 중인 도시:
        <strong>{{ city || '입력된 도시 없음' }}</strong>
      </p>
    </section>

    <section class="weather-section">
      <h2>지역별 날씨 현황</h2>

      <div class="weather-list">
        <article
          v-for="weather in weatherList"
          :key="weather.id"
          class="weather-card"
          @click="cardSelected(weather.name)"
        >
          <div>
            <h3>{{ weather.name }} ({{ weather.status }})</h3>
            <p>현재 기온: {{ weather.temp }}°C</p>

            <p v-if="weather.temp >= 25" class="hot-label">🔥 더움 (25도 이상)</p>
            <p v-else class="cool-label">❄️ 선선함 (25도 미만)</p>
          </div>

          <button @click.stop="showDetail(weather.name, weather.status)">상세보기</button>
        </article>
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
</style>
