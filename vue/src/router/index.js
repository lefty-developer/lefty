import { createRouter, createWebHistory } from 'vue-router'


// Routes created dynamically on App.vue created() method
const routes = []

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
