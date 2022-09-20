import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);


const state = {
    userToken: localStorage.getItem("user-token")
};


const store = new Vuex.Store({
    state,
    getters: {
     userToken: (state) => {
         return state.userToken
     }
    },
    actions: {
        userToken(context, userToken){
            context.commit('userToken', userToken)
        }
    },
    mutations: {
        userToken(state, userToken){
            state.userToken = userToken
        }
    }
});

export default store;