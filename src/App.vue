<script setup lang="ts">
import Drug from './widgets/Drug.vue';
import Order from './widgets/Order.vue';
</script>

<template>
  <div class="app">
    <Drug />
    <Order />
  </div>
</template>

<style lang="sass" scoped>
.app
  display: flex
  gap: 1rem
</style>
