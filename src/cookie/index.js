import Vue from "vue";
import cookies from 'vue-cookies'
Vue.use(cookies)


export function getCookie(key) {
    return cookies.get(key)
}

// 设置方法
export function setCookie(key,val) {
    return cookies.set(key, val,60*60*3)
}

// 删除方法
export function removeToken() {
    return cookies.remove('token')
}



