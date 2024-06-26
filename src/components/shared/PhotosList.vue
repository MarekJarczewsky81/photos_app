<template>
  <div class="photos-list">
    <PhotoSummary
      v-for="photo in photos"
      :key="photo.id"
      :photo="photo"
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
