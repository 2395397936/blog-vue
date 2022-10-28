<template>
  <div class="body">
    <el-link :underline="false" type="info" @click="back">
      <span class="el-icon-arrow-left" id="back">返回</span>
    </el-link>
    <div class="register">
      <p class="userLogin">账号注册</p>

      <div v-show="show">
        <div class="tip">
          请选择您的注册身份
        </div>
        <div class="student">
          <p class="el-icon-user"></p>
          <el-button type="primary" @click="student">我是普通用户</el-button>
        </div>
        <div class="teacher">
          <p class="el-icon-user-solid"></p>
          <el-button type="primary" @click="teacher">我是管理人员</el-button>
        </div>
      </div>


      <div v-show="!show">
        <div class="input">
          <el-form>
            <el-input v-model="nickname" placeholder="昵称" :prefix-icon="'el-icon-user'"
                      :suffix-icon=nicknameSuffix></el-input>
            <div class="inputTip">昵称由2-6位字符组成</div>
            <div class="divide"></div>
            <el-input v-model="password" placeholder="密码" :prefix-icon="'el-icon-tickets'"
                      :suffix-icon=passwordSuffix type="password"></el-input>
            <div class="inputTip">密码由6-11位字符组成</div>
            <div class="divide"></div>
            <el-input v-model="repassword" placeholder="确认密码" :prefix-icon="'el-icon-tickets'"
                      :suffix-icon=repasswordSuffix  type="password"></el-input>
            <div class="divide"></div>
            <el-input v-model="email" placeholder="验证邮箱" :prefix-icon="'el-icon-s-promotion'"
                      :suffix-icon=emailSuffix></el-input>
            <div class="divide"></div>

            <el-input v-model="inviteCode" placeholder="邀请码" :prefix-icon="'el-icon-medal'"
                        v-show="status==='1'"></el-input>

            <div style="width: 60%;display: inline-block"  v-show="status==='0'">
              <el-input v-model="code" placeholder="验证码"></el-input>
            </div>
            <div style="width: 100px;display: inline-block;margin-left: 48px;"  v-show="status==='0'">
              <el-button style="width: 100px;" type="primary" plain
                         @click="sendEmail"
                         :disabled="isSending">{{ !isSending ? "发送" : countDownNum + "s" }}
              </el-button>
            </div>

          </el-form>
          <el-button type="primary" class="enter" @click="register">注册</el-button>
        </div>
      </div>

      <p class="login">
        <span style="position:absolute;bottom: 0;right: 20px;width: 100px;">已有账号，</span>
        <el-link type="primary" @click="login" style="font-size: 16px">去登录</el-link>
      </p>
    </div>
  </div>

</template>

<script>
import {register, registerAdmin, sendEmail} from "@/api";

export default {
  name: "Register",
  data() {
    return {
      show: true,
      status: '',
      nickname: '',
      password: '',
      repassword: '',
      email: '',
      isSending: false,
      countDownNum: 60,
      timer: '',
      code: '',
      nicknameSuffix: '',
      passwordSuffix: '',
      repasswordSuffix: '',
      emailSuffix: '',
      inviteCode: '',
    }
  },
  created() {
    if (localStorage.getItem("isSending") > 0) {
      this.isSending = true
      this.countDownNum = localStorage.getItem("isSending")
      this.countDown()
    }
  },
  methods: {
    back() {
      if (this.status==='1'){
        this.show = true
        this.status = ''
        return;
      }
      if (this.status==='0'){
        this.show = true
        this.status = ''
        return
      }
      this.$router.push("/home")
    },
    login() {
      this.$router.push("/login")
    },

    teacher() {
      this.status = '1'
      this.show = !this.show
    },
    student() {
      this.status = '0'
      this.show = !this.show
    },
    sendEmail() {
      let reg = /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/
      if (!reg.test(this.email)) {
        this.$message.error("邮箱格式错误")
        return
      }
      this.isSending = true
      localStorage.setItem("isSending", this.countDownNum)
      this.countDown()
      sendEmail(JSON.stringify({"emailAddress": this.email})).then(() => {
        this.$message.success("您的验证码将在5分钟内有效")
      })
    },
    countDown() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        localStorage.setItem("isSending", this.countDownNum)
        if (this.countDownNum > 1) {
          this.countDownNum--
        } else {
          localStorage.removeItem("isSending")
          clearInterval(this.timer)
          this.isSending = false
          this.countDownNum = 60
        }
      }, 1000)
    },
    register() {
      let {nickname,password,email,code,repassword,inviteCode} = this

      if (!(nickname || password || email)) {
        this.$message.error('请输入完整信息')
        return
      }
      if (nickname.length > 6 || nickname.length < 2) {
        this.$message.error('请输入2-6位昵称')
        return
      }
      if (password.length < 6 || password.length > 11) {
        this.$message.error('请输入6-11位以下密码')
        return
      }
      if (password!==repassword){
        this.$message.error('密码与确认密码不一致')
        return
      }
      if (this.status==='0'){
        register(JSON.stringify({nickname, password, email, code})).then(() => {
          this.$router.push({
            name: 'login',
            params: {email}
          })
          this.$message.success("注册成功" + nickname)
          localStorage.removeItem("isSending")
        })
      }else {
        registerAdmin(JSON.stringify({nickname, password, email, inviteCode})).then(() => {
          this.$router.push({
            name: 'login',
            params: {email}
          })
          this.$message.success("注册成功" + nickname)
          localStorage.removeItem("isSending")
        })
      }

    },
  },
  watch: {
    nickname() {
      if (this.nickname.length > 11 || this.nickname.length < 2) {
        this.nicknameSuffix = 'el-icon-close'
      } else {
        this.nicknameSuffix = 'el-icon-check'
      }
    },
    password() {
      if (this.password === this.repassword) {
        this.repasswordSuffix = 'el-icon-check'
      } else {
        this.repasswordSuffix = 'el-icon-close'
      }
      if (this.password.length < 6 || this.password.length > 11) {
        this.passwordSuffix = 'el-icon-close'
      } else {
        this.passwordSuffix = 'el-icon-check'
      }
    },
    repassword() {
      if (this.password === this.repassword) {
        this.repasswordSuffix = 'el-icon-check'
      } else {
        this.repasswordSuffix = 'el-icon-close'
      }
    },
    email() {
        let reg = /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/
        if (reg.test(this.email)) {
          this.emailSuffix = 'el-icon-check'
        } else {
          this.emailSuffix = 'el-icon-close'
        }
      }
    }

}
</script>

<style scoped>
.body {
  position: fixed;
  height: 100%;
  width: 100%;
  background-image: url("/320.png");
  background-size: 100% 100%;
}

#back {
  font-size: 20px;
}

.el-icon-user-solid, .el-icon-user {
  margin-right: 35px;
  font-size: 45px;
}

button {
  width: 300px;
  align-content: center;
}

.tip {
  position: fixed;
  font-size: 15px;
  margin-top: 90px;
  margin-left: 61px;
}

.student {
  position: fixed;
  align-content: center;
  margin-left: 30px;
  margin-top: 190px;
}

.teacher {
  position: fixed;
  margin-left: 30px;
  margin-top: 280px;
}

.login {
  position: absolute;
  bottom: 20px;
  right: 40px;;
}

.register {
  opacity: 0.9;
  position: fixed;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 70px;
  height: 540px;
  width: 500px;
  background-color: white;
}

.inputTip {
  position: absolute;
  font-size: 10px;
  color: #838080;
}

.userLogin {
  position: fixed;
  font-size: 30px;
  margin-top: 25px;
  margin-left: 61px;
}

.input {
  width: 75%;
  margin: 80px auto auto;
}

.divide {
  height: 30px;
}

.enter {
  width: 100%;
  margin: 20px auto auto;
}
</style>