import { createStore } from 'vuex'
import Photos from './modules/Photos'
import Categories from './modules/Categories'

export default createStore({
  modules: {
    photos: Photos,
    categories: Categories
  }
})
