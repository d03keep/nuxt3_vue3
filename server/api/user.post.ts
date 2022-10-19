export default defineEventHandler((event) => {

    console.log('自定义接口：', event.req.headers)
    const { t, d, p } = event.req.headers
    return {
        username: 'keep1003',
        account: '45612312',
        avatar: '/',
        id:'456421asd2sd256532asdasd',
        nickname: '陆小果',
        token: '923842934234823'
    }
})
