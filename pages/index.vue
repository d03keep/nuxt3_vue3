<template>
  <NuxtLayout>
    <div>
      <NuxtLink to="/user">去用户中心</NuxtLink>
      <br>
      <NuxtLink to="/recharge-record">去充值记录</NuxtLink>
      <br>
      <NuxtLink to="/parent">嵌套路由</NuxtLink>
      <br>
      <NuxtLink to="/home">去首页</NuxtLink>
      <button> 点我试试 </button>
      <el-button>再点我试试</el-button>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'
useHead({
  title: "前端博客-前端教程-记录web前端开发的个人技术博客",
  viewport: "width=device-width,initial-scale=1,maximum-scale=1 ",
  charset: "utf-8",
  meta: [
    { name: "description", content: "记录web前端开发的个人技术博客" },
    { name: "keywords", content: "笔记，前端，VUE，NODEJS，typescript" },
  ],
});
</script>

<style scoped>

</style>
