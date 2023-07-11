# useEventListener composable

This composable is a helper over EventTarget API.

## Usage

```vue
<template>
  <button @click="active = !active">Toggle</button>
</template>

<script lang="ts" setup>
import {useEventListener} from '@itshkins/vue-utils'

useEventListener(true, document, `click`, (event: MouseEvent) => {
  // do something
})

const active = ref(false)

// listener is attached only when active is true
useEventListener(active, document, `keydown`, (event: KeyboardEvent) => {
  // do something
})
</script>
```
