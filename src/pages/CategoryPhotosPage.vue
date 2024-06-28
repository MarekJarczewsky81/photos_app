<template>
  <div class="category-photos-page">
    <h1>{{ categoryTitle }}</h1>
    <photos-catalog :category="category" />
    <router-view />
  </div>
</template>

<script>
import PhotosCatalog from '@/components/features/PhotosCatalog.vue'

export default {
  name: 'CategoryPhotosPage',
  components: {
    PhotosCatalog
  },
  props: {
    category: {
      type: String,
      required: true
    }
  },
  computed: {
    categoryTitle () {
      return `Photos in category: ${this.category}`
    }
  }
}
</script>

<style scoped>
.category-photos-page {
  padding: 20px;
  position: relative;
}
</style>
