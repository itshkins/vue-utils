import Vue, {h, ComponentOptions, defineComponent} from 'vue'
import {describe, it, expect} from 'vitest'
import {mount} from '@vue/test-utils'

import {useProp} from './use-prop'

describe(`useProp composable`, () => {
  it(`Should emit update:* event on prop change`, async () => {

    const ChildComponent = defineComponent({
      name: `ChildComponent`,
      props: {
        value: {type: Number, required: true},
      },
      setup(props, {emit}) {
        const computedValue = useProp<number>(props, emit, `value`, `input`)
        return {computedValue}
      },
      render() {
        return h(`button`, {
          on: {
            click: () => this.computedValue += 1,
          },
        }, String(this.computedValue))
      }
    })

    const ParentComponent = defineComponent({
      name: `ParentComponent`,
      data() {
        return {
          value: 0,
        }
      },
      render() {
        return h(ChildComponent, {
          props: {
            value: this.value,
          },
          on: {
            input: (newValue: number) => {
              this.value = newValue
            },
          }
        })
      },
    })

    const wrapper = mount(ParentComponent as ComponentOptions<Vue>)
    expect(wrapper.exists()).toBe(true)

    const button = wrapper.find(`button`)
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe(`0`)

    await button.trigger(`click`)
    expect(button.text()).toBe(`1`)
  })
})
