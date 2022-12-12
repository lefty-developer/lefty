<script>
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
      icon: require('../../assets/icons/arrow.png'),

      // WP Page Data
      page: Object,
      pageNum: Number,
      pagesCount: Number,
      title: String,
      subtitle: String,
      lastWord: String,
      body: String,
      image: String,

      // Misc. 
      menuToggled: false,
      copyVisible: String,
      copyAnimation: String,
      renderMarginal: false,
      marginalVisible: String,
      marginalAnimation: String
    }
  },
  methods: {
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
    }
  },
  created () {
    // supply page data with global WordPress page object (filter by id)
    this.page = this.$wpPages.find(page => page.id == '12')
    this.pageNum = this.$wpPages.findIndex(page => page.id == '12') + 1
    this.pagesCount = this.$wpPages.length

    // apply page title
    document.title = this.page.title.rendered + ' — ' + this.$wpSiteName

    // apply ACF data
    this.title = this.page.acf['lefty-home-title']
    this.subtitle = this.page.acf['lefty-home-subtitle']
    this.sliceSubtitle()
    this.body = this.page.acf['lefty-home-body']
    this.image = 'background-image: url(' + this.page.acf['lefty-home-image'] + ')'
  },
  mounted () {
    // Inits for mount animations
    setTimeout(() => this.renderMarginal = true, 200)
    this.mountAnimations()
  }
}
</script>

<template>
  <div id='router-root' v-if='$wpPages'>
    <NavMenu v-bind:toggle='menuToggled'
             v-on:close='value => { toggleMenu(!value) }'
             v-bind:parent='$options.name' />
    <div id='home-page-wrap'>
      <div class='home-page-image-wrap'>
        <div class='home-page-image  animate__animated animate__fadeInLeft'
             v-bind:style='image'>
        </div>
      </div>
      <div class='home-page-content'>
        <div class='home-page-navbar'>
          <router-link to='/'>
            <img class='home-logo animate__animated animate__fadeInDown' 
                 v-bind:src='logo' />
          </router-link>
          <MenuButton v-on:toggle='value => { toggleMenu(value) }'
                      v-bind:toggleStatus='menuToggled'
                      class='animate__animated animate__fadeInDown' />
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
             v-if='renderMarginal'
             v-bind:class='[marginalVisible, marginalAnimation]'>
          <router-link to='/work'>
            <button class='home-page-cta'>
              <img v-bind:src='icon'
                  class='button-icon arrow-icon'>
            </button>
          </router-link>
          <span class='home-page-cta-marginal-count'>
            {{ pageNum }} / {{ pagesCount }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
