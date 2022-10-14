<template>
  <div class="user">
    hehehe
    <button @click="handleClick">点我去首页</button>
    用户中心 {{user.nickname}}
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
