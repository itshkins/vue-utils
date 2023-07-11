# useProp composable

This composable transforms props value into computed that emits update event on value change.

## Usage

### ChildComponent.vue

```vue
<template>
  <button @click="computedValue += 1"/>
</template>

<script lang="ts" setup>
import {useProp} from "@itshkins/vue-utils"

defineOptions({
  name: `ChildComponent`,
})

const props = defineProps<{
  value: number,
}>()

const emit = defineEmits<{
  (type: `input`, value: number): void,
}>()

const computedValue = useProp(props, emit, `value`, `input`) // for vue 2
const computedValue = useProp(props, emit, `value`) // for vue 3
</script>
```

### ParentComponent.vue

```vue
<template>
  <ChildComponent v-model="value"/>
</template>

<script lang="ts" setup>
import ChildComponent from './ChildComponent.vue'

const value = ref(0)
</script>
```
