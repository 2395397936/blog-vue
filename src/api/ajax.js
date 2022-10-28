import axios from "axios";
import 'nprogress/nprogress.css'
import {getCookie, removeToken} from "@/cookie";
import Vue from "vue";
import vueMain from '@/main'


let requests = axios.create({
    baseURL: "/api",
    timeout: 5000,
})

// 请求拦截
requests.interceptors.request.use((config) => {

    config.headers['Content-Type'] = 'application/json'
    // NProgress.start()
    const token = getCookie('token')
    if (token) {
         config.headers.token = token;
    }
    return config
}, err => {
    return Promise.reject(err)
})

requests.interceptors.response.use((res) => {
    let code = res.data.code
    if (code !== 200) {
        Vue.prototype.$message({
            type: "error",
            message: res.data.msg,
            duration: 1500,
        });

        if (code===-201){
            removeToken()
            vueMain.$router.push('/login')
        }
        if (code===-404){
            vueMain.$router.push('/404')
            vueMain.NProgress.done()
        }
        console.log(res)
        return Promise.reject(new Error(res.data.msg))
    }
    return res
}, error => {
    console.log(error)
    return Promise.reject(new Error((error)))
})
export default requests