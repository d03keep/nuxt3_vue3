<template>
  <div>
    {{time}}
    <DemoSearch></DemoSearch>
    <NuxtLink to="/parent/child1">jump to child1</NuxtLink>
    <br>
    <NuxtLink to="/parent/child2">jump to child2</NuxtLink>
    <NuxtChild></NuxtChild>
  </div>
</template>
<script setup lang="ts">
  import { formatDate } from '~/utils/common'
  const time = formatDate(new Date())
</script>

<style scoped>

</style>
