<template>
  <div class="photos-list">
    <PhotoSummary
      v-for="photo in photos"
      :key="photo._id"
      :photo="photo"
      @vote="handleVote"
    />
  </div>
</template>

<script>
import PhotoSummary from '@/components/layout/PhotoSummary.vue'

export default {
  name: 'PhotosList',
  components: {
    PhotoSummary
  },
  props: {
    photos: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleVote (photoId) {
      if (photoId) {
        console.log('PhotosList received vote event for photo:', photoId)
        this.$emit('vote', photoId)
      } else {
        console.error('Received undefined photoId in PhotosList')
      }
    }
  }
}
</script>

<style scoped>
.photos-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}
</style>
