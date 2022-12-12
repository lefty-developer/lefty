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
      status ? this.show = true : alert('Something\'s wrong...')
    }
  }
}
</script>

<template>
  <LoadingAnimation v-on:ready='status => { finishedLoading(status) }' />
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
    transition: opacity 0.5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
