<script>
// import router from '../../router'
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
      menuToggled: false
    }
  },
  methods: {
    toggleMenu (value) {
      this.menuToggled = value
    } 
  },
  created () {
    // assign page title
    document.title = `404 Not Found – ${ this.$wpSiteName }`
  }
}
</script>

<template>
  <div id='router-root'>
    <h1>404 Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <NavMenu v-bind:toggle='menuToggled'
             v-on:close='value => toggleMenu(!value)' />
    <MenuButton v-on:toggle='value => toggleMenu(value)'
            v-bind:toggleStatus='menuToggled'
            v-bind:parent='$options.name'
            class='animate__animated animate__fadeInDown' />
  </div>
</template>