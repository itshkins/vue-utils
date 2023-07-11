import {ref, Ref} from 'vue-demi'

const INTERACTIVE_ELEMENTS = [`a`, `button`, `input`, `select`, `textarea`, `[tabindex]`]
const INTERACTIVE_SELECTOR = INTERACTIVE_ELEMENTS.join(`, `)

const last = <T>(array: T[]) => array[array.length - 1]

const queryFirstInteractiveElement = (container: Element) => {
  return container.querySelector(INTERACTIVE_SELECTOR) as HTMLElement
}

const queryLastInteractiveElement = (container: Element) => {
  return last(Array.from(container.querySelectorAll(INTERACTIVE_SELECTOR))) as HTMLElement
}

const focusElement = (element: HTMLElement) => {
  if (element) {
    element.focus()
  }
  return element
}

const focusControlButton = (controls: Element, childIndex: number) => {
  controls.children[childIndex].querySelector(`button`)!.focus()
}

export const useTabs = (
  slidesCount: number,
  activeSlideIndex: Ref<number>,
) => {
  const controlsRef = ref<Element>()
  const itemsRef = ref<Element>()

  const onControlButtonFocus = (evt: FocusEvent) => {
    (evt.currentTarget as HTMLElement).click()
  }

  const onControlButtonKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === `Tab`) {
      if (evt.shiftKey) {
        return
      }
      const element = queryFirstInteractiveElement(itemsRef.value!.children[activeSlideIndex.value])
      if (focusElement(element)) {
        evt.preventDefault()
      }
    }
  }

  const onItemKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === `Tab`) {
      if (evt.shiftKey) {
        if (activeSlideIndex.value === 0) {
          return
        }
        const firstInteractiveElement = queryLastInteractiveElement(itemsRef.value!.children[activeSlideIndex.value])
        if (!firstInteractiveElement || !firstInteractiveElement.contains(evt.target as Element)) {
          return
        }
        evt.preventDefault()
        focusControlButton(controlsRef.value!, activeSlideIndex.value)
        return
      }

      if (activeSlideIndex.value === slidesCount - 1) {
        return
      }
      const lastInteractiveElement = queryLastInteractiveElement(itemsRef.value!.children[activeSlideIndex.value])
      if (!lastInteractiveElement || !lastInteractiveElement.contains(evt.target as Element)) {
        return
      }
      evt.preventDefault()
      focusControlButton(controlsRef.value!, activeSlideIndex.value + 1)
    }
  }

  return [
    activeSlideIndex,
    controlsRef,
    itemsRef,
    onControlButtonFocus,
    onControlButtonKeyDown,
    onItemKeyDown,
  ]
}
