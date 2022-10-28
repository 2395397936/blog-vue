import {getCookie} from '@/cookie'
const state= {
    nickname: getCookie("nickname"),
    mobilePhoneNumber: getCookie("mobilePhoneNumber"),
    avatar: getCookie("avatar"),
    email: getCookie("email"),
    token: getCookie("token"),
}
const mutations={
    setNickname: (state, data) => state.nickname = data,
    mobilePhoneNumber: (state, data) => state.mobilePhoneNumber = data,
    setAvatar: (state, data) => state.avatar = data,
    setEmail: (state, data) => state.email = data,
    setToken: (state, data) => state.token = data,
}
const actions={
    initUser({commit},{nickname,mobilePhoneNumber,avatar,email,token}){
        commit("setNickname",nickname)
        commit("mobilePhoneNumber",mobilePhoneNumber)
        commit("setAvatar",avatar)
        commit("setEmail",email)
        commit("setToken",token)
    }
}
const getters={
    nickname(state){
        return state.nickname
    },
    mobilePhoneNumber(state){
        if (state.mobilePhoneNumber==='undefined')
            return ''
        return state.mobilePhoneNumber
    },
    email(state){
        return state.email
    },
    avatar(state){
        return state.avatar
    },
}
export default {
    state,
    mutations,
    actions,
    getters
}