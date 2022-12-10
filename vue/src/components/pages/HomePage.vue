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
      // Asset vars
      logo: require('../../assets/logo@4x.png'),
      icon: require('../../assets/icons/arrow.png'),

      // WP Page Data vars
      title: String,
      subtitle: String,
        lastWord: String,
      body: String,
      image: String,

      // Misc. vars
      menuToggled: false,
      build: 'Vue 3 & Headless WP REST API v1.0.0',
      showCopy: String,
        copyAnimation: String,
      showMarginal: String,
        renderMarginal: false,
        marginalAnimation: String
    }
  },
  methods: {
    colorizeSubtitle () {
      if (this.subtitle == false) {
        return false 
      } else {
        this.lastWord = this.subtitle.split(' ').pop()
        this.subtitle = this.subtitle.split(' ').slice(0, -1).join(' ')
      }
    },
    toggleMenu (value) {
      this.menuToggled = value
    },
    delayedAnimations () {
      // Inits for delayed animations
      setTimeout(() => {
        this.renderMarginal = true
      }, 200)

      // Delayed animations
      setTimeout(() => {
        this.showCopy = 'showCopy'
        this.copyAnimation = 'animate__fadeInRight'
      }, 400)

      setTimeout(() => {
        this.showMarginal = 'showMarginal'
        this.marginalAnimation = 'animate__fadeInUp'
      }, 800)
    }
  },
  mounted() {
    document.title = 'Welcome — Lefty.dev'

    // apply $wpData on mount (global variable from main.js)
    this.title = this.$wpPages[0].acf['lefty-home-title']
    this.subtitle = this.$wpPages[0].acf['lefty-home-subtitle']
      this.colorizeSubtitle()
    this.body = this.$wpPages[0].acf['lefty-home-body']
    this.image = 'background-image: url(' + this.$wpPages[0].acf['lefty-home-image'] + ')'

    this.delayedAnimations()
  }
}
</script>

<template>
  <div id='router-root' v-if='$wpPages'>
    <!-- Loading screen, then render required component -->
    <NavMenu v-bind:toggle='menuToggled'
             v-on:close='value => { toggleMenu(value) }'
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
             v-bind:class='[showCopy, copyAnimation]'>
          <h2 class='home-page-subtitle'>
            {{ subtitle }}
            <span style='color: #bdbdb6'>
              {{ lastWord }}
            </span>
          </h2>
          <h1 class='home-page-title' v-html='title'></h1>
          <p class='home-page-body'>{{ body }}</p>
        </div>
        <div class='home-page-cta-marginal animate__animated'
             v-if='renderMarginal'
             v-bind:class='[showMarginal, marginalAnimation]'>
          <router-link to='/work'>
            <button class='home-page-cta'>
              <img v-bind:src='icon'
                  class='button-icon arrow-icon'>
            </button>
          </router-link>
          <span class='home-page-cta-marginal-count'>
            1 / 4
          </span>
        </div>
        <div class='home-page-bottom-spacer'></div>
      </div>
    </div>
  </div>
</template>
