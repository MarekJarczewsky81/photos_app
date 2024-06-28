import { createRouter, createWebHistory } from 'vue-router'

// Lazy-loaded components
const HomePage = () => import('@/pages/HomePage.vue')
const CategoryPhotosPage = () => import('@/pages/CategoryPhotosPage.vue')
const AddPhotoPage = () => import('@/pages/AddPhotoPage.vue')
const SinglePhotoPage = () => import('@/pages/SinglePhotoPage.vue')

const routes = [
  {
    path: '/add-photo',
    name: 'add-photo',
    component: AddPhotoPage
  },
  {
    path: '/',
    name: 'home',
    component: HomePage,
    children: [
      {
        path: ':photoId',
        name: 'single-photo-home',
        component: SinglePhotoPage,
        props: true
      }
    ]
  },
  {
    path: '/photos/:category',
    name: 'category-photos',
    component: CategoryPhotosPage,
    props: route => ({ category: route.params.category }),
    children: [
      {
        path: ':photoId',
        name: 'single-photo-category',
        component: SinglePhotoPage,
        props: true
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
