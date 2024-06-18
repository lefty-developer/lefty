<script>
import router from '../../router'
import NavMenu from '../Menu.vue'
import MenuButton from '../MenuButton.vue'


export default {
  components: {
    NavMenu,
    MenuButton
  },
  name: 'HomePage',
  data () {
    return {
      // Assets 
      logo: require('../../assets/logo@4x.png'),
      contactIcon: require('../../assets/icons/contact.png'),
      arrowIcon: require('../../assets/icons/down-arrow.svg'),

      // WP Page Data
      page: {},
      pageId: 0,
      pageNum: 0,
      pageCount: 0,
      title: '',
      subtitle: '',
      lastWord: '',
      body: '',
      image: '',

      // Misc. 
      menuToggled: false,
      copyVisible: '',
      copyAnimation: '',
      marginalVisible: '',
      marginalAnimation: '',
      deltaCounter: 0
    }
  },
  methods: {
    assignData () {
      // assign pageId from dynamically-created routes
      // object destructuring
      const {path, matched} = router.currentRoute.value;
      // optional chaining (?.) and nullish coalescing (||)
      const {wpPageId} = matched.find(route => route.path === path)?.props?.default || {};
      this.pageId = wpPageId;

      // assign page data with global WordPress page object (filter pages by id)
      // filter page nums by dynamic router/wp data
      this.page = this.$wpPages.find(pageItem => pageItem.id == this.pageId)
      this.pageNum = this.$route.matched.find(route => route.path == this.$route.path).props.default.orderNo
      this.pageCount = router.getRoutes().filter(obj => {
        return (!obj.aliasOf) && (obj.props.default.addToMenu == true)
      }).length

    },
    sliceSubtitle () {
      this.lastWord = this.subtitle.split(' ').pop()
      this.subtitle = this.subtitle.split(' ').slice(0, -1).join(' ')
    },
    toggleMenu (value) {
      console.log(value)
      this.menuToggled = value
    },
    mountAnimations () {
      // setTimeout(() => {
        this.copyVisible = 'copy-visible'
        this.copyAnimation = 'animate__fadeInRight'
      // }, 400)

      // setTimeout(() => {
        this.marginalVisible = 'marginal-visible'
        this.marginalAnimation = 'animate__fadeInUp'
      // }, 800)
    },
    nextPage () {
      const menuItems = router.getRoutes()
        .filter(route => !route.aliasOf && route.props?.default?.addToMenu)
        .sort((a, b) => a.props.default.orderNo - b.props.default.orderNo)

      const currentRouteIndex = menuItems.findIndex(item => item.props.default.wpPageId === this.pageId)
      const nextRoute = menuItems[currentRouteIndex + 1]

      if (nextRoute) {
        router.push(nextRoute.path)
      }
    },
    handleScroll (event) {
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
        // Use a click event on the next page button because directly manipulating the router with a wheel event creates inescapable bugs with window.history
        this.$refs.nextRouteButton.click()
      } else if (this.deltaCounter < 0) {
        // force reset delta counter if user first tries scrolling up without scrolling down
        this.deltaCounter = 0
      }
    } 
  },
  created () {
    // assign WP page data associated with this route/component
    this.assignData()

    // assign document title
    document.title = this.$wpSiteTagline ? `${ this.$wpSiteName } – ${ this.$wpSiteTagline }`
                                         : `${ this.page.title.rendered } – ${ this.$wpSiteName }`

    // assign ACF data
    this.title = this.page.acf['lefty-home-title']
    this.subtitle = this.page.acf['lefty-home-subtitle']
    this.sliceSubtitle()
    this.body = this.page.acf['lefty-home-body']
    this.image = `background-image: url(${ this.page.acf['lefty-home-image'] })`
  },
  mounted () {
    // Inits for mount animations
    this.mountAnimations()
  }
}
</script>

<template>
  <div id='router-root' v-if='$wpPages' v-on:wheel='handleScroll'>
    <NavMenu v-bind:toggle='menuToggled'
             v-on:close='value => toggleMenu(!value)'
             v-bind:parent='$options.name' />
    <div id='home-page-wrap'>
      <div class='home-page-image-wrap'>
        <div class='home-page-image  animate__animated animate__fadeInLeft'
             v-bind:style='image'>
        </div>
      </div>
      <div class='home-page-content'>
        <div class='home-page-navbar animate__animated animate__fadeInDown'>
          <router-link to='/'>
            <img class='home-logo' 
                 v-bind:src='logo' v-if='logo' />
          </router-link>
          <!-- <MenuButton v-on:toggle='value => toggleMenu(value)'
                      v-bind:toggleStatus='menuToggled' /> -->
          <MenuButton v-on:click='toggleMenu(true)' />
        </div>
        <div class='home-page-copy animate__animated'
             v-bind:class='[copyVisible, copyAnimation]'>
          <h2 class='home-page-subtitle'>
            {{ subtitle }}
            <span class='home-page-subtitle-slice'>
              {{ lastWord }}
            </span>
          </h2>
          <h1 class='home-page-title' v-html='title'></h1>
          <p class='home-page-body'>
            {{ body }}
            <span style='display: block; font-style: italic; font-weight: 700; letter-spacing: 0.00625em; margin-top: 1rem;'>
              <!-- Try scrolling down to begin your navigation. -->
              Try scrolling down as a way to navigate ahead.
              <!-- Try scrolling as a way to operate the navigation. -->
            </span>
          </p>
        </div>
        <div class='home-page-cta-marginal animate__animated'
             v-bind:class='[marginalVisible, marginalAnimation]'>
          <button v-on:click='this.$router.push({ path: "/contact" })' class='home-page-cta'>
            <span class='button-text'>Contact</span>
            <div class='button-item-gap'></div>
            <img v-bind:src='contactIcon'
                class='button-icon arrow-icon'>
          </button>
          <button ref='nextRouteButton' v-on:click='nextPage()' class='home-page-cta button-outline'>
            <span class='button-text'>My Work</span>
            <div class='button-item-gap'></div>
            <img v-bind:src='arrowIcon'
                class='button-icon arrow-icon'>
          </button>
          <span class='home-page-cta-marginal-count' v-on:click='toggleMenu(true)'>
            {{ page.title.rendered }}&nbsp;&nbsp;{{ pageNum }} / {{ pageCount }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
