<template>
  {{ photos }}
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PhotosCatalog',
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
