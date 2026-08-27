<!-- root component -->
<script setup>
import { RouterLink, RouterView } from 'vue-router'
import UnitToggler from './components/exercise/UnitToggler.vue'
</script>

<template>
  <div class="app-shell">
    <!-- nav bar -->
    <nav class="navigation">
      <div class="nav-links">
        <RouterLink to="/">날씨 대시보드</RouterLink>
        <RouterLink to="/about">서비스 소개</RouterLink>
        <RouterLink to="/stats">날씨 통계</RouterLink>
      </div>

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
  display: flex;
  align-items: center;
  gap: 20px;
}

.navigation a {
  color: #64748b;
  text-decoration: none;
}

.navigation a.router-link-active {
  color: #2e7d32;
  font-weight: bold;
}
</style>
