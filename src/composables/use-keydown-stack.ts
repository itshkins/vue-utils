import {Ref, unref, watchEffect} from 'vue-demi'

type Callback = (evt: KeyboardEvent) => void

const callbacks: Callback[] = []

const onKeydown = (evt: KeyboardEvent) => {
  const activeCallback = callbacks[callbacks.length - 1]
  activeCallback(evt)
}

export const useKeydownStack = (
  active: true | Ref<boolean> = true,
  target: EventTarget = document,
  callback: Callback,
) => {
  watchEffect((onCleanup) => {
    if (!unref(active)) {
      return
    }
    callbacks.push(callback)
    if (callbacks.length === 1) {
      target.addEventListener(`keydown`, onKeydown as EventListenerOrEventListenerObject)
    }
    onCleanup(() => {
      callbacks.pop()
      if (callbacks.length === 0) {
        target.removeEventListener(`keydown`, onKeydown as EventListenerOrEventListenerObject)
      }
    })
  })
}
