<script>
export default {
  name: 'DelayService',
  methods: {
    delay (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  },
  created () {
    // Silence is golden.
  }
}
</script>