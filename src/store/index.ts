import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const getData = (key: string) => {
  return JSON.parse(window.localStorage.getItem(key) || 'null')
}

export default new Vuex.Store({
  state: {
    user: getData('user')
  },
  mutations: {
    setUser (state, payload) {
      state.user = JSON.parse(payload)
      window.localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
