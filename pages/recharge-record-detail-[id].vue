<template>
  <div>
    详情页获取的参数：{{id}}
  </div>
</template>

<script setup lang="ts">
  const route = useRoute()
  const id = route.params.id
</script>

<style scoped>

</style>
