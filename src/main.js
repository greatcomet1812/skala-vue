// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App) // core instance function upon app initialization

app.use(createPinia())
app.use(router)

app.mount('#app') // mount component - physical insertion into index.html -> render
