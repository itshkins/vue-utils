# yseLocalState composable

This composable returns state that persists between page reloads.
It supports any storage that implements Storage interface, e.g. localStorage, sessionStorage, etc.

## Usage

```vue
<template>
  <div>
    <button @click="() => Object.assign(disabled, {first: false, second: false})">Enable both</button>
    <button @click="() => Object.assign(disabled, {first: true, second: false})" :disabled="disabled.first">Disable first</button>
    <button @click="() => Object.assign(disabled, {first: false, second: true})" :disabled="disabled.second">Disable second</button>
    <button @click="() => Object.assign(disabled, {first: true, second: true})">Disable both</button>
  </div>
</template>

<script setup>
import {useLocalState} from '@itshkins/vue-utils'

const disabled = useLocalState(`my-buttons-disabled`, {first: false, second: true}, sessionStorage)
</script>
```
