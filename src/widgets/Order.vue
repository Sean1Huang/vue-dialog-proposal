<script setup lang="ts">
import { ref } from 'vue';
import List from '../components/List.vue';
import AskNumberDialog from '../shared/AskNumberDialog.vue';
import { useNumberList } from './useNumberList';

const { list, add } = useNumberList()

const askNumberDialog = ref<InstanceType<typeof AskNumberDialog> | null>()

const requestAdd = async () => {
  const dialog = askNumberDialog.value
  if (!dialog) throw new Error('Dialog doesn\'t exist!')

  try {
    const number = await dialog.requestDialogResult({ fromWidget: 'ORDER' })
    add(number)
  } catch (err) {
    console.error('User has canceled the dialog', err)
  }
}
</script>

<template>
  <div class="widget">
    <h2>I'm a Order Widget</h2>
    <button type="button" @click="requestAdd">Request a Number</button>

    <List :list="list" />
    <AskNumberDialog ref="askNumberDialog" />
  </div>
</template>

<style lang="sass" scoped>
.widget
  width: 20rem
  padding: 1rem
  background-color: rgba(white, .1)
</style>
