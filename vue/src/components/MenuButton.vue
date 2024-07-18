<script>
export default {
  name: 'MenuButton',
  data () {
    return {
      // Assets
      icon: require('../assets/icons/navicon.svg'),
    }
  }
}
</script>

<template>
    <button class='menu-button'>
    <span class='button-text'>Menu</span>
    <div class='button-item-gap'></div>
    <img v-bind:src='icon'
         class='button-icon navicon' />
  </button>
</template>