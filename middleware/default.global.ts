import mitt from '../event/mitt'
export default defineNuxtRouteMiddleware((to, from) => {
    // console.log('to===>', to, '\n','from===>', from)
    if (to.path === '/user') {
        //停止当前导航，可以使用error进行报错
        abortNavigation()
        // return  navigateTo('/login')
        mitt.emit('toggle-login', true)
        return false
    }
})
