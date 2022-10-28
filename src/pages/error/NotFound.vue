<template>
  <div class="_404">
    <h2 class="m-0">抱歉，页面未找到，<span>{{countDown}}</span>s后自动跳转到
      <a href="javascript:" @click="goHome">首页</a>
    </h2>
  </div>

</template>

<script>
export default {
  name: "NotFound",
  data() {
    return {
      countDown: 5
    }
  },
  methods: {
    goHome() {
      this.$router.push('/home')
    }
  },
  created() {
    setInterval(() => {
      if (this.countDown > 0 ){
        this.countDown--
      }else {
        this.$router.push('/home')
        this.countDown=5
      }
    }, 1000)
  }
}

</script>

<style scoped>
._404 {
  width: 30%;
  margin: 5rem auto;
}

._404 img {
  width: 30rem;
}

._404 a {
  color: #010101;
}

._404 a:hover {
  color: skyblue;
}

</style>