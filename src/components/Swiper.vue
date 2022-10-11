<template>
  <div class="swiper-container" :style="{ width, height }" @mouseenter="stop()" @mouseleave="start()">
    <!-- 轮播图容器 -->
    <ul class="swiper-body">
      <li class="swiper-item" v-for="(item, i) in sliders" :key="i" :class="{ show: index === i }">
        <RouterLink to="/">
          <img :src="item.image_url" alt="" class="swiper-image" />
        </RouterLink>
      </li>
    </ul>
    <!-- 左按钮 -->
    <a href="javascript:;" class="swiper-btn prev" @click="change(-1)">
      <i class="iconfont icon-angle-left"></i>
    </a>
    <!-- 右按钮 -->
    <a href="javascript:;" class="swiper-btn next" @click="change(1)">
      <i class="iconfont icon-angle-right"></i>
    </a>
    <!-- 指示圆点 -->
    <div class="swiper-indicator">
      <span v-for="(item, i) in sliders" :key="i" :class="{ active: index === i }" @click="index = i"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Swiper',
  props: {
    // 轮播图盒子宽度
    width: {
      Type: String,
      default: '600px'
    },
    // 轮播图盒子高度
    height: {
      Type: String,
      default: '300px'
    },
    // 轮播图数据
    sliders: {
      Type: Array,
      default: null
    },
    // 控制是否自动轮播
    autoPlay: {
      type: Boolean,
      default: false
    },
    // 轮播切换时长
    duration: {
      type: Number,
      default: 2000
    }
  },
  data() {
    return {
      // 轮播图索引
      index: 0,
      // 定时器
      timer: null
    }
  },
  methods: {
    // 定时器函数
    autoPlayFn() {
      clearInterval(this.timer)
      // 设置定时器自动播放
      this.timer = setInterval(() => {
        this.index++
        if (this.index >= this.sliders.length) {
          this.index = 0
        }
      }, this.duration)
    },
    // 鼠标移动到轮播图暂停计时器
    stop() {
      clearInterval(this.timer)
    },
    // 鼠标离开轮播图继续计时器
    start() {
      this.autoPlayFn()
    },
    // 点击按钮切换
    change(val) {
      let resIndex = this.index + val
      if (resIndex > this.sliders.length - 1) {
        resIndex = 0
      }
      if (resIndex < 0) {
        resIndex = 3
      }
      this.index = resIndex
    }
  },
  watch: {
    // 监听轮播图数据变化
    sliders: {
      handler(newVal) {
        if (newVal.length && this.autoPlay) {
          this.autoPlayFn()
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.swiper {
  &-container {
    position: relative;
    &:hover {
      .swiper-btn {
        opacity: 1;
      }
    }
  }
  &-item {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: all 0.5s linear;
    &.show {
      opacity: 1;
    }
  }
  &-image {
    height: 100%;
    width: 100%;
  }
  &-btn {
    width: 44px;
    height: 44px;
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 2;
    text-align: center;
    line-height: 44px;
    opacity: 0;
    transition: 0.1s linear;
    &.prev {
      left: 20px;
    }
    &.next {
      right: 20px;
    }
    &:hover {
      background: rgba(0, 0, 0, 0.3);
      color: rgba(0, 0, 0, 0.8);
    }
    &:active {
      transform: scale(1.1) translate(0, -50%);
    }
  }
  &-indicator {
    position: absolute;
    left: 0;
    bottom: 8%;
    z-index: 2;
    width: 100%;
    text-align: center;
    span {
      display: inline-block;
      width: 12px;
      height: 12px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 50%;
      cursor: pointer;
      ~ span {
        margin-left: 12px;
      }
      &.active {
        background: #fff;
      }
    }
  }
}
</style>
