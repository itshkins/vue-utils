import {describe, it, expect} from 'vitest'

import {mountAppWithComposable} from '../../utils/test-utils'
import {useMounted} from './use-mounted'

describe(`useMounted composable`, () => {
  it(`Should be correct indicator of component mounted state`, () => {
    const {app, result} = mountAppWithComposable(() => useMounted())
    expect(result.value).toBe(true)

    app.unmount()
    expect(result.value).toBe(false)
  })
})
