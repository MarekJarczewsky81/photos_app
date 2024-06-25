<template>
  <div class="home">
    <h1>Photos</h1>
    <photos-catalog />
  </div>
</template>

<script>
import PhotosCatalog from '@/components/features/PhotosCatalog.vue'

export default {
  name: 'HomePage',
  components: {
    PhotosCatalog
  }
}
</script>
