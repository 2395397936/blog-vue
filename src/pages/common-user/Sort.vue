<template>
<div style="background-color: white;height: 91%">
    <div class="center">
      <el-tabs v-model="activeName" stretch="stretch">
        <el-tab-pane label="分类" name="first">
          <div class="sort">
            <Category v-for="item in categories" :key="item.id" :avatar="item.avatar"
                     :id="item.id" :title="item.categoryName"/>

            <div style="width: 22%;" v-for="item in (categories.length%4)"></div>
          </div>

        </el-tab-pane>
        <el-tab-pane label="标签" name="second" >
          <div class="sort">
            <Tag v-for="item in tags" :key="item.id" :avatar="item.avatar"
                 :title="item.tagName" :id="item.id"/>
            <div style="width: 22%;" v-for="item in (tags.length%4)"></div>
          </div>

        </el-tab-pane>
      </el-tabs>
    </div>

</div>
</template>

<script>
import Category from "@/components/common/Category";
import Tag from "@/components/common/Tag";
import {getAllTags, getCategories} from "@/api";
export default {
  name: "Sort",
  components: {Category,Tag},
  data() {
    return {
      activeName: 'first',
      tags:[],
      categories:[],
    };
  },
  created() {
    getAllTags().then(data=>{
      this.tags = data.data.data
    })
    getCategories().then(data=>{
      this.categories = data.data.data
    })
  },
  methods: {

  }
}
</script>

<style scoped>
body{
  background-color: white;
}

.center{
  width: 60%;
  margin: auto;
}

.sort{
  display: flex;
  flex-wrap: wrap;
  justify-content:space-evenly;
}


</style>