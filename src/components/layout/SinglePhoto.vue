<template>
  <Dialog
    header="Photo Details"
    :closable="false"
    :visible="true"
    :style="{ width: '50vw' }"
    :modal="true"
  >
    <div v-if="photosRequest.pending" class="loader-overlay">
      <ProgressSpinner />
    </div>
    <div v-else>
      <ImageItem :src="photo.src" :alt="photo.title" class="single-photo__image" />
      <h3>{{ photo.title }}</h3>
      <p>by {{ photo.author }}</p>
      <p>{{ photo.description }}</p>
      <Tag :value="photo.category" class="p-mr-2" />
      <p>Votes: {{ photo.votes }}</p>
    </div>

    <template v-slot:footer>
      <button-item
        class="p-button-rounded"
        label="Close"
        icon="pi pi-times"
        @click="closeDialog"
        autofocus
      />
    </template>
  </Dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Dialog from 'primevue/dialog'
import ButtonItem from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import ImageItem from '@/components/layout/ImageItem.vue'
import Tag from 'primevue/tag'

// fix version inconsistence
Dialog.methods.removeStylesFromMask = () => {}

export default {
  name: 'SinglePhoto',
  computed: {
    ...mapState('photos', {
      photo: state => state.singlePhoto,
      photosRequest: state => state.photosRequest
    }),
    photoId () {
      return this.$route.params.photoId
    }
  },
  watch: {
    photoId: 'fetchPhoto'
  },
  mounted () {
    this.fetchPhoto()
  },
  methods: {
    ...mapActions('photos', ['fetchSinglePhoto']),
    fetchPhoto () {
      this.fetchSinglePhoto(this.photoId)
    },
    closeDialog () {
      this.$router.push('/')
    }
  },
  components: { Dialog, ButtonItem, ProgressSpinner, ImageItem, Tag }
}
</script>

<style lang="scss" scoped>
.p-dialog-mask {
  pointer-events: auto;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.4);
}

.single-photo__image {
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
}

.loader-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
