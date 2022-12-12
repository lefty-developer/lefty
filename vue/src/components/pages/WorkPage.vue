<script>
import NavMenu from '../Menu.vue'
import MenuButton from '../MenuButton.vue'


export default {
  components: {
    NavMenu,
    MenuButton
  },
  name: 'WorkPage',
  data () {
    return {
      // WP Page Data
      pageNum: Number,
      pagesCount: Number,

      // Misc.
      menuToggled: false
    }
  },
  methods: {
    toggleMenu (value) {
      this.menuToggled = value
    } 
  },
  created () {
    // apply page title from global WordPress data props set on main.js
    document.title = this.$wpPages.find(page => page.id == '18').title.rendered + ' — ' + this.$wpSiteName

    // apply ACF data from $wpPages on mount (global props set on main.js)
    this.pageNum = this.$wpPages.findIndex(page => page.id == '18') + 1
    this.pagesCount = this.$wpPages.length
  }
}
</script>

<template>
  <div id='router-root' v-if='$wpPages'>
    <NavMenu v-bind:toggle='menuToggled'
             v-on:close='value => { toggleMenu(!value) }' />
    <MenuButton v-on:toggle='value => { toggleMenu(value) }'
            v-bind:toggleStatus='menuToggled'
            v-bind:parent='$options.name'
            class='animate__animated animate__fadeInDown' />
  </div>
</template>