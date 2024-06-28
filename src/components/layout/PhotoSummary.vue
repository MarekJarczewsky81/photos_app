<template>
  <Card class="photo-summary p-shadow-4">
    <template v-slot:header>
      <div class="photo-header">
        <ImageItem
          :src="photo.src"
          :alt="photo.title"
          class="photo-summary__image"
          @click.stop="handleVote"
        />
        <div class="photo-hover-layer" @click.stop="handleVote"></div>
        <div class="photo-votes">
          <span>{{ photo.votes }}</span>
          <Button
            icon="pi pi-star"
            class="p-button-rounded p-button-text p-button-sm vote-button"
            :class="{ 'voted': voted }"
            @click.stop="handleVote" />
        </div>
      </div>
    </template>
    <template v-slot:title>
      <h3 class="photo-summary__title" v-once>{{ photo.title }}</h3>
    </template>
    <template v-slot:content>
      <div @click="navigateToDetails">
        <p class="photo-summary__author">by {{ photo.author }}</p>
        <Tag
        :value="photo.category"
        class="p-mr-2" />
      </div>
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
  data () {
    return {
      voted: false
    }
  },
  methods: {
    handleVote () {
      if (this.photo && this.photo._id) {
        console.log('Emitting vote for photo:', this.photo._id)
        this.$emit('vote', this.photo._id)
        this.voted = true // optional: add visual feedback for voting
      } else {
        console.error('Photo ID is undefined')
      }
    },
    navigateToDetails () {
      const categoryPath = this.$route.params.category ? `/photos/${this.$route.params.category}` : ''
      this.$router.push(`${categoryPath}/${this.photo._id}`)
    }
  }
}
</script>

<style scoped>
.photo-summary {
  height: 100%;
  position: relative;
  transition: box-shadow 0.3s ease;
}

.photo-summary:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.photo-header {
  position: relative;
}

.photo-summary__image {
  height: 400px;
  object-fit: cover;
  width: 100%;
}

.photo-hover-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(155, 89, 182, 0.3);
  pointer-events: none; /* Ensure the hover layer does not block interactions */
  display: none;
}

.photo-header:hover .photo-hover-layer {
  display: block;
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

.vote-button {
  transition: transform 0.3s ease;
}

.vote-button.voted {
  transform: scale(1.2);
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
