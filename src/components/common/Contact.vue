<template>
  <div class="border">
    <div class="author"><span>Dsg</span></div>
    <div class="getContact" @click="getContact"><img src="/qq.png" alt="联系作者"></div>

  </div>
</template>

<script>
export default {
  name: "Contact",
  methods:{
    getContact(){
      this.$message({
        message: '2395397936',
        center: true,
        duration: 2000,
        iconClass:'el-icon-user'
      });
    }
  }
}
</script>

<style scoped>
.border {
  height: 180px;
  width: 80%;
  background-color: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

.author {
  height: 30%;
  width: 60%;
  border-bottom: 1px solid #67C23A;
  font-size: 25px;
  font-weight: 600;
  text-align: center;
  margin: 20px auto auto;
}

.getContact{
  cursor: pointer;
  margin: 20px auto auto;
  height: 35px;
  width: 35px;
}

img{
  width: 35px;
  height: 35px;
}
</style>