<script>
export default {
  name: 'DelayService',
  methods: {
    delay (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  },
  created () {
    console.log('Delay.vue accessed')
  }
}
</script>