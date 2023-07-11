import {describe, it, expect, vi} from 'vitest'

import {useEscapeListener} from './use-escape-listener'
import {mountAppWithComposable} from '../../utils/test-utils'

const dispatchEscape = () => {
  document.dispatchEvent(new KeyboardEvent(`keydown`, {key: `Escape`}))
}

describe(`useEscapeListener composable`, () => {
  it(`Should be able to add and remove event listeners`, async () => {
    const callback = vi.fn()
    const {app} = mountAppWithComposable(() => useEscapeListener(true, document, callback))

    dispatchEscape()
    expect(callback).toHaveBeenCalledTimes(1)

    app.unmount()

    dispatchEscape()
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
