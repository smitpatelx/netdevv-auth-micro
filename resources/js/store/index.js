import Vue from 'vue'
import axios from "axios"
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        accessToken: '',
        refresh_token: '',
        user:{}
    },
    mutations: {
        set_tokens (state, data) {
            state.accessToken = data.accessToken;
            state.refresh_token = data.refresh_token;
        },
        logout (state){
            state.accessToken = ''
            state.refresh_token = ''
            state.user={}
        },
        set_user(state, data){
            state.user = data;
        }
    },
    getters: {
        getToken: state => {
          return state.accessToken;
        },
        getRefToken: state => {
            return state.refresh_token;
        },
        get_user: state => {
            return state.user;
        },
        isAuth: state => {
            if(state.accessToken.length > 1 || state.refresh_token.length > 1 || (Object.entries(state.user).length != 0 && state.user.constructor === Object)){
                return true
            } else {
                return false
            }
        }
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