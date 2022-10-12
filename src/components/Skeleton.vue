<template>
  <!-- 骨架屏组件 -->
  <div class="skeleton-container" :style="{ width, height }" :class="{ show: animated }">
    <div class="skeleton-content" :style="{ backgroundColor: bgColor }"></div>
  </div>
</template>

<script>
export default {
  name: 'Skeleton',
  props: {
    // 需要传入宽、高、背景色、是否开启动画
    width: {
      Type: String,
      default: '200px'
    },
    height: {
      Type: String,
      default: '100px'
    },
    bgColor: {
      type: String,
      default: '#efefef'
    },
    animated: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
.skeleton {
  &-container {
    display: inline-block;
    position: relative;
    overflow: hidden;
    vertical-align: middle;
  }
  &-content {
    width: 100%;
    height: 100%;
  }
}
.show {
  &::after {
    content: '';
    position: absolute;
    animation: loading 1.5s ease 0s infinite;
    top: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(to left, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0) 100%);
    transform: skewX(-45deg);
  }
}
@keyframes loading {
  0% {
    left: -100%;
  }
  100% {
    left: 120%;
  }
}
</style>
