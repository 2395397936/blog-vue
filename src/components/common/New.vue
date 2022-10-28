<template>
  <div class="border">
    <div class="titleBorder"><span class="title">最新文章</span></div>

    <div class="newArticle" v-for="(item,index) in newArticles" :key="item.id">
      <el-link type="success" @click.native="view(item.id)">{{ item.title }}</el-link>
    </div>

  </div>
</template>

<script>
import {getNewArticles} from "@/api";

export default {
  name: "New",
  data(){
    return{
      newArticles: ''
    }
  },
  methods:{
    view(id){
      let routeData = this.$router.resolve({
        path: '/view/'+this.id
      });
      window.open(routeData.href, '_blank')
    }
  },
  created() {
    getNewArticles().then(data=>{
      this.newArticles = data.data.data
    })
  }
}
</script>

<style scoped>
.border {
  width: 80%;
  height: 220px;
  background-color: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

.title{
  margin-left: 20px;
}

.titleBorder {
  height: 40px;
  width: 100%;
  border-bottom: 1px solid #67C23A;
  font-size: 18px;
  font-weight: 600;
  text-align: left;
  margin: 20px auto 10px;

}

.newArticle {
  max-width: 100%;
  margin-top: 5px;
  margin-left: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>