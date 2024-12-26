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
      arrowIcon: require('../assets/icons/down-arrow.svg'),

      // Misc.
      show: false,
      inAnimation: '',
      outAnimation: ''
    }
  },
  methods: {
    assignData() {
      // assign socials from WP

    },
    closeMenu () {
      // Testing against the toggle prop ensures the menu has only been opened through the UI
      this.toggle ? this.$emit('close', true) : this.$router.push({ name: 'NotFound' })
    }
  },
  created () {
    // assign WP page data associated with this component
    this.assignData()
  },
  mounted () {
    this.show = this.toggle
    console.log('Page: ', this.parent)
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
      <p class='menu-header-text'>Menu</p>
      <button v-on:click='closeMenu()'
            class='menu-close-button'>
        <span class='button-text'>Exit</span>
        <div class='button-item-gap'></div>
        <img v-bind:src='icon'
            class='button-icon close-icon' />
      </button>
    </div>
    <nav>
      <div class='menu-links'>
        <!-- filter then sort routes by orderNo and addToMenu ACF fields then loop through and display them -->
        <router-link v-for='(route, i) in this.$router.getRoutes().filter(obj => { return (!obj.aliasOf) && (obj.props.default.addToMenu == true) })
                                            .sort((a, b) => a.props.default.orderNo - b.props.default.orderNo)'
                     v-bind:key='i'
                     v-bind:to='{ path: route.path }'>
          <span class='menu-link'>
            {{ route.name }}
          </span>
        </router-link>
      </div>
    </nav>
    <div class='menu-socials'>
      <div class='menu-socials-header'>
        <span>Socials&nbsp;&nbsp;1 / 4</span>
        <img v-bind:src='arrowIcon'
             class='button-icon arrow-icon'>
      </div>
      <div class='menu-socials-carousel-container'>
        <!-- carousel goes here -->
      </div>

    </div>
  </div>
</template>
