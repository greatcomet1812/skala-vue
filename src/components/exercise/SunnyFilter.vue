<script setup>
const props = defineProps({
  showSunnyOnly: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update-sunny-only'])

const updateSunnyOnly = (isSunnyOnly) => {
  emit('update-sunny-only', isSunnyOnly)
}
</script>

<template>
  <el-switch
    class="sunny-filter"
    :model-value="props.showSunnyOnly"
    @update:model-value="updateSunnyOnly"
    active-text="맑은 도시만 보기"
  />
</template>

<style scoped>
.sunny-filter {
  margin-top: 12px;
  margin-bottom: 24px;
}
</style>
