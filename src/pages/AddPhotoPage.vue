<template>
  <div class="add-photo-page">
    <h2>Add photo</h2>
    <AddPhotoForm />
  </div>
</template>

<script>
import AddPhotoForm from '@/components/features/AddPhotoForm.vue'

export default {
  name: 'AddPhotoPage',
  components: {
    AddPhotoForm
  }
}
</script>

<style scoped>
.add-photo-page {
  padding: 2rem;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}
</style>
