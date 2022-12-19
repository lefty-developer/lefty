import { createRouter, createWebHistory } from 'vue-router'


// Routes created dynamically on ../main.js
// Do NOT manually add routes here because of v-if on LoadingAnimation in ../App.vue
const routes = []

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
