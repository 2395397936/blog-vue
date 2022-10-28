<template>
  <div class="border">
    <div v-show="!loading" class="isLoading">正在加载...</div>
    <div class="center" v-show="loading">
      <div class="seat1">
        <div style="position:fixed;">
          <div class="yearAndMonth">
            <el-row>
              <div class="monthDetail" v-for="(item,index) in this.monthAndYear" :id="index">
                <el-badge :value="item.count" class="item" type="primary" @click.native="getByYearAndMonth($event)">
                  <el-button>{{ item.year }}年{{ item.month }}月</el-button>
                </el-badge>
              </div>
            </el-row>
          </div>

        </div>
      </div>

      <div class="seat4" style="height: 100%">
        <div style="display: flex;height: 100%;flex-direction: column">
          <div class="articles">
            <div class="head" ref="head">全部文章</div>
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
                  <br/>已经到底啦
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getArchive, getArticles,getByYearAndMonth} from '@/api'
import Article from "@/components/common/Article";

export default {
  name: "Archive",
  components: {Article},
  data() {
    return {
      monthAndYear: '',
      page: 1,
      pageSize: 5,
      articles: [],
      total: 0,
      loading: false,
      isBottom: false
    }
  },
  methods: {
    // 请求具体数据
    getArticle(page = 1) {
      this.page = page
      getArticles(JSON.stringify({page: this.page, pageSize: this.pageSize})).then((data => {
        this.articles = this.articles.concat(data.data.data)
        if (data.data.data.length<5){
          this.isBottom=true
        }
        this.loading = true
      })).catch(error => {
        console.log(error)
      })
    },
    // 下滑请求数据
    load() {
      this.page = this.page + 1
      this.getArticle(this.page)
    },
    // 查询具体日期
    getByYearAndMonth(event){
      this.loading=false
      let year = event.target.innerText.substr(0,4)
      let month = event.target.innerText.substring(5).replace("月","")
      getByYearAndMonth(JSON.stringify({year: year, month: month,count:null})).then((data => {
        this.articles = data.data.data
        this.$refs.head.innerHTML = event.target.innerText
        this.loading = true
        // 回到顶部
        this.$bus.$emit('backTop')
      })).catch(error => {
        console.log(error)
      })
    },
  },
  mounted() {
    getArchive().then((data => {
      this.monthAndYear = data.data.data
    })).catch(error => {
      console.log(error)
    })
    this.getArticle()
  }
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

.articles {
  margin-top: 60px;
  height: 100%;
}

.article {
  height: 100px;
  width: 80%;
}

.seat1 {
  margin-top: 40px;
  flex: 1;
  text-align: center;
}

.monthDetail {
  margin-top: 20px;
  margin-bottom: 10px;
}

.yearAndMonth {
  width: 200%;
  background-color: white;
}

.seat4 {
  flex: 3;
}

.head {
  font-size: 18px;

}
</style>