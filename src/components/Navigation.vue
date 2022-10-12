<template>
  <!-- 底部导航组件 -->
  <div>
    <div class="footerNav-container">
      <ul @click="getIndex">
        <li class="footerNav-item" data-index="0">
          <a href="#">
            <i class="iconfont icon-xinwen" :class="{ active: index == 0 }"></i>
            <span class="text" :class="{ show: index == 0 }">News</span>
          </a>
        </li>
        <li class="footerNav-item" data-index="1">
          <a href="#">
            <i class="iconfont icon-wode" :class="{ active: index == 1 }"></i>
            <span class="text" :class="{ show: index == 1 }">Profile</span>
          </a>
        </li>
        <li class="footerNav-item" data-index="2">
          <a href="#">
            <i class="iconfont icon-xinxi" :class="{ active: index == 2 }"></i>
            <span class="text" :class="{ show: index == 2 }">Messages</span>
          </a>
        </li>
        <li class="footerNav-item" data-index="3">
          <a href="#">
            <i class="iconfont icon-youxi" :class="{ active: index == 3 }"></i>
            <span class="text" :class="{ show: index == 3 }">Game</span>
          </a>
        </li>
        <li class="footerNav-item" data-index="4">
          <a href="#">
            <i class="iconfont icon-shezhi" :class="{ active: index == 4 }"></i>
            <span class="text" :class="{ show: index == 4 }">Setting</span>
          </a>
        </li>
        <div class="footerNav-SphereModel" :style="{ width: oneNavWidth + 'px', left: index * oneNavWidth + 'px' }">
          <div class="footerNav-indicator"></div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      // 点击导航索引，默认第一个导航被点击
      index: 0,
      // 动态计算每个导航按钮的宽度，用以在不同视口下切换,默认为65
      oneNavWidth: 65
    }
  },
  methods: {
    // 用户点击导航按钮获取索引
    getIndex(e) {
      // li中层级嵌套很深，而e.target获取的元素是最深层的那个元素 而这里我们需要点击到li上
      const arr = e.composedPath().filter((item) => item.nodeName === 'LI' && item.className === 'footerNav-item')
      if (arr.length) {
        this.index = Number(arr[0].dataset.index)
        if (this.index === 0) {
          this.$router.push('/news')
        } else if (this.index === 1) {
          this.$router.push('/profile')
        } else if (this.index === 2) {
          this.$router.push('/messages')
        } else if (this.index === 3) {
          this.$router.push('/game')
        } else if (this.index === 4) {
          this.$router.push('/setting')
        }
      }
    },
    // 根据当前视口宽度获取每个导航按钮的宽度
    getOneNavWidth() {
      this.$nextTick(() => {
        this.oneNavWidth = (document.documentElement.clientWidth - 50) / 5
      })
    }
  },
  mounted() {
    this.getOneNavWidth()
    // 页面缩放 计算每个导航按钮的宽度
    window.addEventListener('resize', () => {
      this.getOneNavWidth()
    })
    // window.onresize = this.getOneNavWidth
    // 页面翻转 计算每个导航按钮的宽度
    window.addEventListener('orientationchange', () => {
      this.getOneNavWidth()
    })
    // window.orientationchange = this.getOneNavWidth
  }
}
</script>

<style lang="less" scoped>
@font-face {
  font-family: Extralight;
  src: url('@/assets/PoppinsExtralight-6Je1.otf');
}
.footerNav {
  &-container {
    width: 100%;
    height: 70px;
    min-width: 300px;
    position: fixed;
    bottom: 0;
    background: #e4dccf;
    border-radius: 10px 10px 0 0;
    font-family: Extralight;
    text-align: center;
    box-sizing: border-box;
    padding: 0 25px;
    ul {
      position: relative;
      display: flex;
      height: 100%;
    }
  }
  &-item {
    flex: 1;
    height: 100%;
    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      font-weight: 500;
      .iconfont {
        z-index: 1;
        display: block;
        font-size: 2em;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 70px;
        color: #393939;
        transition: all 0.5s linear;
        &.active {
          transform: translateY(-34px) scale(1.2);
        }
      }
      .text {
        position: absolute;
        letter-spacing: 2px;
        font-weight: 700;
        transform: translateY(20px) scale(0.5);
        opacity: 0;
        transition: all 0.5s linear;
        &.show {
          opacity: 1;
          transform: translateY(12px) scale(1);
        }
      }
    }
  }
  &-SphereModel {
    position: absolute;
    top: 0;
    left: 0;
    height: 70px;
    min-width: 50px;
    transition: all 0.4s linear;
  }
  &-indicator {
    width: 65px;
    height: 65px;
    position: absolute;
    top: -50%;
    left: 50%;
    transform: translate(-50%, 0);
    box-sizing: border-box;
    background-color: #d2ebcd;
    border-radius: 50%;
    border: 6px solid #ffffff;
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: -22px;
      width: 20px;
      height: 20px;
      background: transparent;
      border-top-right-radius: 25px;
      box-shadow: 1px -10px 0 0 #fff;
    }
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: -22px;
      width: 20px;
      height: 20px;
      background: transparent;
      border-top-left-radius: 25px;
      box-shadow: -1px -10px 0 0 #fff;
    }
  }
}
</style>
