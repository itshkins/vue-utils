import {ref} from 'vue-demi'

export const useSwipe = (
  onNext: VoidFunction,
  onPrevious: VoidFunction,
) => {
  const touchRef = ref()

  const onTouchStart = (evt: TouchEvent) => {
    touchRef.value = {
      startX: evt.targetTouches[0].clientX,
      endX: evt.targetTouches[0].clientX,
    }
  }

  const onTouchMove = (evt: TouchEvent) => {
    touchRef.value.endX = evt.targetTouches[0].clientX
  }

  const onTouchEnd = () => {
    const distance = touchRef.value.endX - touchRef.value.startX

    if (distance < 0) {
      onNext()
    } else if (distance > 0) {
      onPrevious()
    }

    touchRef.value = undefined
  }

  return [
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  ]
}
