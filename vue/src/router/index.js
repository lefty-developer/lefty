import { createRouter, createWebHistory } from 'vue-router'


// Routes created dynamically on ../main.js
// Do NOT manually add routes here because of LoadingAnimation and router-view v-if='show' in ../App.vue
const routes = []

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
