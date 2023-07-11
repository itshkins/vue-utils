import {shallowReactive} from 'vue-demi'

export type UseBoolean = {
  value: boolean,
  setValue: (newValue: boolean) => void
  activate: VoidFunction
  deactivate: VoidFunction
  toggle: VoidFunction
}

export const useBoolean = (defaultValue = false): UseBoolean => {
  const bool = shallowReactive({
    value: defaultValue,
    setValue(newValue: boolean) {
      bool.value = newValue
    },
    activate() {
      bool.value = true
    },
    deactivate() {
      bool.value = false
    },
    toggle() {
      bool.value = !bool.value
    },
  })
  return bool as UseBoolean
}
