import { defineStore } from 'pinia'
import { userState, USER } from "@/store/types";

export const useUserStore = defineStore(USER, {
    state: ():userState => ({
        account: '23892',
        avatar: '',
        id: 2389123,
        nickname: 'keep1002',
        token: '892367asc6718231823'
    }),
    actions: {
        // 用户登录
        login(data: userState) {
            const {token, avatar, account, nickname, id,} = data
            this.account = account
            this.avatar = avatar
            this.id = id
            this.nickname = nickname
            this.token = token
        },

        // 用户退出
        logout() {
            this.account = '23892'
            this.avatar = ''
            this.id = 0
            this.nickname = ''
            this.token = ''
        },
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: USER,
                storage: process.client ? localStorage : null
            }
        ]
    }
})

