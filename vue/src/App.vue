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
      status ? this.show = true : alert('Something\'s wrong...')

      // trigger new navigation once all routes are added in created() and app loading is finished...
      // only use if dynamic routes are added in App created() instead of main.js
      // router.replace(router.currentRoute.value.path)
    }
  }
}
</script>

<template>
  <!-- v-if number of routes is equal to number of WordPress pages (+1 to account for 404/Not Found route) -->
  <LoadingAnimation v-if='this.$router.getRoutes().filter(obj => { return (!obj.aliasOf) }).length == $wpPages.length + 1'
                    v-on:ready='status => finishedLoading(status)' />
  <router-view v-slot='{ Component }' v-if='show'>
    <transition name='fade' mode='out-in'>
      <component v-bind:is='Component' v-bind:key='$route.path'></component>
    </transition>
  </router-view>
</template>
