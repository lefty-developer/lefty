<script>
export default {
  props: {
    pageParent: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isActive: false,
      saleTitle: 'Holiday Sale',
      saleMessage: '20% off all services until December 31st',
      bannerClass: ''
    }
  },
  created() {
    this.isActive = true
    this.bannerClass = this.pageParent.toLowerCase().replace('page', '-banner')
  }
}
</script>

<template>
  <div v-if="isActive" :class="['sale-banner', bannerClass]">
    <strong>{{ saleTitle }}:</strong> {{ saleMessage }}
  </div>
</template>

<style scoped>
.sale-banner {
  position: absolute;
  z-index: 1000;
  width: 100%;
  padding: 0.5rem;
  background: #ff4444;
  color: white;
  text-align: center;
  font-size: 0.875rem;
}
</style>
