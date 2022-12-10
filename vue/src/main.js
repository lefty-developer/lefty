import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../public/css/style.css'


// Fetching Page ACF data from WP REST API
let isLoading
let pages
console.log('WP Data Loading Status: ' + true)

fetch('http://leftyvuewp.local/wp-json/wp/v2/pages?_fields=acf')
  .then((response) => response.json())
  .then((data) => {
    pages = data.reverse()

    // Mount App
    const app = createApp(App)
    app.use(router).mount('#app')

    // Apply page data to global variable
    app.config.globalProperties.$wpPages = pages

    console.log(app.config.globalProperties.$wpPages)
    isLoading = false
    console.log('WP Data Loading Status: ' + isLoading)
    console.log('WP REST API Connected')
  })
  .catch(() => {
    alert('This app was unable to access the WP REST API, please check your connection and try again.')
  })
  