<template>
  <header class="the-header">
    头部
    昵称：{{user.nickname}}

    <el-button type="primary" @click="handelChangeNickname">改名</el-button>
  </header>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'
import { useUserStore } from "~/store/useUserStore";

const user = useUserStore()

const handelChangeNickname = () => {
  user.nickname = 'keep1003'
}
</script>

<style scoped>
.the-header {
  height: 50px;
  background-color: #ddd;
}
</style>
