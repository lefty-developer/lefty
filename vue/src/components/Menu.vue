<script>
import { delay } from '../services/Delay'

export default {
  name: 'NavMenu',
  props: {
    toggle: Boolean,
    parent: String
  },
  data () {
    return {
      // Assets
      closeIcon: require('../assets/icons/close.svg'),
      arrowIcon: require('../assets/icons/down-arrow.svg'),
      socials: [],

      // Misc.
      menuVisible: '',
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
      if (this.carouselCounter >= this.socials.length) {
        this.carouselCounter = 1
        this.carouselOffset = 56

        this.$refs.socialsCarousel.style.left = `${ (this.carouselOffset / 16) }rem`
      } else {
        const currentItemWidth = this.$refs.socialItem[this.carouselCounter - 1].offsetWidth

        this.carouselCounter++
        this.carouselOffset -= (currentItemWidth + 10)

        this.$refs.socialsCarousel.style.left = `${ (this.carouselOffset / 16) }rem`
      }
    },
    assignData () {
      this.$menuOptions['lefty-menu-socials'].forEach(social => {
        this.socials.push(social)
      })
    }
  },
  mounted () {
    console.log('Menu Parent: ', this.parent)
  },
  watch: {
    // Watches the toggle prop
    async toggle () {
      if (this.toggle == true) {
        this.carouselCounter = 1
        this.carouselOffset = 56
        await this.$nextTick()
        if (this.$refs.socialsCarousel) {
          this.$refs.socialsCarousel.style.transition = 'none'
          this.$refs.socialsCarousel.style.left = `${ (this.carouselOffset / 16) }rem`
        }
        this.menuVisible = 'menu-visible'
        this.outAnimation = false
        this.inAnimation = 'animate__slideInRight'
        await delay(0)
        if (this.$refs.socialsCarousel) {
          this.$refs.socialsCarousel.style.transition = 'all 300ms ease-in-out'
        }
      } else {
        this.inAnimation = false
        this.outAnimation = 'animate__slideOutRight'
      }
    }
  },
  created () {
    this.assignData()
  }
}
</script>

<template>
  <div class='menu animate__animated animate__fast'
       v-bind:class='[menuVisible, inAnimation, outAnimation]'>
    <div class='menu-header'>
      <p class='menu-header-text'>Menu</p>
      <button v-on:click='closeMenu()'
            class='menu-close-button'>
        <span class='button-text'>Close</span>
        <div class='button-item-gap'></div>
        <img v-bind:src='closeIcon'
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
        <span>Socials&nbsp;&nbsp;{{ carouselCounter }} / {{ socials.length }}</span>
        <img v-bind:src='arrowIcon'
             class='button-icon arrow-icon'>
      </div>
      <div class='menu-socials-carousel-wrap'>
        <div class='menu-socials-carousel' ref='socialsCarousel'>
          <!-- loop through socials and display them -->
          <a v-bind:href='social["lefty-menu-social-target"]'
            target='_blank'
            class='menu-socials-carousel-item'
            v-for='(social, i) in socials'
            v-bind:key='i'
            ref='socialItem'>
            <img v-if='social["lefty-menu-social-icon"]'
              class='menu-socials-carousel-item-icon'
              v-bind:src='social["lefty-menu-social-icon"]'
              v-bind:alt='`${social["lefty-menu-social-label"]} Logo`'>
            <span>{{ social['lefty-menu-social-label'] }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
