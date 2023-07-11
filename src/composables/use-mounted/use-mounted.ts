import {onMounted, onUnmounted, ref} from 'vue-demi'

export const useMounted = (defaultMounted = false) => {
  const mounted = ref(defaultMounted)

  onMounted(() => {
    mounted.value = true
  })

  onUnmounted(() => {
    mounted.value = false
  })

  return mounted
}
