<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item id="blogPng">
        <img alt="回到主页" src="/blog.png" class="blogPng" @click="imgClick">
      </el-menu-item>

      <!--       已登陆-->
      <el-menu-item v-if="isLogin" id="avatar">
        <el-dropdown @command="handleCommand" trigger="click">
            <span class="el-dropdown-link">
              <img :src=avatar alt="" class="avatar">
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
  name: "LoginHeader",
  data() {
    return {
      activeIndex: '1',
      input: '',
      isLogin: getCookie("token"),
      nickname: this.$store.getters.nickname,
      avatar: this.$store.getters.avatar
    };
  },
  methods: {
    imgClick() {
      this.$router.push({path: '/home'})
      location.reload()
    },

    async handleCommand(command){
      if (command!=='logout'){
        const routeLink = this.$router.resolve({
          path: command
        })
        window.open(routeLink.href, '_blank')

        // this.$router.push(command)
      }else {
        await logout()
        removeToken()
        this.$message.success({
          message: '再见 '+this.nickname
        })
        removeToken()
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped>
.blogPng {
  height: 60px;
  width: 80px;
}

#blogPng{
  margin-left: 150px;
}

#avatar{
  margin-left: 900px;
}

.avatar {
  width: 50px;
  height: 50px;
  margin: 5px 0 5px 0;
  border-radius: 50px;
}

.el-dropdown-link{
  font-size: 18px;
}


</style>