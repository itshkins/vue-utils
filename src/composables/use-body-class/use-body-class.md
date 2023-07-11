# useBodyClass composable

This composable is a helper that simplifies the process of adding/removing classes to the document body.
It is useful for modals.

## Usage

```vue
<template>
  <button @click="active = !active">Toggle</button>
</template>

<script lang="ts" setup>
import {useBodyClass} from '@itshkins/vue-utils'

useBodyClass(true, `modal`)

const active = ref(false)

// class is added only when active is true
useBodyClass(active, `mobile-modal`)
</script>
```
