import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入自己的ui组件库
import ui from './components/index.js'
// 导入Mockjs
import './Mock/index'
Vue.config.productionTip = false
// 注册ui组件库
Vue.use(ui)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
