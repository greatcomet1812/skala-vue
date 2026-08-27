// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
// Element Plus
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App) // core instance function upon app initialization

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app') // mount component - physical insertion into index.html -> render
