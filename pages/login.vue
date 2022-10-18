<template>
  <div class="login">
    <el-input v-model="username"></el-input>
    <el-button @click="handleLogin">登陆</el-button>

    <button @click="handleClick">点我去首页</button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/store/useUserStore";
import { userState } from "~/store/types";
const router = useRouter()
const username = ref<string>('')

const user = useUserStore()
const handleLogin = () => {
  const params: userState = {
    account: username.value,
    avatar: '',
    id: 9527,
    nickname: 'username.value',
    token: (Math.random() * 1000000).toString()
  }

  user.login(params)
}
function handleClick(e) {
  console.log('handleClick', e.target)
  router.push('/home')
}
</script>

<style scoped>

</style>
