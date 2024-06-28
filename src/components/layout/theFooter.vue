<template>
  <footer class="footer p-mt-2 p-mb-2">
    2024 All rights reserved
    <div class="categories-info">We have {{ categoriesCount }} categories</div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'theFooter',
  computed: {
    ...mapGetters({
      categoriesCount: 'categories/categoriesAmount'
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

.categories-info a {
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.categories-info a:hover {
  color: #0056b3;
  text-decoration: underline;
}
</style>
