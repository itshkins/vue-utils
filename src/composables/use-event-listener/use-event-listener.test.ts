import {describe, it, expect, vi} from 'vitest'

import {useEventListener} from './use-event-listener'
import {mountAppWithComposable} from '../../utils/test-utils'

describe(`useEventListener composable`, () => {
  it(`Should be able to add and remove event listeners`, async () => {
    const callback = vi.fn()
    const {app} = mountAppWithComposable(() => useEventListener(true, document, `click`, callback))

    document.dispatchEvent(new Event(`click`))
    expect(callback).toHaveBeenCalledTimes(1)

    app.unmount()

    document.dispatchEvent(new Event(`click`))
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
