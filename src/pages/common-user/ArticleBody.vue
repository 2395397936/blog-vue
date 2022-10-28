<template>
  <div>
    <div v-show="loading" class="isLoading">正在加载...</div>

    <div class="container" v-show="!loading">
      <h1 class="title">{{title}}</h1>
      <div style="position:relative;">
        <img src="/320.png" alt="" class="avatar">
        <div class="author">{{author}}</div>
        <div class="detail">发布时间：{{createDate}} 阅读 {{ viewCounts }} 评论 {{commentCounts}}</div>
      </div>
      <div class="content">
        <div v-html="md" class="markdown-body"></div>
      </div>
      <div class="classify">
        <div class="col"></div>
        <div class="classifyDetail">所属标签：
          <el-tag type="success" v-for="(item,index) in tags" :size="'small'" @click="searchTag(item.id)" id="tag"
                  @mouseover.native="activeTag($event)" @mouseleave.native="inactiveTag($event)" :key="index">
            {{ item.tagName }}
          </el-tag>
        </div>
      </div>
      <div class="classify">
        <div class="col"></div>
        <div class="classifyDetail">文章分类：
          <el-tag type="success" id="tag"
                  @mouseover.native="activeTag($event)" @mouseleave.native="inactiveTag($event)"  @click="searchCategory(category.id)">
            {{category.categoryName}}
          </el-tag>
        </div>
      </div>
      <div class="comment">
        <img :src="avatar" alt="" class="avatar" v-show="avatar">
        <img src="/320.png" alt="" class="avatar" v-show="!avatar">
        <div class="text">
          <el-input type="textarea" v-model="content" placeholder="你的评论..."></el-input>
        </div>
        <div class="submit"><el-link @click.native="commentArticle">评论</el-link></div>
      </div>
      <div class="allComment">
        {{commentCounts}} 条评论
      </div>
      <el-divider></el-divider>
      <Comment v-for="(item,index) in allComments" :comment="item" :id="id" :getAllComments="getAllComments"></Comment>
      <el-divider></el-divider>

    </div>
  </div>
</template>

<script>
import {getCookie} from "@/cookie";

const {marked} = require('marked')
import 'github-markdown-css';
import Comment from "@/components/common/Comment";
import {comment, getArticleBody, getComments} from "@/api";

export default {
  name: 'ArticleBody',
  components:{Comment},
  data() {
    return {
      id:'',
      md: '',
      title: '',
      category: '',
      tags: [],
      author: '',
      viewCounts: '',
      createDate: '',
      summary: '',
      commentCounts: '',
      avatar: getCookie("avatar"),
      content:'',
      allComments:'',
      loading:true
    }
  },
  methods:{
    searchTag(id) {
      this.$router.push({name:'sortArticles',params:{"by":'tag',id}})
    },
    searchCategory(id) {
      this.$router.push({name:'sortArticles',params:{"by":'category',id}})
    },
    activeTag(event) {
      event.target.classList.remove("el-tag--success")
      event.target.classList.add("el-tag--info")
    },
    inactiveTag() {
      event.target.classList.remove("el-tag--info")
      event.target.classList.add("el-tag--success")
    },
    getAllComments(){
      getComments(this.$route.params.id).then(data=>{
        this.allComments.splice(0,this.allComments.length)
        setTimeout(()=>{
          this.allComments = data.data.data
        })
        this.NProgress.done()
      })
    },
    commentArticle(){
      if (getCookie("token")===null){
        this.$message({
          type: "error",
          message: "请先登录"
        })
        return
      }
      this.NProgress.start()
      comment(JSON.stringify({
        content: this.content,
        parentId: 0,
        articleId: this.id,
        toUid: 0
      })).then(data => {
        this.content = ''
        this.$message({
          type: "success",
          message: data.data.msg
        })
        this.getAllComments()
      })
    }
  },
  mounted() {
    this.NProgress.start()

    getArticleBody(this.$route.params.id).then(data => {
      this.md = marked(data.data.data.body.content)
      this.category = (data.data.data.category)
      this.id = (data.data.data.id)
      this.title = (data.data.data.title)
      this.tags = (data.data.data.tags)
      this.author = (data.data.data.author)
      this.viewCounts = (data.data.data.viewCounts)
      this.createDate = (data.data.data.createDate)
      this.summary = (data.data.data.summary)
      this.commentCounts = (data.data.data.commentCounts)
      this.loading = false
    })
    getComments(this.$route.params.id).then(data=>{
      this.allComments = data.data.data
      this.NProgress.done()
    })

  }
}
</script>

<style lang="css" scoped>
.author{
  font-size: 18px;
  position: absolute;
  top: 10px;
  font-weight: 600;
  left: 60px;
}

.detail{
  position: absolute;
  bottom: 10px;
  left: 60px;
  font-size: 14px;
  font-weight: 300;
}

.title{
  margin-top: 30px;
  margin-bottom: 30px;
}

.avatar {
  width: 50px;
  height: 50px;
  margin-bottom: 5px;
  margin-top: 5px;
  border-radius: 50px;
}

.container {
  width: 60%;
  margin: auto;
}

.content {
  min-width: 800px;
  margin: 0 auto;
  height: 100%;
  box-sizing: border-box;
  padding: 10px 50px;
  background: #fff;

}

.content {
  min-width: 800px;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  box-sizing: border-box;
  padding: 10px 50px;
  background: #fff;
}

.markdown-body {
  padding: 20px;
  min-width: 200px;
  max-width: 900px;
  font-size: 18px;
}

h2 {
  font-size: 21px;
  margin: 1em 0 15px;
  padding-top: 0.8em;
  padding-bottom: 0.8em;
}

h3 {
  font-size: 20px;
  margin: 22px 0 16px;
}

h4 {
  font-size: 19px;
  margin: 20px 0 16px;
}

h5 {
  font-size: 15px;
  margin: 16px 0 16px;
  font-weight: 700;
}

p {
  font-size: 15px;
  line-height: 24px;
  color: #666666;
  margin-top: 0px;
  margin: 8px 0;
  margin: 14px 0 14px;
}

pre {
  background-color: #eee;
  margin-bottom: 8px;
  margin-top: 8px;
  margin: 12px 0 12px;
}

blockquote {
  margin-bottom: 8px;
  margin-top: 8px;
  margin: 14px 0 14px;
  background-color: #eee;
  padding: 16px 16px;
}

tr {
  background-color: #f5f5f5;
}

code {
  background-color: #eee;
}

ul,
ol,
li {
  list-style: unset;
  font-size: 15px;
  line-height: 20px;
  color: #666666;
  margin-top: 0px;
  margin: 8px 0;
}

blockquote {
  border-color: #48b6e2;
}

table {
  display: table;
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
}

.col{
  position: absolute;
  width: 5px;
  height: 100%;
  background-color: #5CB87A;
}

.classify{
  width: 100%;
  position: relative;
  margin-top: 30px;
  line-height: 30px;
  height: 30px
}

.classifyDetail{
  margin-left: 20px;
}

#tag{
  font-size: 15px;
  margin-left: 10px;
  cursor: pointer;
}

.comment{
  margin-top: 40px;
  padding-bottom: 40px;
  position: relative;
}

.text{
  position: absolute;
  right: 0;
  top: 0;
  width: 90%;
}

.submit{
  position: absolute;
  right: 10px;
}
</style>