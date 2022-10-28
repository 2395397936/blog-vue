<template>
  <div>
    <div v-for="(item,index) in allComments" style="position:relative;margin-top: 10px;">
      <img :src="item.author.avatar" alt="" class="avatar">
      <div class="author">{{item.author.nickname}}
        <span v-if="item.toUser">
          <span style="color: black">回复</span>
        </span>
        <span v-if="item.toUser" class="reply">
          {{'@'+item.toUser.nickname}}
        </span>
      </div>
      <div class="content">{{item.content}}</div>
      <div class="createDate">{{item.createDate}}</div>
      <div class="clickReply"><el-link @click.native="replyFather(item)">回复</el-link></div>
    </div>
  </div>
</template>

<script>
import CommentChildren from "@/components/common/CommentChildren";
export default {
  name: "CommentChildren",
  components: {CommentChildren},
  props: ['comments','reply'],
  data(){
    return{
      allComments:[]
    }
  },
  methods:{
    replyFather(comment){
      this.reply(comment)
    }
  },
  mounted() {
    for (let i = 0; i < this.comments.length; i++) {
      this.allComments.push(this.comments[i])
      if (this.comments[i].children!==null){
        this.allComments=this.allComments.concat(this.comments[i].children)
      }
    }
  }
}
</script>

<style scoped>
.avatar {
  position: absolute;
  display: inline;
  width: 35px;
  height: 35px;
  margin-top: 5px;
  border-radius: 50px;
}

.author{
  color: #5CB87A;
  position: relative;
  top: 0;
  display: inline;
  margin-left: 60px;
}

.content{
  position: relative;
  top: 10px;
  display: inline-block;
  width: 90%;
  margin-left: 60px;
}



.createDate{
  margin-left: 60px;
  margin-top: 10px;
  font-size: 12px;
  font-weight: 400;
  color: #838080;
}

.reply{
  color: #5CB87A;
}

.clickReply{
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>