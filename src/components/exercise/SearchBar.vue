<script setup>
import { computed } from 'vue'

// 부모로부터 검색도시 반응형 데이터를 전달받아 표시
const props = defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
})

// 도시 검색 시 update-query 이벤트를 발생하면서 검색어를 부모에게 전달
const emit = defineEmits(['update-query'])

// Element Plus의 v-model과 부모 검색어를 연결
const searchQueryModel = computed({
  get: () => props.searchQuery,
  set: (newQuery) => emit('update-query', newQuery),
})
</script>

<template>
  <section class="search-section">
    <h2>🔎 도시 검색</h2>

    <el-input
      id="search-query"
      v-model="searchQueryModel"
      placeholder="검색할 도시 입력"
      clearable
    />

    <p>
      검색 중인 도시:
      <strong>{{ props.searchQuery || '입력된 도시 없음' }}</strong>
    </p>
  </section>
</template>

<style scoped>
/* 기존 전역 input 스타일이 Element Plus 내부 input에 중복 적용되지 않도록 초기화 */
.search-section :deep(.el-input__inner),
.search-section :deep(.el-input__inner:focus) {
  padding: 0;
  border: none;
  border-radius: 0;
  box-shadow: none;
}
</style>
