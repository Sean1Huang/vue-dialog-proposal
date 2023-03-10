<script setup lang="ts">
defineProps<{
  list: unknown[]
}>()
</script>

<template>
  <ul v-for="(item, index) in list">
    <li :key="index">{{ item }}</li>
  </ul>
</template>

<style lang="sass" scoped>
ul
  text-align: left
</style>
