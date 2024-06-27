import { createStore } from 'vuex'
import axios from 'axios'
import { apiUrl } from '@/config'

export default createStore({
  state: {
    categories: [],
    photos: [],
    photosRequest: {
      pending: false,
      error: false,
      success: false
    },
    allPhotosLoaded: false
  },
  getters: {
    getCategories: state => state.categories,
    categoriesAmount (state) {
      return state.categories.length
    }
  },
  mutations: {
    ADD_VOTE (state, photoId) {
      const photo = state.photos.find(p => p.id === photoId)
      if (photo) {
        photo.votes += 1
      }
    },
    UPDATE_PHOTOS (state, photos) {
      state.photos = photos
    },
    ADD_PHOTOS (state, photos) {
      state.photos = state.photos.concat(photos)
    },
    UPDATE_CATEGORIES (state, categories) {
      state.categories = categories
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
    },
    START_PHOTOS_REQUEST (state) {
      state.photosRequest = {
        pending: true,
        error: false,
        success: false
      }
    },
    END_PHOTOS_REQUEST (state) {
      state.photosRequest = {
        pending: false,
        error: false,
        success: true
      }
    },
    ERROR_PHOTOS_REQUEST (state) {
      state.photosRequest = {
        pending: false,
        error: true,
        success: false
      }
    },
    TOGGLE_ALL_PHOTOS_LOADED (state) {
      state.allPhotosLoaded = !state.allPhotosLoaded
    }
  },
  actions: {
    async addVote ({ commit }, photoId) {
      try {
        commit('START_PHOTOS_REQUEST')
        await axios.put(`${apiUrl}/photos/vote/${photoId}`)
        commit('ADD_VOTE', photoId)
        commit('END_PHOTOS_REQUEST')
      } catch (err) {
        commit('ERROR_PHOTOS_REQUEST')
      }
    },
    async fetchPhotosFromAPI ({ commit, state }, { url, page }) {
      try {
        // if it's first set of photos and allPhotosLoaded is true => make it default false
        if (state.allPhotosLoaded && page === 1) commit('TOGGLE_ALL_PHOTOS_LOADED')

        // it's not the first page and allPhotosLoaded is true? => stop function
        if (state.allPhotosLoaded) return false

        commit('START_PHOTOS_REQUEST')
        const res = await axios.get(url)
        await new Promise((resolve) => { setTimeout(resolve, 2000) })
        commit('END_PHOTOS_REQUEST')

        // if the set is not full, toggle allPhotosLoaded
        if (res.data.length < 12) commit('TOGGLE_ALL_PHOTOS_LOADED')

        if (page > 1) commit('ADD_PHOTOS', res.data)
        else commit('UPDATE_PHOTOS', res.data)
      } catch (err) {
        commit('ERROR_PHOTOS_REQUEST')
      }
    },
    async fetchPhotos ({ dispatch }, page) {
      dispatch('fetchPhotosFromAPI', { url: `${apiUrl}/photos/${page}`, page })
    },
    async fetchCategoryPhotos ({ dispatch }, { category, page }) {
      dispatch('fetchPhotosFromAPI', { url: `${apiUrl}/photos/${category}/${page}`, page })
    },
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
})
