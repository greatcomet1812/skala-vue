<!-- root component -->
<script setup>
import { RouterLink, RouterView } from 'vue-router'
import WeatherMockup from './components/WeatherMockup.vue'
import WeatherComposition from './components/WeatherComposition.vue'
</script>

<template>
  <div class="practice-container">
    <!-- component template content rendered here -->
    <WeatherMockup />
    <!-- <WeatherComposition /> -->
  </div>
</template>

<style>
@import '@/assets/practice.css';
</style>
