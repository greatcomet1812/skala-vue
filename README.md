# skala-vue

Vue 3와 Vite를 활용한 실습

## 프로젝트 세팅

- Vue 3 + Vite 프로젝트 생성
- 개발 서버 실행 및 브라우저 화면 확인
- `http://localhost:5173`에서 기본 Vue 화면 확인
- HMR(저장 시 화면 자동 갱신) 동작 확인

## 실행 방법

```bash
npm install
npm run dev
```

## 과제 기록

### 과제 1: Weather Mockup

1. `v-for`와 `:key="weather.id"`를 사용하여 날씨 데이터 배열의 도시별 카드를 반복 출력했다.
2. `v-if`와 `v-else`를 사용하여 기온이 25도 이상이면 더움, 미만이면 선선함 라벨을 표시했다.
3. `:value`와 `@input`을 사용하여 한글 도시 검색어를 입력하고, 입력된 도시명을 화면에 출력했다.
4. 카드 클릭 시 선택 도시를 상태바에 표시하고, 상세보기 버튼은 `@click.stop`으로 버블링 없이 날씨 정보를 알림창에 표시했다.
5. 기존 데이터에 경주, 대전 날씨 데이터를 추가하여 새로운 날씨 카드가 자동으로 출력되도록 Mockup을 확장했다.

### 과제 2: Weather Composition

1. `searchQuery`, `selectedCityInfo`, `weatherList`를 `ref()`로 선언하여 검색어·선택 도시·날씨 목록을 반응형으로 관리했다.
2. `computed()`로 `filteredWeatherList`를 만들고, 검색어가 포함된 도시만 자동으로 필터링했다.
3. `watch()`로 선택 도시 변경을 콘솔에 기록하고, `watchEffect()`로 검색어 입력 변화를 콘솔에 기록했다.
4. 검색어가 비어 있으면 전체 목록을, 일치하면 해당 도시 목록을 출력했으며 결과가 없으면 안내 문구를 표시했다.
5. `showSunnyOnly` 상태와 `displayedWeatherList`를 추가하여 맑은 도시만 보기 기능을 구현하고, 체크 상태 변경을 `watch()`로 기록했다.

### 과제 3: Weather Component

1. `WeatherParent.vue`에 검색어, 날씨 목록, 선택 도시, 필터 상태 등 모든 반응형 데이터와 계산·이벤트 로직을 유지했다.
2. `BaseDashboardCard.vue`에 공통 카드 디자인과 `<slot>`을 구현하여 도시 검색 영역과 날씨 현황 영역을 재사용 가능한 구조로 분리했다.
3. `SearchBar.vue`는 검색어를 props로 받아 표시하고, 입력값 변경 시 `update-query` 이벤트로 부모에게 전달하도록 구현했다.
4. `WeatherCard.vue`는 도시 객체를 props로 받아 카드 한 장을 표시하고, 카드 선택과 상세보기 클릭을 각각 emit으로 부모에게 전달하도록 구현했다.
5. 공통 카드, 날씨 카드, 맑음 필터 등 각 컴포넌트의 디자인을 `<style scoped>`로 역할에 맞게 분리했다.
6. Slot 내부의 자식 컴포넌트가 부모 스코프에서 props와 emit으로 직접 통신하도록 구성했다.
7. 개인 추가 기능인 `SunnyFilter.vue`를 별도 컴포넌트로 분리하여 맑은 도시만 보기 기능을 구현했다.

### 과제 4: Weather Router

1. Vue Router에 지연 로딩 방식의 라우트를 설정하고, 정의되지 않은 주소를 처리하는 Catch-all Route를 구현했다.
2. `App.vue`에 `RouterLink` 기반 내비게이션과 화면 전환 영역인 `RouterView`를 구성했다.
3. `WeatherHomeView.vue`에서 기존 날씨 대시보드 기능을 유지하고, 상세보기 클릭 시 `router.push()`로 도시 상세 주소로 이동하도록 구현했다.
4. `WeatherDetailView.vue`에서 동적 경로의 `cityId`를 props로 전달받아, Mount 시점에 Mock Data에서 해당 도시의 날씨 정보를 출력했다.
5. `WeatherAboutView.vue`에 서비스 소개와 주요 기능을 작성하고, 메인 대시보드로 돌아가는 링크를 구현했다.
6. 추가 View인 `WeatherStatsView.vue`를 만들어 도시 수, 평균 기온, 최고·최저 기온 도시를 표시하고 `/stats` 경로로 연결했다.
7. `NotFoundView.vue`를 구현하여 존재하지 않는 주소 접근 시 안내 화면과 메인 이동 버튼을 표시했다.

### 과제 5: Weather Store

1. Pinia의 `configStore`에 온도 단위 상태, 단위 기호 Getter, 섭씨·화씨 전환 Action을 구현하고 `UnitToggler` 컴포넌트를 생성했다.
2. `UnitToggler`를 내비게이션 영역에 배치하여 모든 페이지에서 온도 단위를 변경할 수 있도록 구성했다.
3. Store의 단위 설정을 메인 날씨 카드와 상세 페이지에 적용하여 기온과 단위 기호가 반응형으로 변경되도록 구현했다.
4. 개인 Store 기능으로 날씨 상태 표시 여부 State, 안내 문구 Getter, 표시 전환 Action을 추가하고 메인 및 상세 화면에 적용했다.

### 과제 6: Weather Axios

### 과제 6: Weather UI Library

### 과제 6: Weather Deployment
