import {describe, it, expect, vi, afterAll, beforeAll} from 'vitest'

import {useInterval} from './use-interval'
import {mountAppWithComposable} from '../../utils/test-utils'

const SECOND = 1000

describe(`useEventListener composable`, () => {
  beforeAll(() => {
    vi.useFakeTimers()
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  it(`Should be able to add and remove event listeners`, async () => {
    const callback = vi.fn()
    const {app} = mountAppWithComposable(() => useInterval(true, callback, SECOND))
    expect(callback).toHaveBeenCalledTimes(0)

    vi.advanceTimersByTime(SECOND)
    expect(callback).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(SECOND)
    expect(callback).toHaveBeenCalledTimes(2)

    app.unmount()

    vi.advanceTimersByTime(SECOND)
    expect(callback).toHaveBeenCalledTimes(2)
  })
})
