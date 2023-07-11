import {nextTick} from 'vue'
import {describe, it, expect} from 'vitest'

import {useLocalState} from './use-local-state'
import {mountAppWithComposable} from '../../utils/test-utils'

describe(`useLocalState composable`, () => {
  it(`Should be correct indicator of Storage API`, async () => {
    const defaultStorage = sessionStorage
    const key = `my-key`
    const initialState = {value: [] as string[]}
    expect(defaultStorage.getItem(key)).toBeNull()

    const getStorageItem = () => JSON.parse(defaultStorage.getItem(key) ?? `null`)

    const {app, result} = mountAppWithComposable(() => useLocalState(key, initialState, defaultStorage))
    result.value.push(`new-item`)
    await nextTick()

    expect(result).toBe(initialState)
    expect(result).toEqual({value: [`new-item`]})
    expect(getStorageItem()).toEqual({value: [`new-item`]})

    result.value = [`item`]
    await nextTick()

    expect(result).toBe(initialState)
    expect(result).toEqual({value: [`item`]})
    expect(getStorageItem()).toEqual({value: [`item`]})

    app.unmount()
  })
})
