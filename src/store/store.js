import { createStore } from 'vuex'
import axios from 'axios'
import { apiUrl } from '@/config'

export default createStore({
  state: {
    categories: [],
    // Dodanie tablicy categories do stanu
    photos: []
  },
  getters: {
    // Getter do pobierania kategorii
    getCategories: state => state.categories,
    categoriesAmount (state) {
      return state.categories.length
    }
  },
  mutations: {
    // Mutacja do aktualizacji zdjęć
    UPDATE_PHOTOS (state, photos) {
      state.photos = photos
    },
    // Mutacja do aktualizacji kategorii
    UPDATE_CATEGORIES (state, categories) {
      state.categories = categories
    },
    // Mutacja do dodawania nowej kategorii
    ADD_CATEGORY (state, category) {
      state.categories.push(category)
    },
    // Mutacja do usuwania kategorii
    REMOVE_CATEGORY (state, categoryId) {
      state.categories = state.categories.filter(cat => cat.id !== categoryId)
    },
    // Mutacja do aktualizacji istniejącej kategorii
    UPDATE_CATEGORY (state, updatedCategory) {
      const index = state.categories.findIndex(cat => cat.id === updatedCategory.id)
      if (index !== -1) {
        state.categories.splice(index, 1, updatedCategory)
      }
    }
  },
  actions: {
    async fetchPhotos ({ commit }, page) {
      try {
        const res = await axios.get(`${apiUrl}/photos/${page}`)
        console.log('Otrzymane dane:', res.data) // do debugowania
        commit('UPDATE_PHOTOS', res.data)
      } catch (error) {
        console.error('Błąd podczas pobierania zdjęć:', error)
      }
    },
    async fetchCategoryPhotos ({ commit }, { category, page }) {
      const res = await axios.get(`${apiUrl}/photos/${category}/${page}`)
      commit('UPDATE_PHOTOS', res.data)
    },
    async fetchCategories ({ commit }) {
      try {
        const res = await axios.get(`${apiUrl}/categories`)
        commit('UPDATE_CATEGORIES', res.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    },
    // Akcja do aktualizacji kategorii
    updateCategories ({ commit }, categories) {
      commit('UPDATE_CATEGORIES', categories)
    },
    // Akcja do dodawania nowej kategorii
    addCategory ({ commit }, category) {
      commit('ADD_CATEGORY', category)
    },
    // Akcja do usuwania kategorii
    removeCategory ({ commit }, categoryId) {
      commit('REMOVE_CATEGORY', categoryId)
    },
    // Akcja do aktualizacji istniejącej kategorii
    updateCategory ({ commit }, updatedCategory) {
      commit('UPDATE_CATEGORY', updatedCategory)
    }
  }
})
