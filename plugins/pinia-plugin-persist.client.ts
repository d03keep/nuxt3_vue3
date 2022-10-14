import { defineNuxtPlugin } from '#app'
import piniaPersist from 'pinia-plugin-persist'

export default defineNuxtPlugin(nuxtApp => {
    console.log('defineNuxtPlugin===>', nuxtApp.$pinia)
    nuxtApp.$pinia.use(piniaPersist)
})

