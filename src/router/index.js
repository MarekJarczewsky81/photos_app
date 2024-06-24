import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/HomePage.vue'

const routes = [
  {
    path: '@/pages/HomePage.vue',
    name: 'home',
    component: HomeView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
