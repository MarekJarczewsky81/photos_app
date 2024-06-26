<template>
  <div class="photo-summary p-shadow-4">
    <div class="photo-summary__image">
      <image-item :src="photo.src" alt="Photo" class="photo-summary__image-item" />
      {{ photo }}
    </div>
    <div class="photo-summary__details">
      <h3 class="photo-summary__title">{{ photo.name }}</h3>
      <p class="photo-summary__author">by {{ photo.author }}</p>
      <div class="photo-summary__footer">
        <button class="p-button p-component p-button-outlined p-button-sm p-mr-2">
          <i class="pi pi-tag p-mr-1"></i> {{ photo.category }}
        </button>
        <div class="photo-summary__votes">
          <button class="p-button p-component p-button-rounded p-button-text p-button-icon-only">
            <i class="pi pi-star"></i>
          </button>
          <span class="photo-summary__vote-count">{{ photo.votes }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageItem from './ImageItem.vue'

export default {
  name: 'PhotosSummary',
  props: {
    photo: {
      type: Object,
      required: true
    }
  },
  components: {
    ImageItem
  }
}
</script>

<style scoped>
.photo-summary {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
}

.photo-summary__image {
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.photo-summary__image-item {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-summary__details {
  padding: 16px;
  text-align: center;
}

.photo-summary__title {
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0;
}

.photo-summary__author {
  font-size: 16px;
  color: #999;
  margin-bottom: 10px;
}

.photo-summary__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.photo-summary__votes {
  display: flex;
  align-items: center;
}

.photo-summary__vote-button {
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 5px;
}

.photo-summary__vote-count {
  font-size: 16px;
}
</style>
