<script>
import router from '../../router'
import { delay } from '../../services/Delay'
import HandleScroll from '../mixins/HandleScroll.vue'
import NavMenu from '../Menu.vue'
import MenuButton from '../MenuButton.vue'

export default {
  components: {
    NavMenu,
    MenuButton
  },
  mixins: [HandleScroll],
  name: 'HomePage',
  data () {
    return {
      // Assets 
      logo: null,
      acclaimed: null,
      starshine: null,
      certifiedIcon: null,
      contactIcon: null,
      arrowIcon: null,

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
    lazyLoadAssets () {
      const assets = [
        {
          name: 'logo',
          path: import('../../assets/logo.png').then(image => image.default)
        },
        {
          name: 'acclaimed',
          path: import('../../assets/home/proven-choice.svg').then(image => image.default)
        },
        {
          name: 'starshine',
          path: import('../../assets/home/starshine.svg').then(image => image.default)
        },
        {
          name: 'certifiedIcon',
          path: import('../../assets/home/handshake.png').then(image => image.default)
        },
        {
          name: 'contactIcon',
          path: import('../../assets/icons/contact.png').then(image => image.default)
        },
        {
          name: 'arrowIcon',
          path: import('../../assets/icons/down-arrow.svg').then(image => image.default)
        }
      ]
      return assets
    },
    async assignAssets () {
      this.logo = await this.lazyLoadAssets().find(asset => asset.name == 'logo').path
      this.acclaimed = await this.lazyLoadAssets().find(asset => asset.name == 'acclaimed').path
      this.starshine = await this.lazyLoadAssets().find(asset => asset.name == 'starshine').path
      this.certifiedIcon = await this.lazyLoadAssets().find(asset => asset.name == 'certifiedIcon').path
      this.contactIcon = await this.lazyLoadAssets().find(asset => asset.name == 'contactIcon').path
      this.arrowIcon = await this.lazyLoadAssets().find(asset => asset.name == 'arrowIcon').path
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
    }
  },
  created () {
    // assign WP page data associated with this route/component
    this.assignData()
    this.assignAssets()

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
  <div id='router-root' v-if='$wpPages' v-on:wheel='handleScroll'>
    <NavMenu v-bind:toggle='menuToggled'
             v-on:close='value => toggleMenu(!value)'
             v-bind:parent='$options.name' />
    <div id='home-page-wrap'>
      <section class='home-page-image-wrap'>
        <div class='home-page-image  animate__animated animate__fadeIn'
             v-bind:style='image'>
        </div>
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
      </section>
      <section class='home-page-content'>
        <div class='home-page-navbar animate__animated animate__fadeIn'>
          <router-link to='/'>
            <img class='home-logo' 
                 v-bind:src='logo' v-if='logo' />
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
            <h1 class='home-page-title' v-html='title'></h1>
            <p class='home-page-body'>
              {{ body }}
              <span style='display: block; font-style: italic; font-weight: 700; letter-spacing: 0.00625em; margin-top: 1rem;'>
                <!-- Try scrolling down to begin your navigation. -->
                Just scroll to move on to the next page—that's it!
                <!-- Try scrolling as a way to operate the navigation. -->
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
          <!-- ref='nextRouteButton' hooks button into HandleScroll.vue method -->
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
