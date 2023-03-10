import { computed, shallowRef } from "vue";

export function useDialog <
  RequestPayload extends unknown = unknown,
  ResolveValue extends unknown = unknown,
  RejectValue extends unknown = unknown,
>({
  onSettle,
}:{
  onSettle (): void;
}) {
  interface Request {
    resolve (args: unknown): void,
    reject (args: unknown): void,
    payload: RequestPayload
  }

  const request = shallowRef<Request | null>(null)

  /** 根據是否存在 `request` 來決定是否顯示 dialog */
  const shouldShow = computed(() => Boolean(request.value))

  const resolve = (args: ResolveValue) => {
    request.value?.resolve(args)
    request.value = null
    onSettle()
  }

  const reject = (args: RejectValue) => {
    request.value?.reject(args)
    request.value = null
    onSettle()
  }

  /** 由 Dialog 組件的父層呼叫 */
  const requestDialogResult = (payload: RequestPayload) => {
    if (request.value) {
      throw new Error('The current dialog hasn\'t been resolved yet!')
    }

    return new Promise<ResolveValue>((resolve, reject) => {
      request.value = {
        payload,
        resolve,
        reject,
      };
    });
  }

  return {
    requestDialogResult,
    request,
    shouldShow,
    resolve,
    reject,
  }
}
