<script setup>
import { useConfigStore } from '../../stores/configStore'

const configStore = useConfigStore()
</script>

<template>
  <div class="unit-toggler">
    <span>
      날씨 단위:
      <strong>
        {{ configStore.unit === 'celsius' ? '섭씨(℃)' : '화씨(℉)' }}
      </strong>
    </span>

    <button @click="configStore.toggleUnit">단위 변경</button>
  </div>
</template>

<style scoped>
.unit-toggler {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  font-size: 14px;
  white-space: nowrap;
}

.unit-toggler strong {
  color: #2e7d32;
}

.unit-toggler button {
  padding: 6px 10px;
  color: white;
  background-color: #64748b;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
}

.unit-toggler button:hover {
  background-color: #475569;
}
</style>
