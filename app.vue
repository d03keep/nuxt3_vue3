<template>
  <div>loading: {{showGlobalLoading}}</div>
  <div class="pointer" v-if="showLoginDialog" @click="showLoginDialog = false">登陆弹框</div>
  <NuxtPage />
</template>
<script setup lang="ts">
  import { ElMessage } from 'element-plus'
  import mitt from "~/event/mitt";
  import { useUserStore } from "~/store/useUserStore";
  import { checkWebp } from '~/utils/common'
  import { initialHtmlStyle } from '~/utils/initialHtmlStyle'

  const user = useUserStore()

  const showLoginDialog = ref<boolean>(false)
  const showGlobalLoading = ref<boolean>(false)

  initialHtmlStyle()

  onMounted(() => {
    mitt.on('toggle-login', (flag:boolean) => showLoginDialog.value = flag)
    mitt.on('loading', (flag:boolean) => showGlobalLoading.value = flag)
    mitt.on('toast', (res:{msg:string}) => {
      ElMessage.error(res.msg)
    })
  })

  onDeactivated(() => {
    mitt.off('toggle-login')
    mitt.off('loading')
  })

  useHead({
    htmlAttrs: {
      lang: 'zh-CN',
      webp: checkWebp(),
      theme: 'dark',
      env: __ENV__,
      version: __VERSION__
    }
  })
</script>

