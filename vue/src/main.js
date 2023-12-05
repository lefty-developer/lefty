import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


// Create app
const app = createApp(App)

// Get WordPress data from WP REST API
async function fetchWordPressData() {
  const wpSitePath = 'http://leftyvuewp.local'

  // Fetch WordPress site data
  try {
    // Promise.all to do multiple fetch requests 
    const [wpData, frontPage, wpPages] = await Promise.all([
      fetch(`${wpSitePath}/wp-json`).then(response => response.json()),
      fetch(`${wpSitePath}/wp-json/wp/v2/frontpage`).then(response => response.json()),
      fetch(`${wpSitePath}/wp-json/wp/v2/pages`).then(response => response.json())
    ])

    // Apply global pages property with WordPress data
    app.config.globalProperties.$wpSiteName = wpData.name
    app.config.globalProperties.$wpSiteTagline = wpData.description
    app.config.globalProperties.$frontPage = frontPage
    app.config.globalProperties.$wpPages = wpPages.reverse()

    // Build router from WP Page data
    wpPages.forEach(pageItem => {
      // reformat WP Page name as component name
      // regex to remove all punctuation, enforce PascalCase
      const componentName = pageItem.title.rendered.replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
      // code split/lazy load component by component name 
      const pageComponent = () => import(`./components/pages/${ componentName }Page.vue`)

      // Check ACF field add-to-menu
      // Used for route display on ./components/Menu.vue
      const addToMenu = pageItem.acf['add-to-menu'] ? pageItem.acf['add-to-menu'].value : false

      // Build Route Object
      const pageAsRoute = {
        path: pageItem.id == frontPage.id ? '/' : `/${pageItem.slug}`,
        alias: pageItem.id == frontPage.id ? ['/home', '/home/'] : `/${pageItem.slug}/`,
        // strict: true needed to make alias work if alias is the same as path + a trailing slash
        // this is so links from the WP dashboard to the front-end will work
        // in vue 2 it's pathToRegexpOptions: { strict: false }
        strict: true,
        name: pageItem.id == frontPage.id ? frontPage.title.rendered : pageItem.title.rendered,
        component: pageComponent,
        props: {
          wpPageId: pageItem.id,
          addToMenu,
          orderNo: pageItem.menu_order
        }
      }

      // Push Route Object to Router
      router.addRoute(pageAsRoute)
    })

    // Use built router on app, then mount app
    app.use(router)
    app.mount('#app')
  } catch (error) {
    console.error('An error involving the API has occurred: ', error)
    alert('An error occurred when attempting to access the API.')
  }
}

fetchWordPressData()
