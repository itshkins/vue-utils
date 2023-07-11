import {ref, watchEffect} from 'vue-demi'

import {useSwipe} from './use-swipe'

export const useSlider = (
  slidesCount: number,
  switchSlideInterval = 0,
) => {
  const activeSlideIndex = ref<number>(0)

  const onNextSlide = () => {
    activeSlideIndex.value = (activeSlideIndex.value + 1) % slidesCount
  }

  const onPreviousSlide = () => {
    activeSlideIndex.value = (activeSlideIndex.value - 1 + slidesCount) % slidesCount
  }

  const [onSlideTouchStart, onSlideTouchMove, onSlideTouchEnd] = useSwipe(onNextSlide, onPreviousSlide)

  if (switchSlideInterval > 0) {
    watchEffect((onCleanup) => {
      const timeoutId = setInterval(onNextSlide, switchSlideInterval)
      onCleanup(() => {
        clearInterval(timeoutId)
      })
    })
  }

  const onControlButtonClick = (evt: MouseEvent) => {
    activeSlideIndex.value = Number((evt.currentTarget as HTMLElement).dataset.index)
  }

  return [
    activeSlideIndex,
    onSlideTouchStart,
    onSlideTouchMove,
    onSlideTouchEnd,
    onControlButtonClick,
  ]
}
