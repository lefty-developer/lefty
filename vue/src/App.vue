<script>
// import router from './router/index.js'
import 'animate.css'
import '../public/css/style.css'
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
      if (status) {
        this.show = true
      } else {
        this.$router.push({ name: 'NotFound' })
        this.show = true
      }
      
      // trigger new navigation once all routes are added in created() and app loading is finished...
      // only use if dynamic routes are added in App created() instead of main.js
      // router.replace(router.currentRoute.value.path)
    }
  }
}
</script>

<template>
  <!-- <LoadingAnimation v-on:ready='status => finishedLoading(status)' /> -->
  <!-- <router-view v-slot='{ Component }' v-if='show'> -->
  <router-view v-slot='{ Component }'>
    <transition name='fade' mode='out-in'>
      <component v-bind:is='Component' v-bind:key='$route.path'></component>
    </transition>
  </router-view>
</template>
