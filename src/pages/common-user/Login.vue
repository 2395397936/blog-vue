<template>
  <div class="body" @keydown.enter="login">
    <div class="back">
      <el-link :underline="false" type="info" @click="back">
        <span class="el-icon-arrow-left" id="back">返回</span>
      </el-link>
    </div>
    <div class="login">
      <p class="userLogin">账号登录</p>
      <p class=""></p>
      <div class="input">
        <el-form>
          <el-input v-model="email" placeholder="邮箱地址" :prefix-icon="'el-icon-user'"></el-input>
          <div class="divide"></div>
          <el-input v-model="password" placeholder="密码" type="password" :prefix-icon="'el-icon-tickets'"></el-input>
        </el-form>
        <div class="other">
          <p class="check">
            <input type="checkbox" v-model="autoLogin" id="autoLogin">
            <label for="autoLogin" style="cursor: pointer">下次自动登录</label>
          </p>
          <p class="forget">
            <el-link style="font-size: 17px" @click="forget">忘记密码?</el-link>
          </p>
        </div>
        <el-button type="primary" class="enter" @click="login">登录</el-button>
      </div>
      <p class="register">没有账号，
        <el-link type="primary" @click="register" style="font-size: 17px;margin-bottom: 3px;">去注册</el-link>
      </p>
    </div>
  </div>


</template>

<script>
import {getCookie, removeToken, setCookie} from "@/cookie";
import axios from "axios";
import qs from "qs";
import Vue from "vue";
import vueMain from "@/main";

export default {
  name: "Login",
  data() {
    return {
      email: this.$route.params.email || '',
      password: '',
      autoLogin: false
    }
  },
  created() {
    let isAutoLogin = localStorage.getItem("isAutoLogin")
    if (isAutoLogin==="true"){
      this.autoLogin = true
      this.email=localStorage.getItem("email")
      this.password=localStorage.getItem("password")
    }

  },
  methods: {
    back() {
      this.$router.push("/home")
    },
    register() {
      this.$router.push('/register');
    },
    forget(){
        let routeData = this.$router.resolve({
          path: '/forget'
        });
        window.open(routeData.href, '_blank')
    },
    login() {
      const {email, password} = this

      if (!(email || password)) {
        alert('请输入用户名与密码')
        return
      }

      axios({
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: qs.stringify({"username":email, password}),   // 用 qs 将js对象转换为字符串 'name=edward&age=25'
        url: 'http://localhost:8222/login'
      }).then(data => {
        if (data.data.code !== 200) {
          Vue.prototype.$message({
            type: "error",
            message: data.data.msg,
            duration: 1500,
          });
          return
        }
        localStorage.setItem("isAutoLogin",this.autoLogin)

        if (this.autoLogin){
         localStorage.setItem("email",this.email)
         localStorage.setItem("password",this.password)
        }else {
          localStorage.removeItem("email")
          localStorage.removeItem("password")
        }
        setCookie("token", data.data.msg)
        setCookie("mobilePhoneNumber",data.data.data.mobilePhoneNumber)
        setCookie("email", data.data.data.email)
        setCookie("nickname", data.data.data.nickname)
        setCookie("avatar", data.data.data.avatar)
        this.$message({
          type: "success",
          message: "登录成功 "+data.data.data.nickname,
          duration: 1500,
        })
        this.$store.dispatch("initUser", {
           nickname: getCookie("nickname"),mobilePhoneNumber:getCookie("mobilePhoneNumber"),
          avatar: getCookie("avatar"), email: getCookie("email"), token: getCookie("token")
        })
        this.$router.push('/home')
      })

    },

  }
}
</script>

<style scoped>
.body {
  position: fixed;
  height: 100%;
  width: 100%;
  background-image: url('/320.png');
  background-size: 100% 100%;
}

#back {
  font-size: 20px;
}

.register {
  height: 15px;
  line-height: 15px;
  font-size: 15px;
  margin-top: 50px;
  margin-left: 310px;
  position: absolute;
  bottom: 39px;
  right: 35px;
}

.login {
  opacity: 0.9;
  position: fixed;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 70px;
  height: 500px;
  width: 500px;
  background-color: white;
}

.userLogin {
  position: fixed;
  font-size: 30px;
  margin-top: 25px;
  margin-left: 61px;
}

.other {
  height: 0;
}

.check {
  position: fixed;
  margin-top: 20px;
}

.forget {
  position: fixed;
  margin-top: 20px;
  margin-left: 280px;
}

.input {
  width: 75%;
  margin: 170px auto auto;
}

.divide {
  height: 30px;
}

.enter {
  width: 100%;
  margin: 70px auto auto;
}
</style>