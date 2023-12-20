<script>
import router from '../router'
import NavMenu from './Menu.vue'
import MenuButton from './MenuButton.vue'

export default {
  components: {
    NavMenu,
    MenuButton
  },
  name: 'NotFound',
  data () {
    return {
      errorType: '',
      menuToggled: false
    }
  },
  methods: {
    toggleMenu (value) {
      this.menuToggled = value
    } 
  },
  created () {
    // assign errorType 
    const catchAll = router.currentRoute.value.params.catchAll
    this.errorType = catchAll == 'connection-error' ? 'API connection error' : false

    // assign page title
    document.title = this.errorType ? 'Connection Error' : 'Page Not Found'
    document.title += ` – ${ this.$wpSiteName }`
  }
}
</script>

<template>
  <div v-if='!errorType' id='router-root' class='not-found-wrap'>
    <h1>Page Not Found</h1>
    <p>Sorry, it seems the page you are looking for does not exist.</p>
    <NavMenu v-bind:toggle='menuToggled'
             v-on:close='value => toggleMenu(!value)' />
    <MenuButton v-on:toggle='value => toggleMenu(value)'
            v-bind:toggleStatus='menuToggled'
            v-bind:parent='$options.name' />
  </div>

  <div v-else id='router-root' class='not-found-wrap connection-error'>
    <h1>Connection Error</h1>
    <p>We encountered an issue with the server, please try again later.</p>
  </div>
</template>