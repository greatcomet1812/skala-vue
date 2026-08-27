<script setup>
// 부모로부터 검색도시 반응형 데이터를 전달받아 표시
const props = defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
})

// 도시 검색 시 update-query 이벤트를 발생하면서 검색어를 부모에게 전달
const emit = defineEmits(['update-query'])

const updateQuery = (e) => {
  emit('update-query', e.target.value)
}
</script>

<template>
  <section class="search-section">
    <h2>🔎 도시 검색</h2>

    <input
      id="search-query"
      type="text"
      :value="props.searchQuery"
      @input="updateQuery"
      placeholder="검색할 도시 입력"
    />

    <p>
      검색 중인 도시:
      <strong>{{ props.searchQuery || '입력된 도시 없음' }}</strong>
    </p>
  </section>
</template>
