import axios from 'axios'
import { apiUrl } from '@/config'

export default {
  namespaced: true,
  state: {
    photos: [],
    photosRequest: {
      pending: false,
      error: false,
      success: false
    },
    allLoaded: false
  },
  getters: {
    getPhotos: state => state.photos
  },
  mutations: {
    ADD_VOTE (state, photoId) {
      const photo = state.photos.find(p => p._id === photoId)
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
    START_REQUEST (state) {
      state.photosRequest = {
        pending: true,
        error: false,
        success: false
      }
    },
    END_REQUEST (state) {
      state.photosRequest = {
        pending: false,
        error: false,
        success: true
      }
    },
    ERROR_REQUEST (state) {
      state.photosRequest = {
        pending: false,
        error: true,
        success: false
      }
    },
    TOGGLE_ALL_LOADED (state) {
      state.allLoaded = !state.allLoaded
    }
  },
  actions: {
    async addVote ({ commit }, photoId) {
      if (!photoId) {
        console.error('Attempted to add vote for undefined photoId')
        return
      }
      try {
        await axios.put(`${apiUrl}/photos/vote/${photoId}`)
        commit('ADD_VOTE', photoId)
      } catch (err) {
        console.error('Error adding vote:', err)
      }
    },
    async fetchFromAPI ({ commit, state }, { url, page }) {
      try {
        if (state.allLoaded && page === 1) commit('TOGGLE_ALL_LOADED')
        if (state.allLoaded) return false

        commit('START_REQUEST')
        const res = await axios.get(url)
        await new Promise((resolve) => { setTimeout(resolve, 2000) })
        commit('END_REQUEST')

        if (res.data.length < 12) commit('TOGGLE_ALL_LOADED')

        if (page > 1) commit('ADD_PHOTOS', res.data)
        else commit('UPDATE_PHOTOS', res.data)
      } catch (err) {
        commit('ERROR_REQUEST')
      }
    },
    async fetchPhotos ({ dispatch }, page) {
      dispatch('fetchFromAPI', { url: `${apiUrl}/photos/${page}`, page })
    },
    async fetchCategoryPhotos ({ dispatch }, { category, page }) {
      dispatch('fetchFromAPI', { url: `${apiUrl}/photos/${category}/${page}`, page })
    }
  }
}
