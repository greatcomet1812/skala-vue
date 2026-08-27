<!-- root component -->
<script setup>
import { RouterView, useRoute } from 'vue-router'
import UnitToggler from './components/exercise/UnitToggler.vue'

const route = useRoute()
</script>

<template>
  <div class="app-shell">
    <!-- nav bar -->
    <nav class="navigation">
      <el-menu class="nav-links" mode="horizontal" router :default-active="route.path">
        <el-menu-item index="/">날씨 대시보드</el-menu-item>
        <el-menu-item index="/about">서비스 소개</el-menu-item>
        <el-menu-item index="/stats">날씨 통계</el-menu-item>
      </el-menu>

      <UnitToggler />
    </nav>

    <div class="practice-container">
      <RouterView />
    </div>
  </div>
</template>

<style>
@import '@/assets/practice.css';

.navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 800px;
  max-width: calc(100% - 32px);
  margin: 24px auto 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.nav-links {
  flex: 1;
  min-width: 0;
  border-bottom: none;
  --el-menu-active-color: #2e7d32;
}
</style>
