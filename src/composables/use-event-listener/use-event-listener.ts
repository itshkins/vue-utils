import {Ref, unref, watchEffect} from 'vue-demi'

export type TypedEventListener<TEvent extends Event> = (event: TEvent) => void

export const useEventListener = <TEvent extends Event>(
  active: true | Ref<boolean> = true,
  target: EventTarget,
  eventType: string,
  callback: TypedEventListener<TEvent>,
  options?: AddEventListenerOptions,
) => {
  watchEffect((onCleanup) => {
    if (!unref(active)) {
      return
    }
    target.addEventListener(eventType, callback as EventListenerOrEventListenerObject, options)
    onCleanup(() => {
      target.removeEventListener(eventType, callback as EventListenerOrEventListenerObject, options)
    })
  })
}
