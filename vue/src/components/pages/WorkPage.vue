<script>
import router from '../../router'
import HandleScroll from '../mixins/HandleScroll.vue'
import NavMenu from '../Menu.vue'
import MenuButton from '../MenuButton.vue'

export default {
  components: {
    NavMenu,
    MenuButton
  },
  mixins: [HandleScroll],
  name: 'WorkPage',
  data () {
    return {
      // Assets
      synopsisIcon: require('../../assets/icons/read.png'),
      arrowIcon: require('../../assets/icons/down-arrow.svg'),

      // WP Page Data
      page: {},
      pageId: 0,
      pageNum: 0,
      pagesCount: 0,
      title: '',
      subtitle: '',
      body: '',

      // Misc.
      menuToggled: false
    }
  },
  methods: {
    assignData () {
      // assign pageId from dynamically created routes based on WP page data (located at ../../main.js)
      this.pageId = router.currentRoute.value.matched.find(route => 
                      route.path == router.currentRoute.value.path
                    ).props.default.wpPageId

      // assign page data with global WordPress page object (filter pages by id)
      this.page = this.$wpPages.find(pageItem => pageItem.id == this.pageId)
      this.pageNum = this.$route.matched.find(route => 
                       route.path == this.$route.path).props.default.orderNo
      this.pageCount = router.getRoutes().filter(obj => { 
        return (!obj.aliasOf) && (obj.props.default.addToMenu == true)
      }).length
    },
    toggleMenu (value) {
      this.menuToggled = value
    } 
  },
  created () {
    this.assignData()

    // assign document title
    document.title = `${ this.page.title.rendered } – ${ this.$wpSiteName }`

    // assign ACF page data
    this.title = this.page.acf['lefty-home-title']
    this.subtitle = this.page.acf['lefty-home-subtitle']
    this.body = this.page.acf['lefty-home-body']
  },
  computed: {
    // Lazy load logo
    logo() {
      return require('../../assets/logo@2x.png')
    }
  }
}
</script>

<template>
  <div id='router-root' v-if='$wpPages' v-on:wheel='handleScroll'>
    <NavMenu v-bind:toggle='menuToggled'
             v-on:close='value => toggleMenu(!value)' 
             v-bind:parent='$options.name' />
    <div id='work-page-wrap'>
      <div class='work-page-content animate__animated animate__fadeIn'>
        <section class='work-page-logo-wrap'>
          <router-link to='/'>
            <img class='work-logo' 
                 v-bind:src='logo' v-if='logo' />
          </router-link>
        </section>
        <section class='work-page-copy-wrap'>
          <button v-on:click='this.$router.push({ path: "/contact" })' class='work-page-cta'>
            <span class='button-text'>Synopsis</span>
            <div class='button-item-gap'></div>
            <img v-bind:src='synopsisIcon'
                class='button-icon arrow-icon'>
          </button>
          <button ref='nextRouteButton' v-on:click='nextPage()' class='work-page-cta button-outline'>
            <span class='button-text'>Experience</span>
            <div class='button-item-gap'></div>
            <img v-bind:src='arrowIcon'
                class='button-icon arrow-icon'>
          </button>
        </section>
        <section class='work-page-nav-wrap'>
          <MenuButton v-on:click='toggleMenu(true)' />
        </section>
      </div>
      <div class='work-page-carousel-wrap'>
        <div class='work-page-carousel'>

        </div>
      </div>
    </div>
  </div>
</template>