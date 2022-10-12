<template>
  <div class="App">
    <!-- 轮播图组件 -->
    <!-- <Swiper :sliders="$store.state.swiperList" :autoPlay="true"></Swiper> -->
    <!-- 骨架屏组件 -->
    <!-- <Skeleton :animated="true" :width="'400px'" :height="'200px'"></Skeleton> -->
    <keep-alive>
      <router-view />
    </keep-alive>
    <Navigation />

    <!-- <div class="beian"><a href="http://beian.miit.gov.cn">蜀ICP备2022007798号-1</a></div> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // mock轮播图数据
    // this.$store.dispatch('SwiperListAsync')
  }
}
</script>
<style lang="less" scoped>
.App {
  width: 100%;
  height: 100%;
  padding-bottom: 70px;
  box-sizing: border-box;
}
</style>
