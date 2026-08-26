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

### 과제 4: Weather Router

### 과제 5: Weather Store

### 과제 6: Weather Axios

### 과제 6: Weather UI Library

### 과제 6: Weather Deployment
