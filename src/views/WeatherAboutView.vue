<!-- 서비스 소개용 정적 페이지 -->
<template>
  <main class="weather-about">
    <h1>날씨 대시보드 소개</h1>

    <section class="about-card">
      <h2>서비스 소개</h2>
      <p>본 앱은 Vue 3 및 Vue Router 4를 기반으로 제작된 실습용 기상 관측 대시보드 시스템입니다.</p>

      <ul>
        <li><code>components/exercise/</code> 폴더 내부의 독립 부품 연동</li>
        <li>Client-side routing을 통한 새로고침 없는 화면 전환</li>
        <li>반응형 검색어를 활용한 실시간 도시 목록 필터링</li>
      </ul>
    </section>

    <RouterLink to="/" class="back-link">← 대시보드 홈으로 이동</RouterLink>
  </main>
</template>

<style scoped>
.weather-about {
  padding-top: 32px;
}

.weather-about > h1 {
  margin: 0 0 24px;
}

.about-card {
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.about-card h2 {
  margin-top: 0;
}

.about-card h2 + ul {
  margin-top: 0;
}

.about-card code {
  padding: 2px 5px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.9em;
  color: #e67e22;
  background-color: #fff3e0;
  border-radius: 4px;
}

.back-link {
  display: inline-block;
  margin-top: 20px;
  color: #2e7d32;
  text-decoration: none;
}
</style>
