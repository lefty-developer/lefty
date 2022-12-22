<script>
export default {
  name: 'MenuButton',
  props: {
    toggleStatus: Boolean
  },
  data () {
    return {
      // Assets
      icon: require('../assets/icons/navicon.svg'),

      // Misc.
      menuToggled: false
    }
  },
  methods: {
    toggleMenu () {   
      this.menuToggled ? this.menuToggled = false : this.menuToggled = true
      this.$emit('toggle', this.menuToggled)
    }
  },
  watch: {
    toggleStatus () {
      this.menuToggled = this.toggleStatus
    }
  }
}
</script>

<template>
  <button v-on:click='toggleMenu()'>
    <span class='button-text'>Menu</span>
    <div class='button-item-gap'></div>
    <img v-bind:src='icon'
         class='button-icon navicon' />
  </button>
</template>