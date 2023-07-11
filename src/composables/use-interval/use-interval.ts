import {Ref, unref, watchEffect} from 'vue-demi'

export const useInterval = (
  active: true | Ref<boolean>,
  callback: VoidFunction,
  timeout: number,
) => {
  watchEffect((onCleanup) => {
    if (!unref(active)) {
      return
    }
    const timer = setInterval(callback, timeout)
    onCleanup(() => {
      clearInterval(timer)
    })
  })
}
