<script>
export default {
  name: 'LoadingAnimation',
  props: {
    wpData: Object
  },
  data () {
    return {
      // Assets
      logo: require('../assets/logo@4x.png'),

      // Misc.
      show: true,
      inAnimation: '',
      outAnimation: '',
      repeatAnimation: ''
    }
  },
  methods: {
    showParent () {
      setTimeout(() => {
        // this.repeatAnimation = false
        this.outAnimation = 'animate__fadeOutDown'
      }, 400)
      setTimeout(() => {
        this.show = false
        this.$emit('ready', !this.show)
      }, 1200)
    }
  },
  created () {
    // apply site name from global WordPress data props set on main.js
    document.title = this.$wpSiteName
  },
  mounted () {
    this.inAnimation = 'animate__zoomInDown'
    setTimeout(() => {
      this.inAnimation = false
      // this.repeatAnimation = 'animate__bounce animate__infinite'
      this.showParent()
    }, 1000)
  }
}
</script>

<template>
  <!-- class = static classes, v-bind:class = dynamic classes. Can use :class shorthand -->
  <div v-if='show' class='content-box'>
    <img v-bind:src='logo'
         class='loading-logo animate__animated'
         v-bind:class='[inAnimation, outAnimation, repeatAnimation]'>
  </div>
</template>
