import {Ref, computed, ref, unref, watchEffect} from 'vue-demi'

import {useInterval} from './use-interval/use-interval'

const SECOND = 1000

const noop = () => {
}

export const useCountdown = (
  active: true | Ref<boolean>,
  timeout: number,
  onDone: VoidFunction = noop,
) => {
  const currentTimestamp = ref<number>(0)
  const startTimestamp = ref<number>(currentTimestamp.value)

  const elapsedMs = computed(() => currentTimestamp.value - startTimestamp.value)
  const leftMs = computed(() => timeout - elapsedMs.value)
  const leftSeconds = computed(() => Math.ceil(leftMs.value / SECOND))

  watchEffect(() => {
    if (!unref(active)) {
      return
    }
    startTimestamp.value = currentTimestamp.value = Date.now()
  })

  useInterval(active, () => {
    currentTimestamp.value = Date.now()
  }, SECOND)

  watchEffect(() => {
    if (leftSeconds.value <= 0) {
      onDone()
    }
  })

  return {
    leftSeconds,
    leftMs,
    elapsedMs,
  }
}
