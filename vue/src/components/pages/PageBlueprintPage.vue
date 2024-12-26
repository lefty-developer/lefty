<script>
import router from '../../router'
import NavMenu from '../Menu.vue'
import MenuButton from '../MenuButton.vue'

export default {
  components: {
    NavMenu,
    MenuButton
  },
  name: 'PageBlueprint',
  data () {
    return {
      // WP Page Data
      page: {},
      pageId: 0,
      pageNum: 0,
      pagesCount: 0,
      password: false,
      authenticated: true,

      // Misc.
      menuToggled: false
    }
  },
  methods: {
    assignData () {
      // assign pageId from dynamically created routes based on WP page data (located at ../../main.js)
      this.pageId = router.currentRoute.value.matched.find(route => 
                      route.path == router.currentRoute.value.path
                    ).props.default.wpPageId

      // assign page data with global WordPress page object (filter pages by id)
      this.page = this.$wpPages.find(pageItem => pageItem.id == this.pageId)
      this.pageNum = this.$route.matched.find(route => 
                       route.path == this.$route.path).props.default.orderNo
      this.pageCount = router.getRoutes().filter(obj => { 
        return (!obj.aliasOf) && (obj.props.default.addToMenu == true)
      }).length
    },
    async authenticate () {
      // test for password protection
      this.password = this.page.content.protected
      if (this.password) {
        this.authenticated = false
        const userInput = prompt('Please enter the password')
        const unlockPath = `${ this.$wpSitePath }/wp-json/wp/v2/pages/${ this.pageId }?password=${ userInput }`

        const authResponse = await fetch(unlockPath)

        if (authResponse.ok && userInput) {
          this.authenticated = true
          // assign page title
          document.title = `${ this.page.title.rendered } – ${ this.$wpSiteName }`
        } else {
          router.push({ name: 'NotFound', params: { catchAll: 'unauthorized' } })
        }
      }
    },
    // communicates between Menu and MenuButton components
    toggleMenu (value) {
      this.menuToggled = value
    } 
  },
  created () {
    this.assignData()
    this.authenticate()
  }
}
</script>

<template>
  <div id='router-root' v-if='$wpPages'>
    <NavMenu v-bind:toggle='menuToggled'
             v-on:close='value => toggleMenu(!value)' />
    <div id='blueprint-page-wrap' v-if='authenticated'>
      <MenuButton v-on:toggle='value => toggleMenu(value)'
            v-bind:toggleStatus='menuToggled'
            v-bind:parent='$options.name' />
    </div>
  </div>
</template>