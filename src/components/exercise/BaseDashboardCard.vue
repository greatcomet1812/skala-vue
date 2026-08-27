<!-- 검색박스와 리스트박스의 디자인을 공통화 -->
<template>
  <el-card class="dashboard-card" shadow="never">
    <slot />
    <!-- 부모 내용 넣을 자리 -->
  </el-card>
</template>

<style scoped>
.dashboard-card {
  margin-bottom: 24px;
  border-radius: 8px;
}
</style>
