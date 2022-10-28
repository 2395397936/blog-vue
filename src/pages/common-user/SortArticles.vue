<template>
  <div class="border">
    <div v-show="!loading" class="isLoading">正在加载...</div>
    <div v-show="loading">
      <div class="header">
        <img :src="avatar" alt="" class="icon">
        <div class="title">{{ title }}</div>
        <div style="text-align: center;margin-top: 10px;font-size: 12px;font-weight: 400;color:#aba6a6;">文章</div>
      </div>
      <div class="center" v-show="loading">

        <div class="seat4" style="height: 100%">
          <div style="display: flex;height: 100%;flex-direction: column">
            <div class="articles">
              <ul class="infinite-list" style="height: 100%;"
                  v-infinite-scroll="load"
                  infinite-scroll-distance="5"
                  :infinite-scroll-disabled="isBottom">

                <div class="article">
                  <Article v-for="(item,index) in articles" :key="item.id"
                           :id="item.id"
                           :summary="item.summary"
                           :title="item.title"
                           :viewCounts="item.viewCounts"
                           :author="item.author"
                           :commentCounts="item.commentCounts"
                           :createDate="item.createDate"
                           :tags="item.tags"
                           :weight="item.weight"/>
                  <div v-show="isBottom" style="height: 60px;width: 100%;text-align: center">
                    <br/>
                    <div style="margin-left: 120px;">已经到底啦</div>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { getByTagOrCategory,getTagOrCategoryById} from '@/api'
import Article from "@/components/common/Article";

export default {
  name: "SortArticles",
  components: {Article},
  data() {
    return {
      avatar:'',
      title:'',
      monthAndYear: '',
      page: 1,
      pageSize: 5,
      articles: [],
      total: 0,
      loading: false,
      isBottom: false,
      by:'',
      id:''
    }
  },
  created() {
    this.by = this.$route.params.by
    if (this.by==='tag'){
      this.by = 'Tag'
    }
    if (this.by==='category'){
      this.by = 'Category'
    }
    this.id = this.$route.params.id
  },
  methods: {
    // 请求具体数据
    getArticle(page = 1) {
      this.page = page
      getByTagOrCategory(this.by,this.id,JSON.stringify({page: this.page, pageSize: this.pageSize})).then((data => {
        this.articles = this.articles.concat(data.data.data)
        if (data.data.data.length<5){
          this.isBottom=true
        }
        this.loading = true
      }))
    },
    // 下滑请求数据
    load() {
      this.page = this.page + 1
      this.getArticle(this.page)
    },

  },
  mounted() {
    this.by = this.$route.params.by
    if (this.by==='tag'){
      this.by = 'Tag'
    }
    if (this.by==='category'){
      this.by = 'Category'
    }
    this.id = this.$route.params.id
    getTagOrCategoryById(this.by,this.id).then((data)=>{
      if (data.data.data===null){
        this.$router.push({name:'notFound'})
      }
      console.log(data.data.data.avatar)
      this.avatar = data.data.data.avatar
      this.title = Object.values(data.data.data)[2]

    })
    this.getArticle()
  },
  watch: {
    '$route'() {
      // 若路由产生变换（退出或提交成功切换回上一页时），将页面数据重置为初始值
      location.reload()
      // 此处别忘了加上created里需要执行的请求，因为在keep-alive的单页面中切换路由不会执行created钩子

    }
  },

}
</script>

<style scoped>
.border {
  height: 100%;
}

.center {
  width: 70%;
  margin: auto;
  height: 100%;
  position: relative;
  display: flex;
}

.header{
  background-color: white;
  height: 150px;
  width: 100%;
  margin-top: 20px;
}

.icon{
  height: 60px;
  width: 60px;
  margin-top: 10px;
  margin-left: 48%;
}

.title{
  margin-top: 10px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
}

.articles {
  height: 100%;
  width: 60%;
  margin: auto;
}

.article {
  height: 100px;
  width: 80%;
}

.seat4 {
  flex: 3;
}
</style>