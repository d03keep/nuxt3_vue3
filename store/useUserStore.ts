import { defineStore } from 'pinia'
import { userState, USER } from "@/store/types";

export const useUserStore = defineStore(USER, {
    state: ():userState => ({
        account: '23892',
        avatar: '',
        id: 2389123,
        nick_name: 'keep1002',
        token: '892367asc6718231823'
    })
})

