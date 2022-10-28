<template>
  <div style="height: 90%;overflow: hidden;width: 100%;">
    <div v-if="!loading" class="isLoading">正在加载...</div>
    <div class="center" v-if="loading">
      <div style="display: flex;height: 100%;flex-direction: column">
        <div class="articles">
          <div class="article">
            <Article v-for="(item) in articles" :key="item.id"
                     :id="item.id"
                     :summary="item.summary"
                     :title="item.title"
                     :viewCounts="item.viewCounts"
                     :author="item.author"
                     :commentCounts="item.commentCounts"
                     :createDate="item.createDate"
                     :tags="item.tags"
                     :weight="item.weight"/>
          </div>
        </div>
        <div class="page">
          <el-pagination
              @current-change="getArticle"
              background
              :current-page.sync="page"
              :page-size="pageSize"
              layout="prev, pager, next, jumper"
              :total="total">
          </el-pagination>
        </div>
      </div>

      <div class="other">
        <Contact class="contact"/>
        <New class="new"/>
      </div>
    </div>
  </div>

</template>

<script>
import {getArticles, getArticleCount} from "@/api";
import Article from "@/components/common/Article";
import New from "@/components/common/New";
import Contact from "@/components/common/Contact";

export default {
  name: "Home",
  components: {Contact, New, Article},
  data() {
    return {
      page: 1,
      pageSize: 5,
      articles: [],
      total: 5,
      loading: false,
    }
  },
  methods: {
    getArticle(page = 1) {
      this.NProgress.start()
      this.$router.push('/home/' + this.page)

      this.page = page
      this.page = this.$route.params.page
      getArticles(JSON.stringify({"page": this.page, "pageSize": this.pageSize})).then((data => {
        this.articles = data.data.data
        this.loading = true
        this.NProgress.done()
      }))
    }
  },
  beforeMount() {
    this.page = this.$route.params.page
    this.$router.push('/home/' + this.$route.params.page)
  },
  mounted() {
    getArticleCount().then((data => {
      this.total = data.data.data
    }))

    this.getArticle()
  }
}
</script>

<style scoped>


.center {
  width: 70%;
  margin: auto;
  height: 95%;
  position: relative;
  display: flex;
}

.articles {
  flex: 160;
  display: flex;
  flex-direction: column;
  position: relative;
}

.article {
  height: 17%;
}

.other {
  flex: 2;
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-shrink: 0;
}

.contact {
  margin-left: 10%;
  margin-top: 15px;
}

.new {
  margin-left: 10%;
  margin-top: 15px;

}

.page {
  margin-left: 10%;
  flex: 1;

}
</style>