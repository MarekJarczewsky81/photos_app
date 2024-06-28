<template>
  <div id="app">
    <div class="container p-p-4">

      <app-header />

      <main>
        <div class="header-content">
          <div class="app-title">
            <main-title>PhotosApp |</main-title>
            <span class="subtitle">share your moments</span>
          </div>
          <router-link to="/add-photo">
            <button class="p-button p-component p-button-rounded p-button-primary">
              <i class="pi pi-plus"></i>
              <span class="p-button-label">Submit</span>
            </button>
          </router-link>
        </div>
        <categories-list />
        <router-view v-slot="{ Component }">
          <SlideFadeAnimation>
            <component :is="Component" :key="$route.fullPath" />
          </SlideFadeAnimation>
        </router-view>
      </main>
      <app-footer />
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/layout/theHeader.vue'
import AppFooter from '@/components/layout/theFooter.vue'
import CategoriesList from '@/components/features/CategoriesList.vue'
import MainTitle from '@/components/layout/MainTitle.vue'
import SlideFadeAnimation from '@/components/layout/SlideFadeAnimation.vue'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    CategoriesList,
    MainTitle,
    SlideFadeAnimation
  },
  methods: {
    ...mapActions([
      'fetchCategories'
    ])
  },
  created () {
    this.$store.dispatch('categories/fetchCategories') // Wywołanie akcji w metodzie cyklu życia created
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #606266;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 10px;
}

.app-title {
  display: flex;
  align-items: baseline;
}

.app-title main-title {
  margin-right: 10px;
}

.subtitle {
  font-size: 14px;
  color: #999;
  padding-left: 5px;
}
</style>
