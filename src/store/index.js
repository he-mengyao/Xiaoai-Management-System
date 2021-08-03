import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        username1: '',
    },
    mutations: {
        setName(state, data) {
            state.username1 = data
        }
    },
    actions: {},
    modules: {}
})