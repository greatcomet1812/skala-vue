<!-- 검색박스와 리스트박스의 디자인을 공통화 -->
<template>
  <section class="dashboard-card">
    <slot />
    <!-- 부모 내용 넣을 자리 -->
  </section>
</template>

<style scoped>
.dashboard-card {
  margin-bottom: 24px;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}
</style>
