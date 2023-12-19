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
      icon: require('../../assets/icons/down-arrow.svg'),

      // WP Page Data
      pageId: Number,
      page: Object,
      pageNum: Number,
      pageCount: Number,
      title: String,
      subtitle: String,
      lastWord: String,
      body: String,
      image: String,

      // Misc. 
      menuToggled: false,
      copyVisible: String,
      copyAnimation: String,
      marginalVisible: String,
      marginalAnimation: String
    }
  },
  methods: {
    assignData () {
      // assign pageId from dynamically created routes based on WP page data (located at ../../main.js)
      this.pageId = router.currentRoute.value.matched.find(route => 
                      route.path == router.currentRoute.value.path
                    ).props.default.wpPageId

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
      this.menuToggled = value
    },
    mountAnimations () {
      setTimeout(() => {
        this.copyVisible = 'copy-visible'
        this.copyAnimation = 'animate__fadeInRight'
      }, 400)

      setTimeout(() => {
        this.marginalVisible = 'marginal-visible'
        this.marginalAnimation = 'animate__fadeInUp'
      }, 800)
    },
    nextPage () {
      const menuItems = router.getRoutes().filter(obj => { return (!obj.aliasOf) && (obj.props.default.addToMenu == true) })
                          .sort((a, b) => a.props.default.orderNo - b.props.default.orderNo)
      const currentRouteIndex = menuItems.findIndex(item => item.props.default.wpPageId == this.pageId)
      router.push(menuItems[currentRouteIndex + 1].path)
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
  <div id='router-root' v-if='$wpPages'>
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
          <MenuButton v-on:toggle='value => toggleMenu(value)'
                      v-bind:toggleStatus='menuToggled' />
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
          <p class='home-page-body'>{{ body }}</p>
        </div>
        <div class='home-page-cta-marginal animate__animated'
             v-bind:class='[marginalVisible, marginalAnimation]'>
          <button v-on:click='nextPage()' class='home-page-cta'>
            <img v-bind:src='icon'
                class='button-icon arrow-icon'>
          </button>
          <span class='home-page-cta-marginal-count'>
            Page&nbsp;&nbsp;{{ pageNum }} / {{ pageCount }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
