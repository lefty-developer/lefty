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
      outAnimation: '',
      carouselCounter: 1,
      carouselOffset: 56
    }
  },
  methods: {
    closeMenu () {
      // Testing against the toggle prop ensures the menu has only been opened through the UI
      this.toggle ? this.$emit('close', true) : this.$router.push({ name: 'NotFound' })
    },
    nextSocial () {
      const currentItemWidth = this.$refs.socialItem.offsetWidth

      this.carouselCounter++
      this.carouselOffset -= (currentItemWidth + 10)

      this.$refs.socialsCarousel.style.left = `${ (this.carouselOffset / 16) }rem`

    }
  },
  mounted () {
    this.show = this.toggle
    console.log('Page: ', this.parent)
  },
  watch: {
    // Watches the toggle prop
    toggle () {
      if (this.toggle == true) {
        this.carouselCounter = 1
        this.carouselOffset = 56
        this.$nextTick(() => {
          if (this.$refs.socialsCarousel) {
            this.$refs.socialsCarousel.style.left = `${ (this.carouselOffset / 16) }rem`
          }
        })
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
      <div class='menu-socials-header' v-on:click='nextSocial()'>
        <span>Socials&nbsp;&nbsp;{{ carouselCounter }} / 4</span>
        <img v-bind:src='arrowIcon'
             class='button-icon arrow-icon'>
      </div>
      <div class='menu-socials-carousel-container'>
        <div class='menu-socials-carousel' ref='socialsCarousel'>
          <!-- loop through socials and display them -->
          <div class='menu-socials-carousel-item' ref='socialItem'>
            <img class='menu-socials-carousel-item-icon' src='../assets/icons/linkedin.png' alt='LinkedIn Logo'>
            <span>LinkedIn</span>
          </div>
          <div class='menu-socials-carousel-item'>
            <img class='menu-socials-carousel-item-icon' src='../assets/icons/github.png' alt='GitHub Logo'>
            <span>GitHub</span>
          </div>
          <div class='menu-socials-carousel-item'>
            <img class='menu-socials-carousel-item-icon' src='../assets/icons/dribbble.png' alt='GitHub Logo'>
            <span>Dribbble</span>
          </div>
          <div class='menu-socials-carousel-item'>
            <span>Instagram</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
