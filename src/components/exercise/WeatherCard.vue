<script setup>
// 선택된 도시 객체를 전달 받아 표시
// 한 instance 이렇게 생김: { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
import { computed } from 'vue'
import { useConfigStore } from '../../stores/configStore'

const props = defineProps({
  weather: {
    type: Object,
    required: true,
  },
})

const configStore = useConfigStore()

// 단위 설정에 맞춰 카드의 기온 표시
const displayTemp = computed(() => {
  const rawTemp = props.weather.temp

  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }

  return rawTemp
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
  <el-card class="weather-card" shadow="hover" @click="selectCard">
    <div class="weather-card-content">
      <div>
        <h3>
          {{ props.weather.name }}
          <el-tag v-if="configStore.showWeatherStatus" type="info" size="small">
            {{ props.weather.status }}
          </el-tag>
        </h3>
        <p>현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>

        <p v-if="props.weather.temp >= 25" class="hot-label">🔥 더움 (25도 이상)</p>
        <p v-else class="cool-label">❄️ 선선함 (25도 미만)</p>
      </div>

      <el-button type="primary" plain @click.stop="clickDetail">상세보기</el-button>
    </div>
  </el-card>
</template>

<style scoped>
.weather-card {
  cursor: pointer;
}

.weather-card-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
