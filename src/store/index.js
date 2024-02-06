import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// 導入API
import { getUserInfoAPI } from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    userInfo: {}
  },
  getters: {
  },
  mutations: {
    updateToken (state, token) {
      state.token = token
    },
    updateUserInfo (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 獲取用戶信息
    async getUserInfoActions (context) {
      const { data: { code, data } } = await getUserInfoAPI()
      if (code === 0) {
        context.commit('updateUserInfo', data)
      }
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
