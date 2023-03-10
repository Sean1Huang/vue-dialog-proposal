<script setup lang="ts">
import { ref } from 'vue';
import { useDialog } from './useDialog';

const number = ref(0)

const {
  requestDialogResult,
  request,
  shouldShow,
  resolve,
  reject,
} = useDialog<
  { fromWidget: string }, // 打開 dialog 時外面帶入參數
  number, // Resolve dialog 時應回傳的結果
  { rejectFrom: string } // Reject dialog 時應回傳的結果
>({
  onSettle: () => {
    number.value = 0
  }
})

const handleSubmit = () => {
  resolve(number.value)
}

const handleCancel = () => {
  if (!request.value) return
  reject({
    rejectFrom: request.value.payload.fromWidget
  })
}

defineExpose({ requestDialogResult })
</script>

<template>
  <Teleport to="body" v-if="shouldShow">
    <div class="dialog-overlay">
      <div class="dialog">
        <label>
          Please type a number for
          <b>{{ request?.payload.fromWidget }}</b>
        </label>
        <input type="number" v-model.number="number">
        <button type="button" @click="handleSubmit">Submit</button>
        <button type="button" @click="handleCancel">Cancel</button>
      </div>
    </div>
  </Teleport>
</template>

<style lang="sass" scoped>
.dialog-overlay
  position: fixed
  left: 0
  top: 0
  height: 100%
  width: 100%
  background-color: rgba(black, .2)
  display: flex
  justify-content: center
  align-items: center

.dialog
  display: flex
  flex-direction: column
  background-color: white
  padding: 2rem
  color: black
  gap: 1rem
  border-radius: 1rem

label, input
  font-size: 2rem
</style>
