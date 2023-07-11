# useEscapeListener composable

This composable is a helper over EventTarget API for keydown event with event.key equals to "Escape".
It is useful for popups and modals.

## Usage

```vue
<script lang="ts" setup>
import {useEscapeListener} from '@itshkins/vue-utils'

useEscapeListener(true, document, (event: KeyboardEvent) => {
  // do something
})

const active = ref(false)

// listener is attached only when active is true
useEscapeListener(active, document, (event: KeyboardEvent) => {
  // do something
})
</script>
```
