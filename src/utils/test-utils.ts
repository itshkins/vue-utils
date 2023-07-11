import {createApp} from 'vue-demi'

export const mountAppWithComposable = <T>(composable: () => T) => {
  let result: T

  const app = createApp({
    setup() {
      result = composable()
      return () => {
      }
    },
  })

  app.mount(document.createElement(`div`))

  // @ts-ignore-line
  return {result, app}
}
