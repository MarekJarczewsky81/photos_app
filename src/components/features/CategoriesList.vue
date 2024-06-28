<template>
  <slide-fade-animation>
    <div class="categories-list">
      <div v-if="categories && categories.length">
        <router-link
          v-for="category in categories"
          :key="category.id"
          class="p-button p-component p-button-outlined p-button-primary category-button"
          :to="{ name: 'category-photos', params: { category: category.name } }">
          {{ category.name }}
        </router-link>
      </div>
      <div v-else>
        <p>No categories available</p>
      </div>
    </div>
  </slide-fade-animation>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SlideFadeAnimation from '@/components/layout/SlideFadeAnimation.vue'

export default {
  name: 'CategoriesList',
  components: {
    SlideFadeAnimation
  },
  computed: {
    ...mapState('categories', ['categories'])
  },
  methods: {
    ...mapActions('categories', ['fetchCategories'])
  },
  created () {
    this.$store.dispatch('categories/fetchCategories')
  }
}
</script>

<style scoped>
.categories-list {
  text-align: center;
}

.category-button {
  margin: 5px;
  padding: 10px 20px;
}
</style>
