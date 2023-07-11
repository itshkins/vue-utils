import {reactive, shallowReactive, watch, Ref} from 'vue-demi'

import {defaultStorage, newLocalState} from '../../utils/local-state'

export const useLocalState = <TState>(
  key: string,
  defaultState: TState,
  storage: Storage = defaultStorage,
  toReactive: typeof reactive | typeof shallowReactive | ((state: TState) => Ref<TState>) = reactive,
): TState => {
  const localState = newLocalState(key, storage)
  const reactiveState = toReactive(localState.getState(defaultState))

  watch(reactiveState, () => {
    localState.setState(reactiveState)
  }, {deep: true})

  return reactiveState
}
