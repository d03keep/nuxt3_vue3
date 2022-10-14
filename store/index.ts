import { toRaw } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
const piniaStore = createPinia()

piniaStore.use(piniaPluginPersist)

piniaStore.use(({ store, options }) => {
    store.$subscribe((mutation) => {
        // 在存储变化的时候执行
        console.log('存储变化了', `[🍍 ${mutation.storeId}]:`, toRaw(store.$state))
    })
    store.$onAction(() => {
        // 在 action 的时候执行
    })
})

export default piniaStore
