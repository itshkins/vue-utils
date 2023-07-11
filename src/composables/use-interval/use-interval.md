# useInterval composable

This composable is a helper over setInterval / clearInterval API.

## Usage

```vue
<template>
  <button @click="active = !active">Toggle</button>
</template>

<script lang="ts" setup>
import {useInterval} from '@itshkins/vue-utils'

const SECOND = 1000

useInterval(true, () => {
  // do something
}, SECOND)

const active = ref(false)

// interval is scheduled only when active is true
useInterval(active, () => {
  // do something
}, SECOND)
</script>
```
