<template>
  <div class="center">
    <div v-show="articles.length===0" style="text-align: center">您还没有文章</div>
    <div v-for="item in articles" v-show="articles.length!==0">
      <div class="border">
        <div class="createDate">{{ item.createDate }}</div>
        <div class="title">{{ item.title }}</div>
        <div class="summary">{{ item.summary }}</div>
        <div class="options">
          <el-link @click.native="edit(item.id)">编辑</el-link>
          <el-link @click="view(item.id)">查看</el-link>
          <el-dropdown trigger="click">
            <el-link class="el-dropdown-link"><i class="el-icon-more"></i></el-link>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="deleteArticle(item.id)">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!--          <el-link><p class=""></p></el-link>-->
        </div>
        <div class="data">
          <div class="read">阅读 {{ item.viewCounts }}</div>
          <div class="comment">评论 {{ item.commentCounts }}</div>
        </div>


      </div>
      <el-divider/>
    </div>
    <div style="width: 100%; text-align: center;height: 50px;" v-show="articles.length!==0">
      已经到底啦
    </div>
  </div>
</template>

<script>
import {deleteArticle, getArticleBody, getSelfArticle} from "@/api";

export default {
  name: "ArticleManage",
  data() {
    return {
      articles: [],

    }
  },
  created() {
    getSelfArticle().then(data => {
      this.articles = data.data.data
    })
  },
  methods: {
    view(id) {
      let routeData = this.$router.resolve({
        path: '/view/' + id
      });
      window.open(routeData.href, '_blank')
    },
    edit(id) {
      let routeData = this.$router.resolve({
        path: '/edit/' + id
      });
      window.open(routeData.href, '_blank')    },
    deleteArticle(id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(id).then(data => {
          getSelfArticle().then(data => {
            this.articles = data.data.data
          })
          this.$message({
            type: 'success',
            message: data.data.msg
          });
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>

<style scoped>
.center {
  background-color: white;
  width: 60%;
  margin: 20px auto auto;
}

.border {
  height: 150px;
  width: 100%;
  position: relative;
  background-color: white;
}

.createDate {
  position: absolute;
  top: 20px;
  right: 20px;
  font-weight: 400;
  font-size: 17px;
  color: #a9a7a7;
}

.title {
  position: absolute;
  top: 20px;
  margin-left: 20px;
  font-weight: 600;
  font-size: 20px;
  width: 40%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.summary {
  position: absolute;
  top: 70px;
  font-size: 15px;
  font-weight: 500;
  height: 20px;
  margin-left: 20px;
  width: 40%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.options {
  position: absolute;
  right: 20px;
  bottom: 10px;
}

a {
  font-size: 16px;
  font-weight: 500;
  margin-left: 25px;
}

.data {
  font-weight: 300;
  font-size: 13px;
  position: absolute;
  bottom: 10px;
  left: 20px;
}

.read {
  display: inline-block;
  margin-right: 20px;
}

.comment {
  display: inline-block;
}
</style>