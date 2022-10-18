import { defineNuxtPlugin } from '#app'
import piniaPersist from 'pinia-plugin-persist'

export default defineNuxtPlugin(nuxtApp => {
    console.log('defineNuxtPlugin===>', nuxtApp)
    nuxtApp.$pinia.use(piniaPersist)
})

