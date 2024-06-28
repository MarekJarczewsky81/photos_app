<template>
  <div class="input-field">

    <div
      class="input-field__loader"
      v-if="!conditionals.imageLoaded ">
        <progress-spinner />
    </div>

    <label class="image-upload">

      <!-- file input -->
      <input
        type="file"
        name="file"
        id="file"
        @change="onFileSelected">

      <!-- image preview -->
      <img
        v-if="image.path && conditionals.imageLoaded"
        class="image-upload__preview animated fadeIn"
        :src="image.path">

      <!-- chose file button -->
      <a
        v-if="conditionals.imageLoaded"
        class="image-upload__button pi pi-camera" />

    </label>

  </div>
</template>

<script>
import ProgressSpinner from 'primevue/progressspinner'

export default {
  name: 'ImageUpload',
  data: () => ({
    image: {
      path: '',
      name: '',
      file: null
    },
    conditionals: {
      imageLoaded: true
    }
  }),
  methods: {
    isChosen () {
      return !!this.image.file
    },

    onFileSelected (event) {
      this.$emit('change', event)

      if (!event.target.files[0]) return false

      this.conditionals.imageLoaded = false
      const reader = new FileReader()

      reader.onload = async (e) => {
        this.image.path = e.target.result
        this.image.file = event.target.files[0]
        this.image.name = this.image.file.name
        this.conditionals.imageLoaded = true
        this.$emit('choose', this.image.file)
      }

      reader.readAsDataURL(event.target.files[0])
    }
  },
  components: { ProgressSpinner }
}
</script>

<style lang="scss" scoped>
.image-upload {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  border: 2px dashed #ccc;
  border-radius: 4px;
  cursor: pointer;

    &__button {
      font-size: 3rem;
      color: #ccc;
    }

    &__preview {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>
