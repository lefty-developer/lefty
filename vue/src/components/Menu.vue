<script>
export default {
  name: 'NavMenu',
  props: {
    toggle: Boolean,
    parent: String
  },
  data () {
    return {
      // Assets
      icon: require('../assets/icons/close.svg'),

      // Misc.
      show: Boolean,
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
        setTimeout(() => this.show = this.toggle, 800)
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
        <!-- filter then sort routes by orderNo and addToMenu ACF fields then loop through and display them -->
        <router-link v-for='(route, i) in this.$router.getRoutes().filter(obj => { return obj.props.default.addToMenu == true })
                                            .sort((a, b) => a.props.default.orderNo - b.props.default.orderNo)'
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
