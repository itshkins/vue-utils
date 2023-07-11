import {Ref, unref, watchEffect} from 'vue-demi'

export const useBodyClass = (
  active: true | Ref<boolean> = true,
  className: string,
) => {
  watchEffect((onCleanup) => {
    if (!unref(active)) {
      return
    }
    document.body.classList.add(className)
    onCleanup(() => {
      document.body.classList.remove(className)
    })
  })
}
