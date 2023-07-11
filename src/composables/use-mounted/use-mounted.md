# useMounted composable

The composable that returns a ref object returns true when component is mounted and false otherwise.
It might be __useful__ in case you are __unable to cancel async operation__, e.g. your __api client doesn't support cancellation__.

## Usage

```vue
<template>
  <form @submit.prevent="submit"/>
</template>

<script setup>
import {useMounted} from '@itshkins/vue-utils'

const mounted = useMounted()

const submit = (evt) => {
  const data = new FormData(evt.target)

  apiClient
    .createEntity(data)
    .then(() => {
      if (mounted.value) {
        // do something
      }
    })
    .catch(() => {
      if (mounted.value) {
        // do something
      }
    })
)
</script>
```
