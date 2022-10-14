<template>
  <header class="the-header">
    头部
    昵称：{{user.nick_name}}
  </header>
</template>

<script setup>
import {useUserStore} from "../store/useUserStore";

const user = useUserStore()
</script>

<style scoped>
.the-header {
  height: 50px;
  background-color: #ddd;
}
</style>
