import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((app) => {
    app.vueApp.config.errorHandler = (error, context) => {
        console.log('defineNuxtPlugin', error, context)
    }
})
