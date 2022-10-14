<template>
  <div class="login">
    登陆
    <button @click="handleClick">点我去首页</button>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const user = ref<{nickname: string}>({nickname: 'keep'})

function handleClick(e) {
  console.log('handleClick', e.target)
  router.push('/home')
}
</script>

<style scoped>

</style>
