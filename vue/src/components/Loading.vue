<script>
import { delay } from '../services/Delay'
import logoImg from '../assets/logo-168.png'

export default {
  name: 'LoadingAnimation',
  props: {
    wpData: Object,
    connectionError: Boolean
  },
  data () {
    return {
      // Assets
      logo: logoImg,

      // Misc.
      show: true,
      inAnimation: '',
      outAnimation: '',
      repeatAnimation: ''
    }
  },
  methods: {
    async showParent () {
      await delay(500)
      // this.repeatAnimation = false
      this.outAnimation = 'animate__fadeOutDown'
      await delay(1000)
      this.show = false
      this.$emit('ready', !this.show)
    }
  },
  created () {
    // apply site name from global WordPress data props set on main.js
    document.title = this.$wpSiteName ? this.$wpSiteName : 'Resolving issues...'
  },
  async mounted () {
    this.inAnimation = 'animate__zoomInDown'
    await delay(1000)
    this.inAnimation = false
    // this.repeatAnimation = 'animate__bounce animate__infinite'
    this.showParent()
  }
}
</script>

<template>
  <!-- v-bind:class = dynamic classes, :class shorthand -->
  <div v-if='show' class='content-box'>
    <img v-bind:src='logo'
         class='loading-logo animate__animated'
         v-bind:class='[inAnimation, outAnimation, repeatAnimation]'>
  </div>
</template>
