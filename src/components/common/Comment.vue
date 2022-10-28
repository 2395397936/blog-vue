<template>
  <div>
    <div style="position:relative;">
      <img :src="comment.author.avatar" alt="" class="avatar">
      <div class="author">{{ this.comment.author.nickname }}</div>
      <div class="content">{{ this.comment.content }}</div>
      <div class="createDate">{{ this.comment.createDate }}</div>
      <div class="clickReply">
        <el-link @click.native="reply(comment)">回复</el-link>
      </div>
      <div style="width: 80%;margin-left: 90px;">
        <CommentChildren :comments="this.comment.children" :reply="reply"></CommentChildren>
      </div>
      <div class="reply" v-show="replyShow">
        <img :src="comment.author.avatar" alt="" class="avatar">
        <div class="replyContent">
          <el-input :placeholder="'回复@'+toUser+'：'" v-model="content"></el-input>
        </div>
        <div class="submit">
          <el-button type="primary" @click.native="submit()">发布</el-button>
        </div>
      </div>
      <el-divider/>
    </div>
  </div>
</template>

<script>
import CommentChildren from "@/components/common/CommentChildren";
import {comment} from "@/api";
import {getCookie} from "@/cookie";

export default {
  name: "Comment",
  components: {CommentChildren},
  props: ['id', 'comment', 'getAllComments'],
  data() {
    return {
      replyShow: false,
      toUser: '',
      content: '',
      currentComment: ''
    }
  },
  methods: {
    reply(comment) {
      this.replyShow = !this.replyShow
      this.toUser = comment.author.nickname
      this.currentComment = comment
    },
    submit() {
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
        parentId: this.currentComment.id,
        articleId: this.id,
        toUid: this.currentComment.author.id
      })).then(data => {
        this.content = ''
        this.$message({
          type: "success",
          message: data.data.msg
        })
        this.getAllComments()
        this.replyShow = !this.replyShow
      })

    }
  },
}
</script>

<style scoped>
.avatar {
  position: absolute;
  display: inline;
  width: 50px;
  height: 50px;
  margin-top: 5px;
  border-radius: 50px;
}

.author {
  position: relative;
  top: 0;
  display: inline;
  color: #5CB87A;
  margin-left: 90px;
}

.content {
  position: relative;
  top: 10px;
  display: inline-block;
  width: 90%;
  margin-left: 90px;
}


.createDate {
  margin-left: 90px;
  margin-top: 10px;
  font-size: 12px;
  font-weight: 400;
  color: #838080;
}

.clickReply {
  position: absolute;
  right: 0;
}

.reply {
  position: relative;
  height: 40px;
  margin-top: 20px;
  padding-bottom: 20px;
}

.replyContent {
  position: absolute;
  width: 80%;
  top: 10px;
  margin-left: 90px;
}

.submit {
  position: absolute;
  right: 0;
  top: 10px;
}
</style>