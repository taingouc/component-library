<template>
  <div class="article-container" ref="scrollContainer" @scroll.passive="handlerScroll">
    <div :style="{ paddingTop: topBlankFill + 'px', paddingBottom: bottomBlankFill + 'px' }">
      <div class="article-item" v-for="item in showDataList" :key="item.id">
        <!-- 新闻左侧标题、评论、来源部分 -->
        <div class="article-left">
          <h3>{{ item.title }}</h3>
          <div class="article-info">
            <div class="info-left">
              <span class="iconfont icon-xiaoxi"></span>
              <span>{{ item.reads }}</span>
              <span>新浪新闻</span>
            </div>
            <div class="info-right">
              <span>{{ item.date }}</span>
            </div>
          </div>
        </div>
        <!-- 新闻右侧图片部分 -->
        <div class="article-right">
          <img :src="item.image" alt="" />
          <!-- <Skeleton :width="'130px'" :height="'79px'" :animated="true"></Skeleton> -->
        </div>
      </div>
      <!-- 请求状态下显示对应提示信息 -->
      <div class="msg" v-if="isRequestStatus">
        <h2>{{ msg }}</h2>
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
      // 请求数据提示信息
      msg: '小二正在努力加载中，请耐心等待...',
      // 屏幕高度变化 最大容积个数
      containSize: 0,
      // 记录滚动后可视区域的第一个元素的索引
      starIndex: 0
      // 定义滚动事件的节流阀
      // scrollThrottle: true
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
      // 滚动时页面第一个元素的索引
      this.starIndex = ~~(this.$refs.scrollContainer.scrollTop / 100)
      // 监听滚动到底部时
      if (this.starIndex + this.containSize > this.newList.length - 1 && !this.isRequestStatus) {
        // 开启加载状态
        this.isRequestStatus = true
        // 设置一秒后发起请求新增数据
        const timer = setTimeout(() => {
          this.getNewsList(10)
          clearTimeout(timer)
        }, 1000)
      }
    }
  },
  computed: {
    ...mapState(['newList']),
    // 计算滚动后可视区域的最后一个元素的索引
    endIndex() {
      let endIndex = this.starIndex + this.containSize
      if (!this.newList[endIndex]) {
        endIndex = this.newList.length - 1
      }
      return endIndex
    },
    // 定义一个待显示的数组列表元素
    showDataList() {
      return this.newList.slice(this.starIndex, this.endIndex)
    },
    // 计算上空白填充的高度
    topBlankFill() {
      return this.starIndex * 100
    },
    // 计算下空白填充的高度
    bottomBlankFill() {
      return (this.newList.length - 1 - this.endIndex) * 100
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
    this.getNewsList(20)
  },
  mounted() {
    // DOM渲染到页面 计算页面最大容积数
    this.getContainSize()
    // 页面缩放 计算页面最大容积数
    window.onresize = this.getContainSize
    // 页面翻转 计算页面最大容积数
    window.orientationchange = this.getContainSize
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
  height: 50px;
  text-align: center;
  line-height: 50px;
}
</style>
