import Vuex from 'vuex'
import Vue from "vue";
Vue.use(Vuex)

import user from "@/store/user";
import article from "@/store/article";
export default new Vuex.Store({
    modules: {
        user,article
    }
})