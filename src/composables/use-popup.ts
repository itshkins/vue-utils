import {Ref} from 'vue-demi'

import {useBodyClass} from './use-body-class'
import {useKeydownStack} from './use-keydown-stack'

export const usePopup = (
  active: true | Ref<boolean> = true,
  onClose: VoidFunction,
  bodyClass = `modal`
) => {
  const onMousedown = (evt: MouseEvent) => {
    if (evt.button !== 0) {
      return
    }
    if (evt.target === evt.currentTarget) {
      return
    }
    onClose()
  }

  const onDocumentKeydown = (evt: KeyboardEvent) => {
    if (evt.key === `Escape`) {
      evt.preventDefault()
      evt.stopPropagation()
      onClose()
    }
  }

  useBodyClass(active, bodyClass)
  useKeydownStack(active, document, onDocumentKeydown)

  return {
    onMousedown,
    onClose,
  }
}
