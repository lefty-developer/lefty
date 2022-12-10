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
      show: false,
      menuToggled: false,
    }
  },
  methods: {
    toggleMenu (value) {
      this.menuToggled = value
    } 
  },
  mounted () {
    document.title = 'Work — Lefty.dev'
  }
}
</script>

<template>
  <div id='router-root'>
    <NavMenu v-bind:toggle='menuToggled'
             v-on:close='value => { toggleMenu(value) }' />
    <MenuButton v-on:toggle='value => { toggleMenu(value) }'
            v-bind:toggleStatus='menuToggled'
            v-bind:parent='$options.name'
            class='animate__animated animate__fadeInDown' />
  </div>
</template>