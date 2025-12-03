<script>
import router from '../../router'
import { delay } from '../../services/Delay'
// import HandleScroll from '../mixins/HandleScroll.vue'
import NavMenu from '../Menu.vue'
import MenuButton from '../MenuButton.vue'

// static imports for assets, paths are available synchronously
// therefore images are available when component is created/mounted
import logoImg from '../../assets/logo.png'
import examineIconImg from '../../assets/icons/arrow-top-right.svg'
import arrowIconImg from '../../assets/icons/down-arrow.svg'
import longArrowIconImg from '../../assets/icons/long-arrow.svg'
import carouselNextArrowImg from '../../assets/icons/ice-cream/down-right-arrow-2.svg'
import carouselPrevArrowImg from '../../assets/icons/ice-cream/down-left-arrow.svg'

export default {
  components: {
    NavMenu,
    MenuButton
  },
  // mixins: [HandleScroll],
  name: 'WorkPage',
  data () {
    return {
      // Assets
      logo: logoImg,
      examineIcon: examineIconImg,
      arrowIcon: arrowIconImg,
      longArrowIcon: longArrowIconImg,
      carouselNextArrow: carouselNextArrowImg,
      carouselPrevArrow: carouselPrevArrowImg,

      // WP Page Data
      page: {},
      pageId: 0,
      pageNum: 0,
      pagesCount: 0,
      workItems: [],

      // Misc.
      menuToggled: false,
      index: 0,
      negativeIndex: 0,
      carouselArr: [],
      carouselLeft: 0,
      nextItemIndex: 2,
      prevItemIndex: -2,
      buttonBuffer: false,
      copyChangeAnimation: ''
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
      this.workItems = this.page.acf['lefty-work-items']
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
    },
    initCarousel () {
      // build initial carousel array
      this.carouselArr.push(...this.workItems.slice(-2), ...this.workItems.slice(0, 3))
    },
    async nextItem () {
      // prevent button spam
      // check button buffer is false, then set to true
      if (this.buttonBuffer) return
      this.buttonBuffer = true

      // fade out copy
      this.copyChangeAnimation = 'animate__fadeOut'

      this.carouselLeft += 49.125
      this.$refs.workCarousel.style.transition = 'left 400ms ease-in-out'
      this.$refs.workCarousel.style.left = `calc(50% - ${ this.carouselLeft }rem)`
      this.$refs.workItem[3].classList.remove('last-visible')
      this.$refs.workItem[2].classList.remove('primary-item')

      if (this.index + 3 < this.workItems.length) {
        // load next item
        await delay(400)
        this.carouselArr.shift()
        this.carouselArr.push(this.workItems[this.index + 3])
        this.carouselShiftAdjust()
      } else if (this.index + 3 == this.workItems.length) {
        // approaching end, load first work item
        await delay(400)
        this.carouselArr.shift()
        this.carouselArr.push(this.workItems[0])
        this.carouselShiftAdjust()
      } else if (this.index + 3 == this.workItems.length + 1) {
        // reached last work item, load second work item
        await delay(400)
        this.carouselArr.shift()
        this.carouselArr.push(this.workItems[1])
        this.carouselShiftAdjust()
      } else {
        // organically reached first work item, reset carousel
        await delay(400)
        this.resetCarousel()
      }

      await this.$nextTick()
      this.copyChangeAnimation = 'animate__fadeIn'
    },
    async prevItem () {
      // prevent button spam
      // check button buffer is false, then set to true
      if (this.buttonBuffer) return
      this.buttonBuffer = true

      // fade out copy
      this.copyChangeAnimation = 'animate__fadeOut'

      this.carouselLeft += 49.125
      this.$refs.workCarousel.style.transition = 'left 400ms ease-in-out'
      this.$refs.workCarousel.style.left = `calc(50% + ${ this.carouselLeft }rem)`
      this.$refs.workItem[2].classList.add('last-visible')
      this.$refs.workItem[2].classList.remove('primary-item')

      if (this.index - 3 > -this.workItems.length && this.index >= 0) {
        // load previous item
        await delay(400)

        this.carouselArr.pop()
        this.carouselArr.unshift(this.workItems.at(this.index - 3))

        this.carouselPopAdjust()
      }

      await this.$nextTick()
      this.copyChangeAnimation = 'animate__fadeIn'
    },
    async carouselShiftAdjust() {
      this.index++

      this.$refs.workItem[3].style.transition = 'none'
      this.$refs.workItemImage[3].style.transition = 'none'

      this.$refs.workItem[3].classList.add('last-visible')
      this.$refs.workItem[2].classList.add('primary-item')

      this.carouselLeft = 0
      this.$refs.workCarousel.style.transition = 'none'
      this.$refs.workCarousel.style.left = `calc(50% - ${ this.carouselLeft }rem)`

      await delay(50)
      // reinstate upcoming last-visible item with mandatory transition properties
      this.$refs.workItem[3].style.transition = 'max-height 400ms ease-in-out, filter 300ms ease-in-out'
      this.$refs.workItemImage[3].style.transition = 'width 400ms ease-in-out, height 400ms ease-in-out'
      
      // prevent button spam, reset button buffer
      this.buttonBuffer = false
    },
    async carouselPopAdjust() {
      this.index--
      if (this.index < 0) {
        this.index = this.workItems.length - 1
      }

      console.log('index: ' + this.index)

      this.$refs.workItem[2].style.transition = 'none'
      this.$refs.workItemImage[2].style.transition = 'none'

      this.$refs.workItem[2].classList.remove('last-visible')

      this.carouselLeft = 0
      this.$refs.workCarousel.style.transition = 'none'
      this.$refs.workCarousel.style.left = `calc(50% + ${ this.carouselLeft }rem)`

      await delay(50)
      // reinstate upcoming last-visible item with mandatory transition properties
      this.$refs.workItem[2].style.transition = 'max-height 400ms ease-in-out, filter 300ms ease-in-out'
      this.$refs.workItemImage[2].style.transition = 'width 400ms ease-in-out, height 400ms ease-in-out'

      this.$refs.workItem[2].classList.add('primary-item')
      
      // prevent button spam, reset button buffer
      this.buttonBuffer = false
    },
    async resetCarousel() {
      this.carouselArr = []
      this.initCarousel()
      this.nextItemIndex = 2
      this.prevItemIndex = -2
      this.index = 0
      
      this.$refs.workItem[3].style.transition = 'none'
      this.$refs.workItemImage[3].style.transition = 'none'
      
      this.$refs.workItem[3].classList.add('last-visible')
      this.$refs.workItem[2].classList.add('primary-item')

      this.carouselLeft = 0
      this.$refs.workCarousel.style.transition = 'none'
      this.$refs.workCarousel.style.left = `calc(50% - ${ this.carouselLeft }rem)`
      await delay(50)
      // reinstate upcoming last-visible item with mandatory transition properties
      this.$refs.workItem[3].style.transition = 'max-height 400ms ease-in-out, filter 300ms ease-in-out'
      this.$refs.workItemImage[3].style.transition = 'width 400ms ease-in-out, height 400ms ease-in-out'
      
      // prevent button spam, reset button buffer
      this.buttonBuffer = false
    }
  },
  created () {
    this.assignData()
    this.initCarousel()

    // assign document title
    document.title = `${ this.page.title.rendered } – ${ this.$wpSiteName }`
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

    <div id='work-page-wrap'>

      <div class='work-page-content animate__animated animate__fadeIn'>
        <section class='work-page-logo-wrap'>
          <router-link to='/'>
            <img class='work-logo' 
                 v-bind:src='logo' />
          </router-link>
          <button class='work-page-carousel-prev button-icon-only'
                  v-bind:disabled='buttonBuffer'
                  v-on:click='prevItem()'>
            <img class='button-icon-only-icon'
                v-bind:src='longArrowIcon'>
          </button>
        </section>

        <section class='work-page-copy-wrap'>
          <div class='work-page-copy animate__animated animate__faster'
               v-bind:class='[
                // { "animate__fadeIn": !buttonBuffer },
                copyChangeAnimation
               ]'>
            <h2 class='work-page-subtitle'>
              {{ index + 1 }} / {{ workItems.length }}&nbsp;&nbsp;—&nbsp;&nbsp;{{ workItems[index]['lefty-work-item-category'] }}
            </h2>
            <h1 class='work-page-title' v-html='workItems[index]["lefty-work-item-title"]'></h1>
            <p class='work-page-body'>
              <b>
                <i>
                  {{ workItems[index]['lefty-work-item-caption']  }}
                  &nbsp;//&nbsp;
                </i>
              </b>
              {{ workItems[index]['lefty-work-item-brief'] }}
            </p>
          </div>
          <div class='work-page-cta-wrap'>
            <button v-on:click='this.$router.push({ path: "/contact" })' class='work-page-cta'>
              <span class='button-text'>Examine</span>
              <div class='button-item-gap'></div>
              <img v-bind:src='examineIcon'
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
                  v-on:click='nextItem()'
                  v-bind:disabled='buttonBuffer'>
            <img class='button-icon-only-icon'
                 v-bind:src='longArrowIcon'>
          </button>
        </section>
      </div>

      <div class='work-page-carousel-wrap'>
        <div class='work-page-carousel' ref='workCarousel'>
          <div v-for='(item, i) in carouselArr' :key='i'
               :class='{ "last-visible": i >= 3,
                         "primary-item": i == 2
                       }'
               class='work-page-carousel-item animate__animated animate__fadeIn'
               v-on:click='i >= 3 ? nextItem() : null;
                           i <= 2 ? prevItem() : null'
               ref='workItem'>
               <a class='work-page-carousel-item-image'
                  :style='{ "background-image": `url(${item["lefty-work-item-thumbnail"]})` }'
                  ref='workItemImage'
               ></a>
          </div>
        </div>
      </div>
      
      <div class='work-page-count-wrap animate__animated animate__fadeIn'>
        <span :data-text='page.title.rendered + "&nbsp;&nbsp;" + pageNum + " / " + pageCount'
              class='work-page-count' v-on:click='toggleMenu(true)'>
          {{ page.title.rendered }}&nbsp;&nbsp;{{ pageNum }} / {{ pageCount }}
        </span>
      </div>

    </div>
  </div>
</template>