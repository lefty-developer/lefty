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
      workItems: [],

      // Misc.
      menuToggled: false,
      index: 0,
      carouselArr: [],
      carouselLeft: 0,
      nextItemIndex: 2
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
    },
    initCarousel () {
      this.carouselArr.push(this.workItems.at(-2))
      this.carouselArr.push(this.workItems.at(-1))
      this.carouselArr.push(this.workItems.at(0))
      this.carouselArr.push(this.workItems.at(1))
      this.carouselArr.push(this.workItems.at(2))
    },
    nextItem () {
      this.index++
      this.nextItemIndex++
      this.carouselLeft += 49.5
      this.$refs.workCarousel.style.transition = 'left 300ms ease-in-out'
      this.$refs.workCarousel.style.left = `calc(50% - ${ this.carouselLeft }rem)`
      this.$refs.workItem[3].classList.remove('last-visible')
      this.$refs.workItem[4].style.transition = 'max-height 300ms ease-in-out'
      this.$refs.workItem[4].classList.add('last-visible')

      if (this.nextItemIndex < this.workItems.length) {
        console.log('load next item')
        setTimeout(() => {
          this.$refs.workItem[3].style.transition = 'none'
          this.$refs.workItem[3].classList.add('last-visible')

          this.carouselArr.shift()
          this.carouselArr.push(this.workItems[this.nextItemIndex])
          this.carouselLeft = 0
          this.$refs.workCarousel.style.transition = 'none'
          this.$refs.workCarousel.style.left = `calc(50% - ${ this.carouselLeft }rem)`
        }, 300)
      } else if (this.nextItemIndex == this.workItems.length) {
        console.log('approaching end, load first work item')
      } else if (this.nextItemIndex == this.workItems.length + 1) {
        console.log('load second work item')
      } else {
        console.log('reached first work item, reset carousel')
        // probably just empty carouselArr and rebuild with initCarousel()
      }
      
      
    }
  },
  created () {
    this.assignData()

    // assign document title
    document.title = `${ this.page.title.rendered } – ${ this.$wpSiteName }`

    // assign ACF page data
    this.workItems = this.page.acf['lefty-work-items']

    // build initial carousel array
    this.initCarousel()
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
          <button class='work-page-carousel-prev button-icon-only'>
            p
          </button>
        </section>
        <section class='work-page-copy-wrap'>
          <div class='work-page-copy'>
            <h2 class='work-page-subtitle'>
              {{ index + 1 }} / {{ workItems.length }}&nbsp;&nbsp;—&nbsp;&nbsp;{{ workItems[index]['lefty-work-item-category'] }}
            </h2>
            <h1 class='work-page-title' v-html='workItems[index]["lefty-work-item-title"]'></h1>
            <p class='work-page-body'>
              {{ workItems[index]['lefty-work-item-brief'] }}
            </p>
          </div>
          <div class='work-page-cta-wrap'>
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
          </div>
        </section>
        <section class='work-page-nav-wrap'>
          <MenuButton v-on:click='toggleMenu(true)' />
          <button class='work-page-carousel-next button-icon-only'
                  v-on:click='nextItem()'>
            n
          </button>
        </section>
      </div>
      <div class='work-page-carousel-wrap'>
        <div class='work-page-carousel' ref='workCarousel'>
          <div v-for='(item, i) in carouselArr' :key='i'
               :class='{ "last-visible": i >= 3 }'
               class='work-page-carousel-item animate__animated animate__fadeIn'
               ref='workItem'
               :style='{ "background-image": `url(${item["lefty-work-item-thumbnail"]})` }'>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>