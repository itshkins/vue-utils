import {isRef, Ref} from 'vue-demi'

import {useEventListener, TypedEventListener} from '../use-event-listener/use-event-listener'

export const useEscapeListener = (
  active: true | Ref<boolean> = true,
  target: EventTarget = document,
  callback: TypedEventListener<KeyboardEvent> = () => isRef(active) && (active.value = false),
  options?: AddEventListenerOptions,
) => {
  useEventListener(active, target, `keydown`, (evt: KeyboardEvent) => {
    if (evt.key === `Escape`) {
      callback(evt)
    }
  }, options)
}
