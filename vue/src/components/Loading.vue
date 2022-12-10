<script>
export default {
  name: 'LoadingAnimation',
  props: {
    wpData: Object
  },
  data () {
    return {
      logo: require('../assets/logo@4x.png'),
      show: true,
      inAnimation: String,
      // Outbound Animation gets set after mounted() calls showParent method
      outAnimation: String,
      // Repeated Animation gets set on component mount
      repeatAnimation: String
    }
  },
  methods: {
    showParent () {
      setTimeout(() => {
        this.repeatAnimation = false
        this.outAnimation = 'animate__fadeOutDown'
      }, 2000)
      setTimeout(() => {
        this.show = false
        // tells parent component that the loading is done, and it's ready to show the parent content
        this.$emit('ready', this.show)
      }, 2750)
    }
  },
  mounted () {
    this.inAnimation = 'animate__zoomInDown'
    setTimeout(() => {
      this.inAnimation = false
      this.repeatAnimation = 'animate__bounce animate__infinite'
      this.showParent()
    }, 1500)
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
