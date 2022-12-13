import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import '../public/css/style.css'


// Create app
const app = createApp(App)

// Get WordPress data from WP REST API
async function fetchWordPressData() {
  // Fetch generic site data
  let response = await fetch('http://leftyvuewp.local/wp-json')
  if (!response.ok) {
    const message = 'An error has occured: ' + response.status()
    throw new Error(message)
  }
  const wpData = await response.json()
  // Apply global site name property with WordPress site name
  app.config.globalProperties.$wpSiteName = wpData.name

  // Fetch all Pages post type data
  response = await fetch('http://leftyvuewp.local/wp-json/wp/v2/pages')
  if (!response.ok) {
    const message = 'An error has occured: ' + response.status()
    throw new Error(message)
  }
  const wpPages = await response.json()
  // Apply global pages property with WordPress pages post type data
  app.config.globalProperties.$wpPages = wpPages.reverse()

  // Use app router
  app.use(router)

  // Mount app
  app.mount('#app')
}

fetchWordPressData().catch(error => {
  console.log(error) // 'An error has occurred: 404'
  alert('Couldn\'t fetch the REST API, please check your connection and try again.') 
})
