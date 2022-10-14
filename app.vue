<template>
  <div class="pointer" v-if="showLoginDialog" @click="showLoginDialog = false">登陆弹框</div>
  <NuxtPage />
</template>
<script setup lang="ts">
  import mitt from "~/event/mitt";
  import { useUserStore } from "~/store/useUserStore";
  import { checkWebp } from '~/utils/common'
  import { initialHtmlStyle } from '~/utils/initialHtmlStyle'

  const user = useUserStore()

  const showLoginDialog = ref<boolean>(false)

  initialHtmlStyle()

  const env = __ENV__
  const version = __VERSION__

  onMounted(() => {
    mitt.on('toggle-login', (flag:boolean) => {
      showLoginDialog.value = flag
    })
  })

  useHead({
    htmlAttrs: {
      lang: 'zh-CN',
      webp: checkWebp(),
      theme: 'dark',
    }
  })
</script>

