<template>
  <footer class="footer p-mt-2 p-mb-2">
    2024 All rights reserved
    <div class="categories-info">We have {{ categoriesCount }} categories</div>
  </footer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'theFooter',
  computed: {
    ...mapState({
      categoriesCount: state => state.categories.length
    })
  }
}
</script>

<style scoped>
.footer {
  position: relative;
  background-color: #f8f9fa;
  padding: 10px;
  border-top: 1px solid #eaeaea;
  text-align: left;
}

.categories-info {
  right: 50px;
  bottom: 10px;
  position: absolute;
  text-align: right;
}
</style>
