<template>
  <div>
    <div v-show="uploading">正在发布...</div>
    <div class="markdown" v-show="!uploading">
      <mavonEditor v-model="articleDetail.content" :hljs="false" ref=md
                   @imgAdd="$imgAdd" @imgDel="$imgDel" @save="$save"></mavonEditor>

      <el-dialog title="文章信息" :visible.sync="dialogFormVisible">
        <el-form v-model="articleDetail">
          <el-form-item label="文章标题" :label-width="formLabelWidth">
            <el-input v-model="articleDetail.title" placeholder="请输入文章标题"></el-input>
          </el-form-item>
          <el-form-item label="文章分类" :label-width="formLabelWidth">
            <el-select v-model="articleDetail.categoryId" placeholder="请选择文章分类">
              <el-option v-for="(item,index) in categories" :label="item.categoryName" :value="item.id"
                         :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="文章概述">
            <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入文章概括"
                v-model="articleDetail.summary">
            </el-input>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="文章标签">
            <el-checkbox-group
                v-model="articleDetail.tags"
                :max="3">
              <el-checkbox v-for="tag in tags" :label="tag" :key="tag.id">{{ tag.tagName }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click.native="submit">提 交</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import {mavonEditor} from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import axios from "axios";
import {getAllTags, getCategories, publish} from "@/api";
import {getCookie} from "@/cookie";

export default {
  name: "Write",
  components: {
    mavonEditor
  },
  data() {
    return {
      articleTags: [],
      files: [],
      articleDetail: {
        content: '',
        tags: [],
        title: '',
        summary: '',
        categoryId: '',
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
      checkedCities: [],
      categories: [],
      tags: [],
      img_file: [],
      uploading: false
    }
  },
  methods: {
    $imgAdd(pos, $file) {
      // 缓存图片信息
      // this.$set($file,'isDelete',0)
      this.img_file[pos] = $file;
      this.$set(this.img_file[pos], 'isDelete', 0)
    },
    $imgDel(file) {
      this.img_file[file[0]].isDelete = 1
    },
    $save() {
      if (!this.articleDetail.content) {
        this.$message.error("请输入内容")
        return
      }
      getCategories().then(data => {
        this.categories = data.data.data
      })
      getAllTags().then(data => {
        this.tags = data.data.data
      })
      this.dialogFormVisible = true
    },
    async uploadimg() {
      // 第一步.将图片上传到服务器.

      let pos = 1
      for (let i = 1; i < this.img_file.length; i++) {
        if (this.img_file[i].isDelete === 0) {
          let formData = new FormData();
          formData.append('file', this.img_file[i]);
          await axios({
            url: 'http://localhost:8222/oss/fileUpload',
            method: 'post',
            data: formData,
            headers: {'Content-Type': 'multipart/form-data', 'token': getCookie("token")},
          }).then((data) => {
            console.log(pos + "--" + 1)
            // this.$refs.md.$img2Url(1, 'https://blog-pys.oss-cn-hangzhou.aliyuncs.com/56023e18855145e7b98a6c782eccf832-1581051769315.jpeg');
            this.$refs.md.$img2Url(pos, data.data.data);
            pos++
          })
        }
      }

    },

    submit() {
      let {content, tags, title, summary, categoryId,} = this.articleDetail
      if (!(content&&tags&&title&&summary&&categoryId)){
        this.$message.error("请输入完整内容")
        return
      }
      this.uploading = true
      this.NProgress.start()
      this.uploadimg().then(data => {
        publish(JSON.stringify(this.articleDetail)).then(data => {
          this.$router.push("/home/1")
          location.reload()
          let routeData = this.$router.resolve({
            path: '/view/'+data.data.msg
          });
          window.open(routeData.href, '_blank')
          this.$message.success({
            message: "发布成功！"
          })
          this.NProgress.done()
        })
      })

    }
  }
}
</script>

<style scoped>

</style>