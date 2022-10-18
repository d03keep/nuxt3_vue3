<template>
  <div>
    {{formatDate(1665970039752)}}
    {{JSON.stringify(result)}}
    <DemoSearch></DemoSearch>
    <NuxtLink to="/parent/child1">jump to child1</NuxtLink>
    <br>
    <NuxtLink to="/parent/child2">jump to child2</NuxtLink>
    <NuxtChild></NuxtChild>
  </div>
</template>
<script setup lang="ts">
  import { formatDate } from '~/utils/common'
  import { getAppConfig } from '~/request/apis/common'


  const result = await getAppConfig()

  if(process.client) {
    console.log('result====>', result)
  }
</script>

<style scoped>

</style>
