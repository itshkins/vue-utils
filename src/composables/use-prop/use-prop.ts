import {computed} from 'vue-demi'

export const useProp = <Value>(
  props: Record<string, any>,
  emit: (type: string, value: Value) => void,
  name: string,
  eventType = `update:${name}`
) => {
  return computed({
    get() {
      return props[name] as Value
    },
    set(value: Value) {
      emit(eventType, value)
    }
  })
}
