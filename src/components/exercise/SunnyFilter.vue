<script setup>
const props = defineProps({
  showSunnyOnly: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update-sunny-only'])

const updateSunnyOnly = (e) => {
  emit('update-sunny-only', e.target.checked)
}
</script>

<template>
  <label class="sunny-filter">
    <input type="checkbox" :checked="props.showSunnyOnly" @change="updateSunnyOnly" />
    맑은 도시만 보기
  </label>
</template>

<style scoped>
.sunny-filter {
  display: block;
  margin-top: 12px;
  margin-bottom: 24px;
}

.sunny-filter input {
  margin-right: 6px;
}
</style>
