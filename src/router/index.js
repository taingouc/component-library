import Vue from 'vue'
import VueRouter from 'vue-router'

const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/news' },
  { path: '/news', component: () => import('@/pages/News') },
  { path: '/profile', component: () => import('@/pages/Profile') },
  { path: '/messages', component: () => import('@/pages/Messages') },
  { path: '/game', component: () => import('@/pages/Game') },
  { path: '/setting', component: () => import('@/pages/Setting') },
  { path: '/info', component: () => import('@/pages/News/Information') }
]

const router = new VueRouter({
  routes
})

export default router
