# useBoolean composable

This composable returns an object with boolean value and methods to change it.
It's a common case to have a boolean state in your component, e.g. isActive, isDisabled, etc.

## Usage

```vue

<template>
  <div>
    <button @click="disabled.activate" :disabled="disabled.value"/>
    <button @click="disabled.deactivate" :disabled="!disabled.value"/>
    <button @click="disabled.toggle"/>
  </div>
</template>
<script>
import {useBoolean} from "./use-boolean";

const disabled = useBoolean()
</script>
```
