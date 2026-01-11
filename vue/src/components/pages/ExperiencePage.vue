<script>
import router from '../../router'
// import { delay } from '../../services/Delay'
// import HandleScroll from '../mixins/HandleScroll.vue'
import NavMenu from '../Menu.vue'
import MenuButton from '../MenuButton.vue'

// static imports for assets, paths are available synchronously
// therefore images are available when component is created/mounted
import logoImg from '../../assets/logo.png'

export default {
  components: {
    NavMenu,
    MenuButton
  },
  // mixins: [HandleScroll],
  name: 'ExperiencePage',
  data () {
    return {
      // Assets
      logo: logoImg,

      // WP Page Data
      page: {},
      pageId: 0,
      pageNum: 0,
      pagesCount: 0,

      // Misc.
      menuToggled: false,

      // Slider state variables
      experienceItems: [],
      index: 0,
      prevItemIndex: 0,
      subtitle: '',
      date: '',
      title: '',
      description: '',
      currentImage: '',
      prevImage: ''
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
                       route.path == this.$route.path).props.default.orderNo - 1
      this.pageCount = router.getRoutes().filter(obj => { 
        return (!obj.aliasOf) && (obj.props.default.addToMenu == true)
      }).length

      // assign ACF page data
      this.experienceItems = this.page.acf['lefty-experience-items']
      this.prevItemIndex = this.experienceItems.length - 1

      console.log(this.experienceItems[this.index])

      this.subtitle = this.experienceItems[this.index]['lefty-experience-item-subtitle']
      this.title = this.experienceItems[this.index]['lefty-experience-item-title']
      this.description = this.experienceItems[this.index]['lefty-experience-item-description']
      this.currentImage = this.experienceItems[this.index]['lefty-experience-item-image']
      this.prevImage = this.experienceItems[this.prevItemIndex]['lefty-experience-item-image']
    },
    toggleMenu (value) {
      this.menuToggled = value
    } 
  },
  created () {
    this.assignData()

    // assign page title
    document.title = `${ this.page.title.rendered } – ${ this.$wpSiteName }`
  }
}
</script>

<template>
  <div id='router-root' v-if='$wpPages'>
  <!-- <div id='router-root' v-if='$wpPages' v-on:wheel='handleScroll'> -->
  <!-- v-if check for global wpPages necessary to avoid race condition between router builder and component mounting -->
  <!-- also adding a comment above the router-root element breaks the router as well...smdh -->

    <NavMenu v-bind:toggle='menuToggled'
             v-on:close='value => toggleMenu(!value)'
             v-bind:parent='$options.name' />

    <div id='experience-page-wrap'>

      <section id='experience-page-prev-item'>
        <div class='experience-page-prev-item-image-wrap'>
          <img class='experience-page-prev-item-image animate__animated animate__fadeIn'
               v-bind:src='this.prevImage'>
        </div>
      </section>

      <section id='experience-page-content'>
        <div class='experience-page-navbar animate__animated animate__fadeIn'>
          <router-link to='/'>
            <img class='experience-logo' 
                 v-bind:src='logo' />
          </router-link>
          <!-- <MenuButton v-on:toggle='value => toggleMenu(value)'
                      v-bind:toggleStatus='menuToggled' /> -->
          <MenuButton v-on:click='toggleMenu(true)' />
          
        </div>
        <div class='experience-page-copy-wrap'>
          <div class='experience-page-copy-margin'></div>
          <div class='experience-page-copy animate__animated'>
            <h2 class='experience-page-subtitle'>
              {{ subtitle }}
              <span class='experience-page-subtitle-slice'>
                <!-- {{ date }} -->
              </span>
            </h2>
            <h1 class='experience-page-title' 
                      v-html='title'>
            </h1>
            <p class='experience-page-body'>
              {{ description }}
              <span style='display: block; font-style: italic; font-weight: 700; letter-spacing: 0.00625em; margin-top: 1rem;'>
                <!-- Just scroll to move on to the next page—that's it! -->
                Please use the resume button to view my credentials.
              </span>
            </p>
          </div>
          <div class='experience-page-copy-margin'></div>
        </div>
      </section>

      <section id='experience-page-current-item'>
        <div class='experience-page-current-item-image-wrap'>
          <img class='experience-page-current-item-image animate__animated animate__fadeIn'
               v-bind:src='this.currentImage'>
        </div>
      </section>
      
    </div>
  </div>
</template>