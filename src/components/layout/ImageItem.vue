<template>
  <img
    v-if="src"
    :src="imageSrc"
    :alt="alt"
    class="image">
  <div v-else>Brak obrazu</div>
</template>

<script>
import { imagesUrl } from '@/config'

export default {
  name: 'ImageItem',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: 'Image'
    }
  },
  computed: {
    imageSrc () {
      return this.src ? `${imagesUrl}/${this.src}` : ''
    }
  }
}
</script>

<style lang="scss">
.image {
  width: 100%;
}
</style>
