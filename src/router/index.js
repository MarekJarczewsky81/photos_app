import { createRouter, createWebHistory } from 'vue-router'

// Lazy-loaded components
const HomePage = () => import('@/pages/HomePage.vue')
const CategoryPhotosPage = () => import('@/pages/CategoryPhotosPage.vue')
const AddPhotoPage = () => import('@/pages/AddPhotoPage.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/photos/:category',
    name: 'category-photos',
    component: CategoryPhotosPage,
    props: route => ({ category: route.params.category })
  },
  {
    path: '/add-photo',
    name: 'add-photo',
    component: AddPhotoPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
