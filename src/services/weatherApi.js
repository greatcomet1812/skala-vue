import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

const openWeatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
})

const airQualityApi = axios.create({
  baseURL: 'https://air-quality-api.open-meteo.com/v1',
})

const getOpenWeatherParams = (lat, lon) => {
  if (!API_KEY) {
    throw new Error('OpenWeatherMap API Key가 설정되지 않았습니다.')
  }

  return {
    lat,
    lon,
    appid: API_KEY,
    units: 'metric',
    lang: 'kr',
  }
}

// OpenWeatherMap 현재 날씨 API
export const fetchCurrentWeather = async (lat, lon) => {
  const response = await openWeatherApi.get('/weather', {
    params: getOpenWeatherParams(lat, lon),
  })

  return response.data
}

// OpenWeatherMap 5일/3시간 예보 API
export const fetchWeatherForecast = async (lat, lon) => {
  const response = await openWeatherApi.get('/forecast', {
    params: {
      ...getOpenWeatherParams(lat, lon),
      cnt: 3,
    },
  })

  return response.data
}

// 외부 API(Open-Meteo)의 현재 대기질 정보
export const fetchAirQuality = async (lat, lon) => {
  const response = await airQualityApi.get('/air-quality', {
    params: {
      latitude: lat,
      longitude: lon,
      current: 'pm10,pm2_5',
      timezone: 'auto',
    },
  })

  return response.data
}
