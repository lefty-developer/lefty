<script>
import router from '../../router'

export default {
  name: 'HandleScroll',
  data() {
    return {
      deltaCounter: 0
    }
  },
  methods: {
    nextPage() {
      const menuItems = router.getRoutes()
        .filter(route => !route.aliasOf && route.props?.default?.addToMenu)
        .sort((a, b) => a.props.default.orderNo - b.props.default.orderNo)

      const currentRouteIndex = menuItems.findIndex(item => item.props.default.wpPageId === this.pageId)
      const nextRoute = menuItems[currentRouteIndex + 1]

      if (nextRoute) {
        router.push(nextRoute.path)
      }
    },

    handleScroll(event) {
      const delta = Math.sign(event.deltaY)
      if (this.deltaCounter > 0 && (this.deltaCounter + delta < this.deltaCounter)) {
        // if user scrolled down a little already but then scrolled up without activating nextPage()
        // reset delta counter
        this.deltaCounter = 0
      } else {
        this.deltaCounter += delta
      }

      console.log("Delta Counter: ", this.deltaCounter)

      if (this.deltaCounter > 2) {
        // Activate nextPage() method
        // Use a click event on the next page button because directly manipulating the router with a wheel event creates inescapable bugs with the window.history obj
        this.$refs.nextRouteButton.click()
      } else if (this.deltaCounter < 0) {
        // force reset delta counter if user first tries scrolling up without scrolling down
        this.deltaCounter = 0
      }
    }
  }
}
</script>