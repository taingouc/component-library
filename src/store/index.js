import Vue from 'vue'
import Vuex from 'vuex'
import { getSwiperList, getNewsList } from '@/api/index.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    swiperList: [],
    newList: []
  },
  getters: {},
  mutations: {
    swiperList(state, val) {
      state.swiperList = val
    },
    newList(state, val) {
      state.newList = [...state.newList, ...val]
    }
  },
  actions: {
    async SwiperListAsync({ commit }) {
      const { data } = await getSwiperList()
      commit('swiperList', data)
    },
    async NewsListAsync({ commit }, num) {
      const { data } = await getNewsList(num)
      commit('newList', data)
    }
  },
  modules: {}
})
