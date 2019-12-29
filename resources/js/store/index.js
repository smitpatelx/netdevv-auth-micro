import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        accessToken: '',
        refresh_token: ''
    },
    mutations: {
        set_tokens (state, data) {
            state.accessToken = data.accessToken;
            state.refresh_token = data.refresh_token;
        },
        logout (state){
            state.accessToken = '';
            state.refresh_token = '';
        }
    },
    getters: {
        getToken: state => {
          return state.accessToken;
        },
        getRefToken: state => {
            return state.refresh_token;
        },
    },
    actions:{
        logout(context){
            context.commit('logout');
        }
    },
    plugins: [
        createPersistedState({
            storage: {
            getItem: key => ls.get(key),
            setItem: (key, value) => ls.set(key, value),
            removeItem: key => ls.remove(key)
            }
        })
    ]
});

export default store;