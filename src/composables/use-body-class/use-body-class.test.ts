import {nextTick, ref} from 'vue-demi'
import {describe, it, expect} from 'vitest'

import {useBodyClass} from './use-body-class'
import {mountAppWithComposable} from '../../utils/test-utils'

describe(`useBodyClass composable`, () => {
  it(`Should be able to add and remove class to the document body`, async () => {
    const {app} = mountAppWithComposable(() => useBodyClass(true, `modal`))
    expect(document.body.classList.contains(`modal`)).toBe(true)

    app.unmount()
    expect(document.body.classList.contains(`modal`)).toBe(false)
  })

  it(`Should be able to add and remove class to the document body with active ref`, async () => {
    const active = ref(false)
    const {app} = mountAppWithComposable(() => useBodyClass(active, `mobile-modal`))
    expect(document.body.classList.contains(`mobile-modal`)).toBe(false)

    active.value = true
    await nextTick()
    expect(document.body.classList.contains(`mobile-modal`)).toBe(true)

    app.unmount()
    expect(document.body.classList.contains(`mobile-modal`)).toBe(false)
  })
})
