<template>
  <div>
    <div v-if="photos.length === 0">
      <alert>Nie znaleziono zdjęć.</alert>
    </div>
    <div v-else>
      <photos-summary
        v-for="photo in photos"
        :key="photo.id"
        :photo="photo"
      />
    </div>
  </div>
</template>

<script>
import PhotosSummary from '@/components/layout/PhotosSummary.vue'

export default {
  name: 'PhotosList',
  components: {
    PhotosSummary
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
/* Optional: additional styles for the list */
</style>
