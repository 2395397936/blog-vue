<template>

  <div id="app">

    <div class="c">
      <router-view style="height: 100%" ></router-view>
      <el-backtop target=".c" :visibility-height="100" ref="backTop"/>
    </div>
  </div>
</template>

<script>
import Home from "@/pages/common-user/Home";

export default {
  name: 'App',
  components: {
    Home,
  },
  mounted() {
    console.log(new Date())
    this.$bus.$on('backTop',() => {

      this.$refs.backTop.scrollToTop();
    })
  },


}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

html, body, #app {
  height: 100%;
  width: 100%;
  background-color: #f4f4f4;
}

#app {
  display: flex;
  height: 100%;
  width: 100%;
}

.c{
  flex: 1;
  overflow: auto;
  height: 100%;
  width: 100%;
  min-width: 1316px;
  min-height: 700px;
}

.isLoading{
  margin-left: 5px;
  margin-top: 5px;
  font-size: 20px;
  font-weight: 500;
}
</style>
