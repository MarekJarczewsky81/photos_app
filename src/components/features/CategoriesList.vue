<template>
  <slide-fade-animation>
    <div class="categories-list">
      <div v-if="categories.length">
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
import { mapGetters } from 'vuex'
import SlideFadeAnimation from '@/components/layout/SlideFadeAnimation.vue'

export default {
  name: 'CategoriesList',
  components: {
    SlideFadeAnimation
  },
  computed: {
    ...mapGetters(['getCategories']),
    categories () {
      return this.getCategories
    }
  },
  created () {
    this.$store.dispatch('fetchCategories')
  }
  // methods: {
  //   selectCategory (category) {
  //     this.$store.commit('SET_SELECTED_CATEGORY', category)
  //   }
  // }
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
