<template>
  <div>
   {{user.nickname}}的充值记录
    <NuxtLink :to="`/recharge-record-detail-${item}`" v-for="item of rechargeList" :key="item">
      <p>
        item id {{item}}
      </p>
    </NuxtLink>

    <el-row>
      <el-col :span="8" class="flex-middle">col1</el-col>
      <el-col :span="8" class="flex-middle">col2</el-col>
      <el-col :span="8" class="flex-middle">col3</el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
  import { ElRow, ElCol } from 'element-plus'
  import { useUserStore } from "~/store/useUserStore";
  const user = useUserStore()
  const rechargeList = ref<string[]>([
      'as123819sdsd2d3', 'as9123kjasld912'
  ])
</script>

<style scoped>

</style>
