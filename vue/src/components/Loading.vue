<script>
import DelayService from './mixins/Delay.vue'

export default {
  mixins: [DelayService],
  name: 'LoadingAnimation',
  props: {
    wpData: Object,
    connectionError: Boolean
  },
  data () {
    return {
      // Misc.
      show: true,
      inAnimation: '',
      outAnimation: '',
      repeatAnimation: ''
    }
  },
  methods: {
    async showParent () {
      await this.delay(500)
      // this.repeatAnimation = false
      this.outAnimation = 'animate__fadeOutDown'
      await this.delay(1000)
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
    await this.delay(1000)
    this.inAnimation = false
    // this.repeatAnimation = 'animate__bounce animate__infinite'
    this.showParent()
  },
  computed: {
    // Lazy load logo
    logo() {
      return require('../assets/logo@4x.png')
    }
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
