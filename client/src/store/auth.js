import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
    error: ''
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, user) {
      state.status = 'success'
      state.token = user.token
      state.user = user
    },
    auth_error(state, error) {
      state.status = 'error'
      state.error = error
    },
    logout(state) {
     
      state.status = ''
      state.token = ''
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    error: state => state.error
  }
  
})