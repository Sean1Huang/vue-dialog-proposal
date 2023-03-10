import { ref } from "vue";

type Value = number | string

export function useNumberList ( ) {
  const list = ref<Value[]>([])
  const add = (value: Value) => list.value.push(value)

  return { list, add }
}
