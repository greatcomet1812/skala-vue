<script setup>
// 선택된 도시 객체를 전달 받아 표시
// 한 instance 이렇게 생김: { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
const props = defineProps({
  weather: {
    type: Object,
    required: true,
  },
})

// 카드를 선택하는 것(select-card 이벤트)과 상세보기(click-detail 이벤트)를 부모에게 전달
const emit = defineEmits(['select-card', 'click-detail'])

const selectCard = () => {
  emit('select-card', props.weather)
}

const clickDetail = () => {
  emit('click-detail', props.weather)
}
</script>

<template>
  <article class="weather-card" @click="selectCard">
    <div>
      <h3>{{ props.weather.name }} ({{ props.weather.status }})</h3>
      <p>현재 기온: {{ props.weather.temp }}°C</p>

      <p v-if="props.weather.temp >= 25" class="hot-label">🔥 더움 (25도 이상)</p>
      <p v-else class="cool-label">❄️ 선선함 (25도 미만)</p>
    </div>

    <button @click.stop="clickDetail">상세보기</button>
  </article>
</template>

<style scoped>
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
</style>
