<!-- root component -->
<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-shell">
    <!-- nav bar -->
    <nav class="navigation">
      <RouterLink to="/">날씨 대시보드</RouterLink>
      <RouterLink to="/about">서비스 소개</RouterLink>
      <RouterLink to="/stats">날씨 통계</RouterLink>
    </nav>

    <div class="practice-container">
      <RouterView />
    </div>
  </div>
</template>

<style>
@import '@/assets/practice.css';

.app-shell {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #2c3e50;
  line-height: 1.6;
}
.navigation {
  display: flex;
  gap: 16px;
  width: 800px;
  max-width: 1200px;
  margin: 24px auto 0;
}

.navigation a {
  color: #2c3e50;
  text-decoration: none;
}

.navigation a.router-link-active {
  color: #42b883;
  font-weight: bold;
}
</style>
