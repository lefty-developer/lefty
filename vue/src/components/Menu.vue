<script>
export default {
  name: 'NavMenu',
  props: {
    toggle: Boolean,
    parent: String
  },
  data () {
    return {
      show: Boolean,
      icon: require('../assets/icons/close.png'),
      inAnimation: String,
      outAnimation: String
    }
  },
  methods: {
    closeMenu () {
      // Testing against the toggle prop ensures the menu has only been opened through the UI
      this.toggle ? this.$emit('close', true) : alert('Something\'s wrong...')
    }
  },
  mounted () {
    this.show = this.toggle
  },
  watch: {
    // Watches the toggle prop
    toggle () {
      if (this.toggle == true) {
        this.show = this.toggle
        this.outAnimation = false
        this.inAnimation = 'animate__slideInRight'
      } else {
        this.inAnimation = false
        this.outAnimation = 'animate__slideOutRight'
        setTimeout(() => {
          this.show = this.toggle
        }, 800)
      }
    }
  }
}
</script>

<template>
  <div v-if='show' class='menu animate__animated animate__fast'
       v-bind:class='[inAnimation, outAnimation]'>
    <div class='menu-header'>
      <button v-on:click='closeMenu()'
            class='menu-close-button'>
        <img v-bind:src='icon'
            class='button-icon close-icon' />
      </button>
    </div>
    <nav>
      <div class='menu-links'>
        <router-link v-for='(route, i) in this.$router.options.routes'
                     v-bind:key='i'
                     v-bind:to='{ path: route.path }'>
          <span class='menu-link'>
            {{ route.name }}
          </span>
        </router-link>
      </div>
    </nav>
  </div>
</template>
