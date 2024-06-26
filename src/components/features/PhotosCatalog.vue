<template>
  <!-- photos list -->
  <photos-list :photos="photos" />
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PhotosList from '@/components/shared/PhotosList.vue'

export default {
  name: 'PhotosCatalog',
  components: {
    PhotosList
  },
  computed: {
    ...mapState({
      photos: state => state.photos
    })
  },
  methods: {
    ...mapActions([
      'fetchPhotos',
      'fetchCategoryPhotos'
    ])
  },
  props: {
    category: {
      type: String
    }
  },
  created () {
    if (!this.category) this.fetchPhotos(1)
    else this.fetchCategoryPhotos({ category: this.category, page: 1 })
  }
}
</script>
