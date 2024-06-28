<template>
  <div>
    <SinglePhoto />
  </div>
</template>

<script>
import SinglePhoto from '@/components/layout/SinglePhoto.vue'

export default {
  name: 'SinglePhotoPage',
  components: {
    SinglePhoto
  }
}
</script>

<style scoped>
h1 {
  color: #333;
  font-size: 24px;
  font-weight: bold;
}
</style>
