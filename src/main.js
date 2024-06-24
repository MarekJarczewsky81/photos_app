import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config'
import './styles/global.scss'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.min.css'
import 'animate.css/animate.min.css'
import '~normalize-scss/sass/normalize/import-now'
import { mount } from 'hello-vue3'

createApp(App)
use(store)
use(router)
use(PrimeVue, { ripple: true })
mount('#App')
