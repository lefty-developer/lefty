<script>
import router from '../../router'
import { delay } from '../../services/Delay'
// import HandleScroll from '../mixins/HandleScroll.vue'
import NavMenu from '../Menu.vue'
import MenuButton from '../MenuButton.vue'

// static imports for assets, paths are available synchronously
// therefore images are available when component is created/mounted
import logoImg from '../../assets/logo.png'
import acclaimedImg from '../../assets/home/proven-choice.svg'
import starshineImg from '../../assets/home/starshine.svg'
import certifiedIconImg from '../../assets/home/handshake.png'
import contactIconImg from '../../assets/icons/contact.png'
import arrowIconImg from '../../assets/icons/down-arrow.svg'

export default {
  components: {
    NavMenu,
    MenuButton
  },
  // mixins: [HandleScroll],
  name: 'HomePage',
  data () {
    return {
      // Assets 
      logo: logoImg,
      acclaimed: acclaimedImg,
      starshine: starshineImg,
      certifiedIcon: certifiedIconImg,
      contactIcon: contactIconImg,
      arrowIcon: arrowIconImg,

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

      // For page load animations
      copyVisible: '',
      copyAnimation: '',
      marginalVisible: '',
      marginalAnimation: ''
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
      this.pageNum = this.$route.matched.find(route => route.path == this.$route.path).props.default.orderNo - 1
      this.pageCount = router.getRoutes().filter(obj => {
        return (!obj.aliasOf) && (obj.props.default.addToMenu == true)
      }).length

      // assign ACF page data
      this.title = this.page.acf['lefty-home-title']
      this.subtitle = this.page.acf['lefty-home-subtitle']
      this.sliceSubtitle()
      this.body = this.page.acf['lefty-home-body']
      this.image = `background-image: url(${ this.page.acf['lefty-home-image'] })`
    },
    sliceSubtitle () {
      this.lastWord = this.subtitle.split(' ').pop()
      this.subtitle = this.subtitle.split(' ').slice(0, -1).join(' ')
    },
    async animations () {
      await delay(100)
      this.copyVisible = 'copy-visible'
      this.copyAnimation = 'animate__fadeIn'
      await delay(100)
      this.marginalVisible = 'marginal-visible'
      this.marginalAnimation = 'animate__fadeIn'
    },
    toggleMenu (value) {
      this.menuToggled = value
    },
    nextPage() {
      const menuItems = router.getRoutes()
        .filter(route => !route.aliasOf && route.props?.default?.addToMenu)
        .sort((a, b) => a.props.default.orderNo - b.props.default.orderNo)

      const currentRouteIndex = menuItems.findIndex(item => item.props.default.wpPageId === this.pageId)
      const nextRoute = menuItems[currentRouteIndex + 1]

      if (nextRoute) {
        router.push(nextRoute.path)
      }
    }
  },
  created () {
    // assign WP page data associated with this route/component
    this.assignData()

    // assign document title
    document.title = this.$wpSiteTagline ? 
                      `${ this.$wpSiteName } – ${ this.$wpSiteTagline }`
                    : `${ this.page.title.rendered } – ${ this.$wpSiteName }`
  },
  mounted () {
    // Inits for mount animations
    this.animations()
  }
}
</script>

<template>
  <div id='router-root' v-if='$wpPages'>
  <!-- <div id='router-root' v-if='$wpPages' @wheel.passive='false' v-on:wheel='handleScroll'> -->
    <!-- v-if check for global wpPages necessary to avoid race condition between router builder and component mounting -->
    <!-- also adding a comment above the router-root element breaks the router as well...smdh -->

    <NavMenu v-bind:toggle='menuToggled'
             v-on:close='value => toggleMenu(!value)'
             v-bind:parent='$options.name' />

    <div id='home-page-wrap'>
      <section class='home-page-image-wrap'>
        <div class='home-page-image animate__animated animate__fadeIn'
             v-bind:style='image'>
        </div>
      </section>
      <section class='home-page-content'>
        <div class='home-page-navbar animate__animated animate__fadeIn'>
          <router-link to='/'>
            <img class='home-logo' 
                 v-bind:src='logo' />
          </router-link>
          <!-- <MenuButton v-on:toggle='value => toggleMenu(value)'
                      v-bind:toggleStatus='menuToggled' /> -->
          <MenuButton v-on:click='toggleMenu(true)' />
        </div>
        <div class='home-page-copy-wrap'>
          <div class='home-page-copy-margin'></div>
          <div class='home-page-copy animate__animated'
               v-bind:class='[copyVisible, copyAnimation]'>
            <h2 class='home-page-subtitle'>
              {{ subtitle }}
              <span class='home-page-subtitle-slice'>
                {{ lastWord }}
              </span>
            </h2>
            <div class='home-page-title-x-endorsement-wrap'>
              <h1 class='home-page-title' 
                        v-html='title'>
              </h1>
              <div class='home-page-endorsement animate__animated animate__fadeIn'>
                <img class='home-acclaimed'
                  v-bind:src='acclaimed' v-if='acclaimed' />
                <img class='home-starshine'
                  v-bind:src='starshine' v-if='starshine' />
                <img class='home-certified'
                  v-bind:src='certifiedIcon' v-if='certifiedIcon' />
                <div class='home-endorsement-circle'></div>
                <!-- <div class='home-endorsement-circle'></div> -->
                <!-- <div class='home-endorsement-circle'></div> -->
              </div>
            </div>
            <p class='home-page-body'>
              {{ body }}
              <span style='display: block; font-style: italic; font-weight: 700; letter-spacing: 0.00625em; margin-top: 1rem;'>
                <!-- Just scroll to move on to the next page—that's it! -->
                "Craft over chaos. Collaboration over noise."
              </span>
            </p>
          </div>
          <div class='home-page-copy-margin'></div>
        </div>
        <div class='home-page-cta-marginal animate__animated'
             v-bind:class='[marginalVisible, marginalAnimation]'>
          <button v-on:click='this.$router.push({ path: "/contact" })' class='home-page-cta'>
            <span class='button-text'>Contact</span>
            <div class='button-item-gap'></div>
            <img v-bind:src='contactIcon'
                class='button-icon arrow-icon'>
          </button>
          <!-- using ref='nextRouteButton' orginally hooked button into HandleScroll.vue's nextPage() method -->
          <button ref='nextRouteButton' v-on:click='nextPage()' class='home-page-cta button-outline'>
            <span class='button-text'>My Work</span>
            <div class='button-item-gap'></div>
            <img v-bind:src='arrowIcon'
                class='button-icon arrow-icon'>
          </button>
          <span :data-text='page.title.rendered + "&nbsp;&nbsp;" + pageNum + " / " + pageCount'
                class='home-page-cta-marginal-count' v-on:click='toggleMenu(true)'>
            {{ page.title.rendered }}&nbsp;&nbsp;{{ pageNum }} / {{ pageCount }}
          </span>
        </div>
      </section>
    </div>
  </div>
</template>
