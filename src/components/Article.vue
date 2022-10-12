<template>
  <div class="article-container" ref="scrollContainer" @scroll.passive="handlerScroll">
    <div :style="blankFillStyle">
      <router-link to="/info">
        <div class="article-item" v-for="item in showDataList" :key="item.id">
          <!-- 新闻左侧标题、评论、来源部分 -->
          <div class="article-left">
            <h3>{{ item.title }}</h3>
            <div class="article-info">
              <div class="info-left">
                <span class="iconfont icon-xiaoxi"></span>
                <span>{{ item.reads }}</span>
                <span>小柯快报</span>
              </div>
              <div class="info-right">
                <span>{{ item.date }}</span>
              </div>
            </div>
          </div>
          <!-- 新闻右侧图片部分 -->
          <div class="article-right">
            <img :src="item.image" alt="" v-if="!isRequestStatus" />
            <Skeleton v-else :width="'130px'" :height="'79px'" :animated="true"></Skeleton>
          </div>
        </div>
      </router-link>

      <!-- 请求状态下显示对应提示信息 -->
      <div class="msg" v-if="isRequestStatus">
        <span style="--i: 1">小</span>
        <span style="--i: 2">柯</span>
        <span style="--i: 3">正</span>
        <span style="--i: 4">在</span>
        <span style="--i: 5">努</span>
        <span style="--i: 6">力</span>
        <span style="--i: 7">加</span>
        <span style="--i: 8">载</span>
        <span style="--i: 9">中</span>
        <span style="--i: 10">.</span>
        <span style="--i: 11">.</span>
        <span style="--i: 12">.</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Article',
  data() {
    return {
      // 数据请求状态
      isRequestStatus: true,
      // 屏幕高度变化 最大容积个数
      containSize: 0,
      // 记录滚动后可视区域的第一个元素的索引
      starIndex: 0,
      // 定义滚动事件的节流阀
      // scrollThrottle: true
      // 使用keep-alive缓存组件后记录当前滚动距离顶部的位移
      currentScrollTop: 0
    }
  },
  methods: {
    // 获取分页的数据
    getNewsList(num) {
      // mock新闻资讯数据
      this.$store.dispatch('NewsListAsync', num)
    },
    // 计算屏幕高度变化后 最大容积数
    getContainSize() {
      this.containSize = ~~(this.$refs.scrollContainer.offsetHeight / 100) + 2
    },
    // 定义滚动行为事件方法 监听被卷去的高度盒子要加 overflow-y: auto
    handlerScroll() {
      // 每次滚动都会触发这个事件：有两种解决方案来实现节流效果
      // 1、使用节流阀+定时器
      // if (this.scrollThrottle) {
      //   // 关闭节流阀
      //   this.scrollThrottle = false
      //   // 执行滚动事件具体的逻辑业务
      //   this.setScroll()
      //   // 设置定时器，30ms后打开节流阀,如果间隔太长，会出现白屏
      //   const scrollTimer = setTimeout(() => {
      //     this.scrollThrottle = true
      //     clearTimeout(scrollTimer)
      //   }, 30)
      // }
      // 2、使用requestAnimationFrame动画帧来实现
      // 实现浏览器兼容
      const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame
      // 每秒钟QQ浏览器fps为32.8、Firefox平均fps为50.61、Chrome fps为52.2、Edge fps为59.4
      // 计算每一帧所花费的时间单位ms，兼容浏览器和手机，用最小帧数30
      const interval = 1000 / 30
      // 获取之前时间戳
      let old = Date.now()
      requestAnimationFrame(() => {
        // 获取当前时间戳
        const now = Date.now()
        // 执行滚动时具体的事件逻辑
        this.setScroll()
        // 如果新的时间戳减旧时间戳大于每一帧所花费的时间，调用递归再去执行，确保上一帧渲染到了页面
        if (now - old >= interval) {
          // 将旧的时间戳赋值为当前新时间戳，调用递归
          old = now
          requestAnimationFrame(arguments)
        }
      })
    },
    // 滚动时具体的事件逻辑
    setScroll() {
      // 记录滚动距离顶部的位移
      this.currentScrollTop = this.$refs.scrollContainer.scrollTop
      // 滚动时页面第一个元素的索引
      this.starIndex = ~~(this.$refs.scrollContainer.scrollTop / 100)
      // 监听滚动到底部时
      if (this.starIndex + this.containSize > this.newList.length - 1 && !this.isRequestStatus) {
        // 开启加载状态
        this.isRequestStatus = true
        // 设置一秒后发起请求新增数据
        const timer = setTimeout(() => {
          this.getNewsList(22)
          clearTimeout(timer)
        }, 1500)
      }
    }
  },
  computed: {
    ...mapState(['newList']),
    // 计算滚动后可视区域的最后一个元素的索引
    endIndex() {
      let endIndex = this.starIndex + this.containSize * 2
      if (!this.newList[endIndex]) {
        endIndex = this.newList.length - 1
      }
      return endIndex
    },
    // 定义一个待显示的数组列表元素
    showDataList() {
      let TopIndex = 0
      if (this.starIndex <= this.containSize) {
        TopIndex = 0
      } else {
        TopIndex = this.starIndex - this.containSize
      }
      return this.newList.slice(TopIndex, this.endIndex)
    },
    // 计算上下空白填充的高度
    blankFillStyle() {
      let TopIndex = 0
      if (this.starIndex <= this.containSize) {
        TopIndex = 0
      } else {
        TopIndex = this.starIndex - this.containSize
      }
      return {
        paddingTop: TopIndex * 100 + 'px',
        paddingBottom: (this.newList.length - 1 - this.endIndex) * 100 + 'px'
      }
    }
  },
  watch: {
    // 监听新闻数据变化，修改加载状态
    newList: {
      handler(newVal) {
        if (newVal.length > 0) {
          this.isRequestStatus = false
        }
      },
      immediate: true
    }
  },
  created() {
    // 页面一进入需要获取数据
    this.getNewsList(22)
  },
  mounted() {
    // DOM渲染到页面 计算页面最大容积数
    this.getContainSize()
    // 页面缩放 计算页面最大容积数
    window.onresize = this.getContainSize
    // 页面翻转 计算页面最大容积数
    window.orientationchange = this.getContainSize
  },
  // 路由keep-alive,可以调用activated这个生命周期
  activated() {
    this.$nextTick(() => {
      this.$refs.scrollContainer.scrollTop = this.currentScrollTop
    })
  }
}
</script>

<style lang="less" scoped>
.article {
  &-container {
    height: 100%;
    min-width: 355px;
    overflow-y: auto;
  }
  &-item {
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    padding: 10px 10px;
    display: flex;
    border-bottom: 1px solid #d9d9d9;
    &:active {
      background-color: #ccc;
    }
  }
  &-left {
    flex: 1;
    padding-right: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h3 {
      letter-spacing: 3px;
      font-size: 14px;
    }
  }
  &-right {
    width: 130px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &-info {
    display: flex;
    justify-content: space-between;
    color: #9c9c9c;
    font-weight: 700;
    .info-left {
      span {
        margin-right: 5px;
        font-size: 12px;
      }
    }
    .info-right {
      font-size: 12px;
    }
  }
}
.msg {
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  position: relative;
  span {
    margin-right: 2px;
    position: relative;
    display: inline-block;
    text-shadow: 1px 0px #333;
    text-transform: uppercase;
    animation: animate 1s ease-in-out infinite;
    animation-delay: calc(0.1s * var(--i));
  }
}
@keyframes animate {
  0% {
    transform: translateY(0px);
  }
  20% {
    transform: translateY(-10px);
  }
  40%,
  100% {
    transform: translateY(0px);
  }
}
</style>
