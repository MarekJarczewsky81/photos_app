import axios from 'axios'
import { apiUrl } from '@/config'

export default {
  namespaced: true,
  state: {
    categories: []
  },
  getters: {
    categoriesAmount (state) {
      return state.categories.length
    }
  },
  mutations: {
    UPDATE_CATEGORIES (state, data) {
      state.categories = data
    },
    ADD_CATEGORY (state, category) {
      state.categories.push(category)
    },
    REMOVE_CATEGORY (state, categoryId) {
      state.categories = state.categories.filter(cat => cat.id !== categoryId)
    },
    UPDATE_CATEGORY (state, updatedCategory) {
      const index = state.categories.findIndex(cat => cat.id === updatedCategory.id)
      if (index !== -1) {
        state.categories.splice(index, 1, updatedCategory)
      }
    }
  },
  actions: {
    async fetchCategories ({ commit }) {
      try {
        const res = await axios.get(`${apiUrl}/categories`)
        commit('UPDATE_CATEGORIES', res.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    },
    updateCategories ({ commit }, categories) {
      commit('UPDATE_CATEGORIES', categories)
    },
    addCategory ({ commit }, category) {
      commit('ADD_CATEGORY', category)
    },
    removeCategory ({ commit }, categoryId) {
      commit('REMOVE_CATEGORY', categoryId)
    },
    updateCategory ({ commit }, updatedCategory) {
      commit('UPDATE_CATEGORY', updatedCategory)
    }
  }
}
