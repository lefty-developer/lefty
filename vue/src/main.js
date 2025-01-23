import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import NotFound from './components/NotFound.vue'
import { routes } from './routes.js'

// Create app
const app = createApp(App)

// Create catch-all route for 404 errors
router.addRoute({
  path: '/:catchAll(.*)*',
  component: NotFound,
  name: 'NotFound'
})

// Load Routes and Global Properties from Routes Module
async function loadRoutesModule () {
  const data = await routes()

  if (data && data.success) {
    app.config.globalProperties.$wpSitePath = data.globalProps.wpSitePath
    app.config.globalProperties.$wpSiteName = data.globalProps.wpSiteName
    app.config.globalProperties.$wpSiteTagline = data.globalProps.wpSiteTagline
    app.config.globalProperties.$frontPage = data.globalProps.frontPage
    app.config.globalProperties.$wpPages = data.globalProps.wpPages
    app.config.globalProperties.$menuOptions = data.globalProps.menuOptions

    // Build router from routes obj
    data.routes.forEach(route => {
      // Push Route Object to Router
      router.addRoute(route)
    })

    // Use built router on app, then mount app
    app.use(router).mount('#app')
  } else if (!data.success) {
    // Unbuilt router and app mount required to send to api connection error page
    app.use(router).mount('#app')
    router.push({ name: 'NotFound', params: { catchAll: 'connection-error' } })
  } else {
    // Routes module access error
  }
}

loadRoutesModule()