<template>
  <div class="main">
    <!-- 轮播图组件 -->
    <!-- <Swiper :sliders="$store.state.swiperList" :autoPlay="true"></Swiper> -->
    <!-- 骨架屏组件 -->
    <!-- <Skeleton :animated="true" :width="'400px'" :height="'200px'"></Skeleton> -->
    <!-- 新闻长列表组件 -->
    <Article></Article>
    <div class="beian"><a href="http://beian.miit.gov.cn">蜀ICP备2022007798号-1</a></div>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {},
  mounted() {
    // mock轮播图数据
    // this.$store.dispatch('SwiperListAsync')
  }
}
</script>
<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
}
.beian {
  text-align: center;
  a {
    color: #ccc;
  }
}
</style>
