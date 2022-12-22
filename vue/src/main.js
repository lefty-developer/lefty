import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'animate.css'
import '../public/css/style.css'


// Create app
const app = createApp(App)

// Get WordPress data from WP REST API
async function fetchWordPressData() {
  const wpSitePath = 'http://leftyvuewp.local'

  // Fetch generic site data
  let response = await fetch(wpSitePath + '/wp-json')
  const wpData = await response.json()
  // Apply global site name/tagline property with WordPress site name/tagline
  app.config.globalProperties.$wpSiteName = wpData.name
  app.config.globalProperties.$wpSiteTagline = wpData.description

  // Fetch WP Front Page data for Router '/' path
  response = await fetch(wpSitePath + '/wp-json/wp/v2/frontpage')
  const frontPage = await response.json()
  // Apply global pages property with WordPress pages post type data
  app.config.globalProperties.$frontPage = frontPage

  // Fetch all Pages (post type) data
  response = await fetch(wpSitePath + '/wp-json/wp/v2/pages')
  const wpPages = await response.json()
  // Apply global pages property with WordPress pages post type data
  app.config.globalProperties.$wpPages = wpPages.reverse()


  // Build router from WP Page data
  wpPages.map(pageItem => {
    // reformat WP Page name as component name
    // regex to remove all punctuation, enfore PascalCase
    let componentName = pageItem.title.rendered.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => { return chr.toUpperCase() })
    componentName = componentName[0].toUpperCase() + componentName.substring(1)
    // code split/lazy load component by component name name 
    const pageComponent = () => import(`./components/pages/${ componentName }Page.vue`)

    // Check ACF field add-to-menu
    // Used for route display on ./components/Menu.vue
    let addToMenu = Boolean
    if (pageItem.acf['add-to-menu']) {
      pageItem.acf['add-to-menu'].value ? addToMenu = true
                                        : addToMenu = false
    } else {
      addToMenu = false
    }

    // Build Route Object
    let pageAsRoute = Object
    // apply WP Front Page data to base route data for vue router
    if (pageItem.id == frontPage.id) {
      pageAsRoute = {
        path: '/',
        name: frontPage.title.rendered,
        component: pageComponent,
        props: {
          wpPageId: pageItem.id,
          addToMenu: addToMenu,
          orderNo: pageItem.menu_order
        }
      }
    // dynamically create routes from remaining pageItems
    } else {
      pageAsRoute = {
        path: '/' + pageItem.slug,
        name: pageItem.title.rendered,
        component: pageComponent,
        props: {
          wpPageId: pageItem.id,
          addToMenu: addToMenu,
          orderNo: pageItem.menu_order
        }
      }
    }

    // Push Route Object to Router
    router.addRoute(pageAsRoute)
  })


  // Use built router on app, then mount app
  app.use(router)
  app.mount('#app')
}

fetchWordPressData().catch(error => {
  console.log(error) // 'An error has occurred: 404'
  alert('Couldn\'t fetch the REST API, please check your connection and try again.') 
})
