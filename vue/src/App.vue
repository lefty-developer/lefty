<script>
import LoadingAnimation from './components/Loading.vue'


export default {
  components: {
    LoadingAnimation
  },
  name: 'App',
  data() {
    return {
      pages: Array,
      show: false,
    }
  },
  methods: {
    finishedLoading (status) {
      if (status !== false) {
        return false
      } else {
        this.show = true
      }
    }
  }
}
</script>

<template>
  <LoadingAnimation v-on:ready='status => { finishedLoading(status) }' />
  <router-view v-slot='{ Component }' v-if='show'>
    <transition name='fade' mode='out-in'>
      <component :is='Component' :key='$route.path'></component>
    </transition>
  </router-view>
</template>

<style lang='css'>
  /* @import '../public/css/style.css'; */

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
