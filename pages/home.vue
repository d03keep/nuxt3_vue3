<template>
  <div class="home">
    <Head>
      <Title>个人博客</Title>
      <Meta name="description" :content="title" />
    </Head>
    hehehe
    <button @click="handleClick">点我回index</button>
    首页 {{user.nickname}}
  </div>

</template>

<script setup lang="ts">
  const router = useRouter()
  const user = ref<{nickname: string}>({nickname: 'keep'})
  const title = ref<string>("码云笔记的前端博客");
  function handleClick(e) {
    console.log('handleClick', e.target)
    router.push('/')
  }
</script>

<style scoped>

</style>
