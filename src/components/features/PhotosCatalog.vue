<template>
  <div class="photos-catalog-container" ref="catalog">
    <photos-list :photos="photos" @vote="handleVote" />
    <div v-if="photosRequest && photosRequest.pending" class="loader-overlay">
      <ProgressSpinner />
    </div>
    <div v-if="photosRequest && photosRequest.error" class="error-alert">
      Error! Try again...
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PhotosList from '@/components/shared/PhotosList.vue'
import ProgressSpinner from 'primevue/progressspinner'

export default {
  name: 'PhotosCatalog',
  components: {
    PhotosList,
    ProgressSpinner
  },
  computed: {
    ...mapState('photos', [
      'photos',
      'photosRequest',
      'allPhotosLoaded'
    ])
  },
  methods: {
    ...mapActions('photos', ['fetchPhotos', 'fetchCategoryPhotos', 'addVote']),
    handleScroll () {
      const elem = this.$refs.catalog
      const bottomOfWindow = Math.ceil(elem.scrollTop + elem.offsetHeight) >= elem.scrollHeight

      if (bottomOfWindow && this.photosRequest && !this.photosRequest.pending && !this.allPhotosLoaded) {
        this.loadPhotos()
      }
    },
    async loadPhotos () {
      try {
        this.currentPage += 1
        if (!this.category) {
          await this.fetchPhotos(this.currentPage)
        } else {
          await this.fetchCategoryPhotos({ category: this.category, page: this.currentPage })
        }
      } catch (error) {
        console.error('Error loading photos:', error)
        // Możesz tu dodać jakąś logikę obsługi błędów, np. wyświetlenie komunikatu
      }
    },
    prepareScroll () {
      this.$refs.catalog.addEventListener('scroll', this.handleScroll)
    },
    handleVote (photoId) {
      if (photoId) {
        console.log('PhotosCatalog received vote event for photo:', photoId)
        this.addVote(photoId)
      } else {
        console.error('Received undefined photoId in PhotosCatalog')
      }
    }
  },
  watch: {
    category () {
      this.currentPage = 1
      this.loadPhotos()
    }
  },
  props: {
    category: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      currentPage: 1
    }
  },
  created () {
    if (!this.category) {
      this.fetchPhotos(this.currentPage)
    } else {
      this.fetchCategoryPhotos({ category: this.category, page: this.currentPage })
    }
  },
  mounted () {
    this.prepareScroll()
  },
  beforeUnmount () {
    this.$refs.catalog.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped>
.photos-catalog-container {
  max-height: 1200px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 15px;
  margin-bottom: 15px;
}
.loader-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}
.error-alert {
  text-align: center;
  color: red;
  margin-top: 10px;
}
</style>
