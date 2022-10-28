<template>
  <div class="border" ref="border" :class="isActive?'active':''">
    <div class="join" @mouseover="active" @mouseleave="inactive" @click="getBody">
      <span class="title">{{ this.title }}</span>
      <span class="viewIcon"><span class="el-icon-view"/></span>
      <span class="view">{{ this.viewCounts }}</span>
      <span class="commentIcon"><span class="el-icon-chat-line-square"></span></span>
      <span class="comment">{{ this.commentCounts }}</span>
      <span class="summary">{{ this.summary }}</span>
    </div>
    <span class="author">{{ author }}</span>
    <div class="tags">
      <div class="tag" v-for="(item,index) in  this.tags" :id="item.id">
        <el-tag type="success" :size="'small'" @click="searchTag(item.id)"
                @mouseover.native="activeTag($event)" @mouseleave.native="inactiveTag($event)" :id="index">
          {{ item.tagName }}
        </el-tag>
      </div>
    </div>
    <span class="date">创建时间:{{ this.createDate }}<br/></span>
  </div>

</template>

<script>

export default {
  name: "Article",
  props: ['id','summary', 'title', 'viewCounts', 'author', 'commentCounts', 'createDate', 'tags', 'weight'],
  data() {
    return {
      isActive: false,
    }
  },
  methods: {
    searchTag(id) {
      this.$router.push({name:'sortArticles',params:{"by":'tag',id}})
      location.reload()
    },
    active() {
      this.isActive = true
    },
    inactive() {
      this.isActive = false
    },
    activeTag(event) {
      event.target.classList.remove("el-tag--success")
      event.target.classList.add("el-tag--info")
    },
    inactiveTag() {
      event.target.classList.remove("el-tag--info")
      event.target.classList.add("el-tag--success")
    },
    getBody(){
      let routeData = this.$router.resolve({
        path: '/view/'+this.id
      });
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style scoped>
.border {

  background-color: white;
  height: 100%;
  width: 100%;
  margin-top: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 8px rgba(0, 0, 0, .04);
  position: relative;
  min-width: 620px;
}

span {
  font-size: 13px;
}

.active {
  box-shadow: 5px 8px 16px rgba(0, 0, 0, .15), 5px 5px 8px rgba(0, 0, 0, .04);
}

.join {
  width: 100%;
  height: 70%;
  cursor: pointer;
}


span {
  position: absolute;
}

.title {
  left: 20px;
  top: 10px;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.viewIcon {
  top: 15px;
  right: 150px;
}

.view {
  top: 15px;
  right: 110px;
  font-size: 12px;
  font-weight: 200;
}

.comment {
  top: 15px;
  right: 50px;
  font-size: 12px;
  font-weight: 200;
}

.commentIcon {
  top: 15px;
  right: 90px;
}

.summary {
  top: 40px;
  left: 20px;
  font-size: 13px;
  font-weight: 500;
  display: block;
  height: 20px;
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.author {
  bottom: 5px;
  left: 20px;
  font-weight: 800;
  font-size: 14px;
  color: #838080;
}

.tags {
  display: block;
  bottom: 21px;
  margin-left: 20px;
}

.tag {
  display: inline-block;
  height: 20px;
  margin-left: 100px;

}

.tag:hover {
  cursor: pointer;
}

.date {
  display: flex;
  bottom: 5px;
  right: 10px;
  font-size: 10px;
  font-weight: 600;
  color: #838080;
}
</style>