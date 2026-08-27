<!-- 정의되지 않은 경로 접근 시 (Catch-all Route) -->
<template>
  <main class="not-found">
    <section class="not-found-card">
      <div class="not-found-icon">🌞 ❓</div>

      <h1>페이지를 찾을 수 없습니다.</h1>

      <p>
        요청하신 주소는 존재하지 않거나,<br />
        아직 개발되지 않았습니다.
      </p>

      <RouterLink to="/" class="home-button">날씨 메인으로 이동</RouterLink>
    </section>
  </main>
</template>

<style scoped>
.not-found {
  display: grid;
  min-height: 500px;
  place-items: center;
  padding: 40px 0;
}

.not-found-card {
  width: min(100%, 420px);
  padding: 48px 32px;
  text-align: center;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.not-found-icon {
  margin-bottom: 20px;
  font-size: 3.5rem;
}

.not-found-card h1 {
  margin: 0;
  font-size: 1.8rem;
}

.not-found-card p {
  margin: 16px 0 28px;
  color: #6b7280;
}

.home-button {
  display: inline-block;
  padding: 10px 20px;
  color: #ffffff;
  text-decoration: none;
  background-color: #1683ff;
  border-radius: 999px;
  font-weight: bold;
}
</style>
