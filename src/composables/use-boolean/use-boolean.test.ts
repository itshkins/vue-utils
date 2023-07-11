import {describe, it, expect} from 'vitest'

import {mountAppWithComposable} from '../../utils/test-utils'
import {useBoolean} from './use-boolean'

describe(`useBooleanRef composable`, () => {
  it(`Should provide setActive function`, async () => {
    const {app, result} = mountAppWithComposable(() => useBoolean(false))

    expect(result.value).toBe(false)

    result.value = true
    expect(result.value).toBe(true)

    result.setValue(true)
    expect(result.value).toBe(true)

    result.setValue(true)
    expect(result.value).toBe(true)

    result.setValue(false)
    expect(result.value).toBe(false)

    result.setValue(false)
    expect(result.value).toBe(false)

    app.unmount()
  })

  it(`Should provide activate function`, () => {
    const {app, result} = mountAppWithComposable(() => useBoolean(false))
    expect(result.value).toBe(false)

    result.activate()
    expect(result.value).toBe(true)

    result.activate()
    expect(result.value).toBe(true)

    app.unmount()
  })

  it(`Should provide deactivate function`, () => {
    const {app, result} = mountAppWithComposable(() => useBoolean(true))
    expect(result.value).toBe(true)

    result.deactivate()
    expect(result.value).toBe(false)

    result.deactivate()
    expect(result.value).toBe(false)

    app.unmount()
  })

  it(`Should provide toggle function`, () => {
    const {app, result} = mountAppWithComposable(() => useBoolean(false))
    expect(result.value).toBe(false)

    result.toggle()
    expect(result.value).toBe(true)

    result.toggle()
    expect(result.value).toBe(false)

    result.toggle()
    expect(result.value).toBe(true)

    result.toggle()
    expect(result.value).toBe(false)

    app.unmount()
  })
})
