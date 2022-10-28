<template>
<div class="border">
  <div class="enter" @click="enter">

    <img :src="avatar" alt="" class="icon">
    <div class="title">{{title}}</div>
  </div>
  <div class="article">文章</div>
</div>
</template>

<script>
export default {
  name: "Category",
  props:['title','avatar','id'],
  methods:{
    enter(){
      this.$router.push({path:'sort/sortArticles/category/'+this.id})
    }
  }
}
</script>

<style scoped>
.border{
  border: 1px solid #cecbcb;
  position: relative;
  width: 22%;
  height: 180px;
  margin-top: 25px;
}

.enter{
  width: 100%;
  height: 120px;
  cursor: pointer;
}

.icon{
  position: absolute;
  left: 65px;
  top: -20px;
}

.title{
  font-size: 23px;
  font-weight: 500;
  width: 100%;
  position: absolute;
  top: 60px;
  text-align: center;
}

.enter:hover > .title{
  color: #5CB87A;
}

.article{
  font-size: 12px;
  color: #838080;
  width: 100%;
  margin-top: 20px;
  text-align: center;
}

img{
  height: 70px;
  width: 70px;
}
</style>