<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item><img src="/blog.png" class="blogPng" @click="imgClick" alt=""></el-menu-item>
      <el-menu-item index="home" @click="goHome" id="home">首页</el-menu-item>
      <el-menu-item index="sort" @click="goSort">分类</el-menu-item>
      <el-menu-item index="archive" @click="goArchive">文章归档</el-menu-item>
      <el-menu-item index="write" @click="goWrite" id="write" :disabled="!isLogin">
        <span class="el-icon-edit"></span>写文章
      </el-menu-item>
      <el-menu-item>
        <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-menu-item>
      <!--      未登录-->
      <el-menu-item id="login" @click="goLogin" v-if="!isLogin">登录</el-menu-item>
      <el-menu-item id="register" @click="goRegister" v-if="!isLogin">注册</el-menu-item>
      <!--       已登陆-->
      <el-menu-item  v-if="isLogin" id="user" >
        <el-dropdown @command="handleCommand" trigger="click">
            <span class="el-dropdown-link">
               {{ nickname }}
            </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="/articleManage" icon="el-icon-edit-outline">文章管理</el-dropdown-item>
            <el-dropdown-item command="/userSetting" icon="el-icon-setting">个人资料</el-dropdown-item>
            <el-dropdown-item command="logout" icon="el-icon-right" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>


      <el-menu-item v-if="isLogin" id="avatar">
        <el-dropdown @command="handleCommand" trigger="click">
            <span class="el-dropdown-link">
        <img :src="avatar" alt="" class="avatar">
            </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="/articleManage" icon="el-icon-edit-outline">文章管理</el-dropdown-item>
            <el-dropdown-item command="/userSetting" icon="el-icon-setting">个人资料</el-dropdown-item>
            <el-dropdown-item command="logout" icon="el-icon-right" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>

import {getCookie} from "@/cookie";
import {removeToken} from "@/cookie";
import {logout} from "@/api";

export default {
  name: "Header",
  data() {
    return {
      activeIndex: this.$route.path.toString().split('/')[1],
      input: '',
      isLogin: getCookie("token")||false,
      nickname: this.$store.getters.nickname,
      avatar: this.$store.getters.avatar
    };
  },

  methods: {
    imgClick() {
      this.$router.push({path: '/home'})
      location.reload()
    },
    goHome() {
      this.$router.push({path: '/home'})
    },
    goArchive() {
      this.$router.push({path: '/archive'})
    },
    goSort() {
      this.$router.push({path: '/sort'})
    },
    goWrite() {
      this.$router.push({path: '/write'})
    },
    goLogin() {
      this.$router.push({path: '/login'})
    },
    goRegister() {
      this.$router.push({path: '/register'})
    },
    async handleCommand(command){
      if (command!=='logout'){
        const routeLink = this.$router.resolve({
          path: command
        })
        window.open(routeLink.href, '_blank')
      }else {
        await logout()
        removeToken()

        this.$message.success({
          message: '再见 '+this.nickname
        })
        await this.$router.push('/login')
      }
    },
    search(){
      let {input} = this
      if (input===''){
        this.$message.info("请输入内容")
        return
      }
      if (this.$route.path.toString().split('/')[1]!=='search'){
        const routeLink = this.$router.resolve({
          path: '/search/'+this.input
        })
        window.open(routeLink.href, '_blank')

        this.input = ''
      }else {
        this.$router.push('/search/'+this.input)
        location.reload()

      }

    }
  }
}
</script>

<style scoped>
.blogPng {
  height: 60px;
  width: 80px
}

#home {
  margin-left: 80px;
}

#write {
  margin-left: 150px;
}

#login {
  margin-left: 100px;
}

#user {
  margin-left: 150px;
}

.avatar {
  width: 50px;
  height: 50px;
  margin-bottom: 5px;
  margin-top: 5px;
  border-radius: 50px;
}

#avatar{
  margin-left: 10px;
}

.el-dropdown-link{
  font-size: 18px;
}


</style>