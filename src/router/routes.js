import Home from "@/pages/common-user/Home";
import Header from "@/components/common/Header";
import Archive from "@/pages/common-user/Archive";
import Sort from "@/pages/common-user/Sort";
import Write from "@/pages/common-user/Write";
import Login from "@/pages/common-user/Login";
import Register from "@/pages/common-user/Register";
import {getCookie} from "@/cookie";
import NotFound from "@/pages/error/NotFound";
import ArticleManage from "@/pages/common-user/ArticleManage";
import Vue from "vue";
import UserSetting from "@/pages/common-user/UserSetting";
import LoginHeader from "@/components/common/LoginHeader";
import ArticleBody from "@/pages/common-user/ArticleBody";
import SortArticles from "@/pages/common-user/SortArticles";
import Edit from "@/pages/common-user/Edit";
import Forget from "@/pages/common-user/Forget";
import Search from "@/pages/common-user/Search";

export default [
    {
        path:'/',
        component:Header,
        children:[
            {
                name:'home',
                path:'/home/:page',
                component:Home,
                meta:{title:'dsg-专业开发者社区'},
            },
            {
                name:'sortArticles',
                path:'/sort/sortArticles/:by/:id',
                component:SortArticles,
                meta:{title:'文章分类'},
            },
            {
                name:'sort',
                path:'/sort',
                component:Sort,
                meta:{title:'文章分类'},
            },
            {
                name:'archive',
                path:'/archive',
                component:Archive,
                meta:{title:'文章归档'},
            },
            {
                name:'search',
                path:'/search/:name',
                component:Search,
                meta:{title:'文章归档'},
            },
            {
                name:'write',
                path:'/write',
                component:Write,
                meta:{title:'写文章'},
                beforeEnter: (to, from, next) => {
                    if (getCookie("token")){
                        next()
                    }else {
                        next('/home')
                        Vue.prototype.$message.error({
                            duration: "1000",
                            message: '请先登录'
                        })
                    }
                },
            },
            {
                name:'view',
                path:'/view/:id',
                component:ArticleBody,
                meta:{title:'文章'},
            },
        ],
        redirect:'/home/1'
    },
    {
        path:'/home',
        redirect:'/home/1'
    },

    {
        name:'login',
        path:'/login',
        component:Login,
        beforeEnter: (to, from, next) => {
            if (!getCookie("token")){
                next()
            }else {
                next('/home/1')
                Vue.prototype.$message.error({
                    message: '您已经登录'
                })
            }
        },
    },
    {
        name:'register',
        path:'/register',
        component:Register,
        meta:{title:'注册'},
        beforeEnter: (to, from, next) => {
            if (!getCookie("token")){
                next()
            }else {
                next('/home')
                Vue.prototype.$message.error({
                    message: '您已经登录'
                })
            }
        },
    },
    {
        name:'forget',
        path:'/forget',
        component:Forget,
        meta:{title:'忘记密码'},
        beforeEnter: (to, from, next) => {
            if (!getCookie("token")){
                next()
            }else {
                next('/home')
                Vue.prototype.$message.error({
                    message: '您已经登录'
                })
            }
        },
    },
    {
        name: 'loginHeader',
        component: LoginHeader,
        path: '/',
        children: [
            {
                name:'articleManage',
                path:'/articleManage',
                component:ArticleManage,
                meta:{title:'文章管理'},
                beforeEnter: (to, from, next) => {
                    if (getCookie("token")){
                        next()
                    }else {
                        next('/home')
                        Vue.prototype.$message.error({
                            message: '请先登录'
                        })
                    }
                },
            },
            {
                name:'userSetting',
                path:'/userSetting',
                component:UserSetting,
                meta:{title:'个人设置'},
                beforeEnter: (to, from, next) => {
                    if (getCookie("token")){
                        next()
                    }else {
                        next('/home')
                        Vue.prototype.$message.error({
                            message: '请先登录'
                        })
                    }
                },
            },
            {
                name:'edit',
                path:'/edit/:id',
                component:Edit,
                meta:{title:'修改文章'},
                beforeEnter: (to, from, next) => {
                    if (getCookie("token")){
                        next()
                    }else {
                        next('/home')
                        Vue.prototype.$message.error({
                            duration: "1000",
                            message: '请先登录'
                        })
                    }
                },
            },
        ]
    },


    {
        path: "/404",
        name: "notFound",
        meta:{title:'404'},
        component: NotFound
    },
    {
        path: "*", // 此处需特别注意置于最底部
        redirect: "/404"
    }
]