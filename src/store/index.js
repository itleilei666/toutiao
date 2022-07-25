import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userPhoto: 'https://img2.baidu.com/it/u=618817830,2151131461&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=375',
    userName: '游客'
  },
  getters: {
  },
  mutations: {
    SET_USERPHOTO (state, value) {
      state.userPhoto = value
    },
    SET_USERNAME (state, value) {
      state.userName = value
    }
  },
  actions: {
  },
  modules: {
  }
})
