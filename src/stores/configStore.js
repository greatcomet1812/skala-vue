// 날씨 단위 세팅
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

// 앱 전체에서 공유할 날씨 단위 설정 Store
export const useConfigStore = defineStore('config', () => {
  // state - 현재 선택된 온도 단위
  const unit = ref('celsius')

  // getter - 현재 단위에 맞는 기호
  const unitSymbol = computed(() => {
    return unit.value === 'celsius' ? '℃' : '℉'
  })

  // action - 섭씨/화씨 단위 전환
  const toggleUnit = () => {
    unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
  }

  // 추가 Store 기능
  // state - 날씨 상태 표시 여부
  const showWeatherStatus = ref(true)

  // getter - 현재 표시 상태 설명 문구
  const weatherStatusLabel = computed(() => {
    return showWeatherStatus.value ? '상태 표시 중' : '상태 숨김 중'
  })

  // action - 날씨 상태 표시/숨김 전환
  const toggleWeatherStatus = () => {
    showWeatherStatus.value = !showWeatherStatus.value
  }

  return {
    unit,
    unitSymbol,
    toggleUnit,
    showWeatherStatus,
    weatherStatusLabel,
    toggleWeatherStatus,
  }
})
