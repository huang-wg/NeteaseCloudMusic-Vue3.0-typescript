import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

//antd引入
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';


import './assets/main.css'
const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(Antd)

app.mount('#app')
