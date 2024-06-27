<template>
  <Card class="photo-summary p-shadow-4">
    <template v-slot:header>
      <div class="photo-header">
        <ImageItem :src="photo.src" :alt="photo.title" class="photo-summary__image" />
        <div class="photo-votes">
          <span>{{ photo.votes }}</span>
          <Button icon="pi pi-star" class="p-button-rounded p-button-text p-button-sm" />
        </div>
        <div class="photo-vote-layer" @click="handleVote"></div>
      </div>
    </template>
    <template v-slot:title>
      <h3 class="photo-summary__title">{{ photo.title }}</h3>
    </template>
    <template v-slot:content>
      <p class="photo-summary__author">by {{ photo.author }}</p>
      <Tag :value="photo.category" class="p-mr-2" />
    </template>
  </Card>
</template>

<script>
import Card from 'primevue/card'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import ImageItem from '@/components/layout/ImageItem.vue'

export default {
  name: 'PhotoSummary',
  components: {
    Card,
    Button,
    Tag,
    ImageItem
  },
  props: {
    photo: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleVote () {
      console.log('Emitting vote for photo:', this.photo.id)
      this.$emit('vote', this.photo.id)
    }
  }
}
</script>

<style scoped>
.photo-summary {
  height: 100%;
  position: relative;
}

.photo-header {
  position: relative;
}

.photo-summary__image {
  height: 400px;
  object-fit: cover;
  width: 100%;
}

.photo-votes {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 5px;
  border-radius: 15px;
}

.photo-votes span {
  margin-right: 5px;
}

.photo-vote-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(155, 89, 182, 0.3);
  opacity: 0;
  cursor: pointer;
}

.photo-vote-layer:hover {
  opacity: 1;
}

.photo-summary__title {
  margin: 0;
  font-size: 1.2rem;
}

.photo-summary__author {
  font-style: italic;
  color: #666;
  margin-bottom: 0.5rem;
}
</style>
