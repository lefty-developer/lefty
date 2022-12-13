<script>
import router from './router/index.js'
import LoadingAnimation from './components/Loading.vue'


export default {
  components: {
    LoadingAnimation
  },
  name: 'App',
  data() {
    return {
      show: false
    }
  },
  methods: {
    finishedLoading (status) {
      status ? this.show = true : alert('Something\'s wrong...')
      
      // trigger new navigation once all routes are added and app loading is finished...
      router.replace(router.currentRoute.value.path)
    }
  },
  created () {
    // Build router from WP Pages
    this.$wpPages.map(item => {
      let pageAsRoute = Object

      if (item.id == '12') {
        pageAsRoute = {
          path: '/',
          name: 'home',
          component: () => import(`./components/pages/${item.title.rendered}Page.vue`)
        }
      } else {
        pageAsRoute = {
          path: '/' + item.title.rendered.toLowerCase(),
          name: item.title.rendered,
          component: () => import(`./components/pages/${item.title.rendered}Page.vue`)
        }
      }
      
      router.addRoute(pageAsRoute)
    })
  }
}
</script>

<template>
  <!-- v-if number of routes is equal to number of WordPress pages -->
  <LoadingAnimation v-if='this.$router.getRoutes().length == $wpPages.length'
                    v-on:ready='status => { finishedLoading(status) }' />
  <router-view v-slot='{ Component }' v-if='show'>
    <transition name='fade' mode='out-in'>
      <component v-bind:is='Component' v-bind:key='$route.path'></component>
    </transition>
  </router-view>
</template>

<style lang='css'>
  @import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
  @import '../public/css/style.css';

  .fade-enter-active, .fade-leave-active {
    transition: opacity 500ms ease-in-out;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
