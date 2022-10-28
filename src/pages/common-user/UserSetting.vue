<template>
  <div class="center">
    <div class="top">
      <img :src="avatar" alt="" class="bigAvatar" @click="avatarVisible = true">
<!--      修改头像-->
      <el-dialog
          title="头像上传"
          :visible.sync="avatarVisible"
          :before-close="leave"
          width="60%">
        <div class="el-upload">
          <el-upload
              action="http://localhost:8222/oss/fileUpload"
              class="avatar-uploader"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :headers="token">
            <i  class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

        </div>
        <img v-if="imageUrl" :src="imageUrl" class="uploadAvatar">
        <div v-else class="uploadAvatar" style="display:inline-block;background-repeat: repeat;background-image: url(/imgBackground.png)"></div>
        <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="saveAvatar">提 交</el-button>
  </span>
      </el-dialog>
      <span class="nickname">{{ this.$store.getters.nickname }}</span>
    </div>
    <div class="info">
      <div class="baseInfo">基本信息</div>
      <el-divider/>
      <div class="form">
        <el-descriptions class="margin-top" :column="1" border id="form">
          <template slot="extra">
            <el-button type="primary" @click="edit" v-show="!isEdit">编辑</el-button>
            <el-button type="primary" @click="back" v-show="isEdit">取消</el-button>
            <el-button type="primary" @click="save" v-show="isEdit">保存</el-button>
          </template>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-tickets"></i>
              昵称
            </template>
            <span v-show="!isEdit">{{ nickname }}</span>
            <span v-show="isEdit">
                <el-input v-model="nickname" style="width: 300px" :suffix-icon="nicknameSuffix" />
            </span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-mobile-phone"></i>
              手机号
            </template>
            <span v-show="!isEdit">{{ mobilePhoneNumber }}</span>
            <span v-show="isEdit">
                <el-input v-model="mobilePhoneNumber" style="width: 300px"
                          :suffix-icon="mobilePhoneNumberSuffix" />
            </span>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-s-promotion"></i>
              邮箱
            </template>
            <span>{{ email }}</span>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              密码
            </template>
            <span>******</span>
            <el-link id="editPassword" @click.native="dialogVisible = true">
              <span class="el-icon-edit-outline"/>修改密码
            </el-link>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
    <!--    修改密码-->
    <el-dialog
        title="修改密码"
        :visible.sync="dialogVisible"
        :before-close="leave"
        width="30%">
      <el-form>
          <div> 新密码:
            <div class="editPassword">
              <el-input v-model="password" type="password" :suffix-icon="passwordSuffix"/>
            </div>
          </div>
          <div style="margin-top: 50px;">确认密码:
            <div class="reEditPassword">
              <el-input v-model="repassword" type="password" :suffix-icon="repasswordSuffix"/>
            </div>
          </div>
      </el-form>

      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="modifyPassword">提 交</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import {getCookie, setCookie} from "@/cookie";
import {modify, modifyAvatar, modifyPassword} from "@/api";
import axios from "axios";

export default {
  name: "UserSetting",
  data() {
    return {
      token:'',
      avatar: this.$store.getters.avatar,
      nickname: this.$store.getters.nickname,
      email: this.$store.getters.email,
      mobilePhoneNumber: this.$store.getters.mobilePhoneNumber,
      password: '',
      isEdit: false,
      dialogVisible: false,
      avatarVisible: false,
      repassword: '',
      nicknameSuffix: '',
      passwordSuffix: '',
      repasswordSuffix: '',
      emailSuffix: '',
      mobilePhoneNumberSuffix: '',
      imageUrl: '',
      uploadAvatar: '',
      avatarShow:false
    }
  },
  mounted() {
    let token = getCookie("token")
    this.token = {"token":token}
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(res,file)
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(res.data)
      this.imageUrl = res.data
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isJPG&&!isPNG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt5M) {
        this.$message.error('上传头像图片大小不能超过 5MB!');
      }
      return (isJPG||isPNG) && isLt5M;
    },
    saveAvatar(){
      if (this.imageUrl===''){
        this.$message.error("请选择头像")
        return
      }
      this.NProgress.start()
      modifyAvatar(JSON.stringify({"avatar":this.imageUrl})).then(data=>{
        this.$store.state.avatar = this.imageUrl
        setCookie("avatar",this.imageUrl)
        this.imageUrl = ''
        this.avatarVisible = false
        this.NProgress.done()
        this.$message.success(data.data.msg)
      })
    },

    edit() {
      this.isEdit = true
    },
    back() {
      this.isEdit = false
      this.nickname = getCookie("nickname")
      this.email = getCookie("email")
      this.mobilePhoneNumber = getCookie("mobilePhoneNumber")
    },
    save() {
      let {email,mobilePhoneNumber,nickname} = this
      if (nickname.length > 6 || nickname.length < 2) {
        this.$message.error('请输入2-6位昵称')
        return
      }

      let reg = /^1[3456789]\d{9}$/
      if (!reg.test(this.mobilePhoneNumber)) {
        this.$message.error('请输入正确手机号码')
        return
      }
      this.NProgress.start()
      modify(JSON.stringify({email,mobilePhoneNumber,nickname})).then(data=>{
        this.$message.success(data.data.msg)
        this.isEdit = false
        setCookie("mobilePhoneNumber",this.mobilePhoneNumber)
        setCookie("nickname",this.nickname)
        this.NProgress.done()
      })
    },
    modifyPassword(){
      let {password,repassword} = this
      if (password!==repassword){
        this.$message.error('密码与确认密码不一致')
        return
      }
      this.NProgress.start()
      modifyPassword(JSON.stringify({password})).then(data=>{
        this.$message.success(data.data.msg)
        this.isEdit = false
        this.NProgress.done()
        this.dialogVisible = false
      })
    },
    leave(done) {
      this.$confirm('确认放弃修改？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    }
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
    mobilePhoneNumber() {
      let reg = /^1[3456789]\d{9}$/

      if (reg.test(this.mobilePhoneNumber)) {
        this.mobilePhoneNumberSuffix = 'el-icon-check'
      } else {
        this.mobilePhoneNumberSuffix = 'el-icon-close'
      }
    },
  }
}
</script>

<style scoped>
.center {
  width: 70%;
  margin: auto;
}

.uploadAvatar{
  width: 178px;
  height: 178px;
  margin-left: 150px;
  border-radius: 178px;
}

.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.top {
  position: relative;
  height: 130px;
  width: 100%;
  margin-top: 20px;
  border-radius: 15px;
  background-color: white;
}

.bigAvatar {
  cursor: pointer;
  width: 70px;
  height: 70px;
  margin: 30px 0 0 50px;
  border-radius: 70px;
}

.nickname {
  position: absolute;
  font-size: 27px;
  left: 200px;
  top: 50px;
}

.info {
  margin-top: 30px;
  background-color: white;
  border-radius: 10px;
  width: 100%;
  height: 500px;
}

.baseInfo {
  font-size: 20px;
  font-weight: 600;
  margin-left: 40px;
  padding-top: 20px;
}

.form {
  height: 100%;
  margin-left: 40px;
}

#form {
  font-size: 20px;
}

.editPassword {
  display: inline-block;
  margin-left: 32px;
  width: 200px;
}

.reEditPassword {
  display: inline-block;
  margin-left: 20px;
  width: 200px;
}

#editPassword {
  margin-bottom: 10px;
  margin-left: 20px;
  color: #67C23A
}
</style>