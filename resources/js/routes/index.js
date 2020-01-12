import Vue from 'vue'
import VueRouter from 'vue-router'
import Header from '../layouts/Header';
import SideBar from '../layouts/SideBar';
import store from '../store/index';
import axios from 'axios';

Vue.use(VueRouter)

//Auto Import Components /\.vue$/
let importComponent = require.context('../components', false, /[A-Z]\w+\.vue$/);
let imports = {}
function importAll (file_paths) {
    file_paths.keys().forEach(file_path => {
        const file_name = file_path.split('/')[1]
        const path = file_path.split('.')[0]
        const name = file_name.split('.')[0]
        imports[name] = importComponent(file_path).default
  });
}
importAll(require.context('../components/', false, /[A-Z]\w+\.vue$/));

const router = new VueRouter({
    linkExactActiveClass: 'active',
    mode: 'history',
    routes: [
      { 
        path: '/', 
        component: imports.Login, 
        meta: { 
          requiresGuest: true,
          title: 'Sign In - Netdevv Account'
        } 
      },
      { 
        path: '/login', 
        component: imports.Login, 
        meta: { 
          requiresGuest: true,
          title: 'Sign In - Netdevv Account'
        } 
      },
      { 
        path: '/register', 
        component: imports.Register, 
        meta: { 
          requiresGuest: true,
          title: 'Create your Netdevv Account'
        } 
      },
      { 
        path: '/account',
        components: {
          header: Header,
          sidebar: SideBar,
          default: imports.Account
        }, 
        meta: { 
          requiresAuth: true,
          title: 'Manage - Netdevv Account'
        } 
      },
      { 
        path: '/security', 
        components: {
          header: Header,
          sidebar: SideBar,
          default: imports.Security
        }, 
        meta: { 
          requiresAuth: true,
          title: 'Security - Netdevv Account'
        }
      },
      { 
        path: '/linked-accounts', 
        components: {
          header: Header,
          sidebar: SideBar,
          default: imports.LinkedAccounts
        }, 
        meta: { 
          requiresAuth: true,
          title: 'Linked Accounts - Netdevv Account'
        }
      },
      { 
        path: '/logout', 
        component: imports.Logout, 
        meta: { 
          requiresAuth: true,
          title: 'Sign Out - Netdevv Account'
        }
      },
      { 
        path: '/auth-callback', 
        component: imports.AuthCallback, 
        meta: { 
          requiresGuest: true,
          title: 'Please Wait - Netdevv Account'
        }
      },
    ]
});

router.beforeEach((to, from, next) => {
  interceptor();
  var pageTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  if (pageTitle) {
    document.title = pageTitle.meta.title;
    next()
  } else {
    next() // make sure to always call next()!
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuth) {
      next({
        path: '/login'
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (store.getters.isAuth) {
      next({
        path: '/account'
      });
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router;

//Axios interceptor
const interceptor = ()=>{axios.interceptors.response.use(
  response => response,
  error => {
      // Reject promise if usual error
      if (error.response.status !== 403) {
          return Promise.reject(error);
      }

      /* 
          * When response code is 401, try to refresh the token.
          * Eject the interceptor so it doesn't loop in case
          * token refresh causes the 401 response
          */
      axios.interceptors.response.eject(interceptor);

      let refTokenStore = store.getters['getRefToken'];
      return axios({
          method: 'post', //you can set what request you want to be
          url: '/auth/refresh',
          data: {
              refresh_token: refTokenStore
          }
      })
      .then(res => {
          let refTokenStore = store.getters['getRefToken'];
          let accessToken = res.data.accessToken;
          
          //Save new token to store
          let payload = {
              accessToken: accessToken,
              refresh_token: refTokenStore
          };
          store.commit('set_tokens', payload);

          error.response.config.headers['Authorization'] = 'Bearer ' + accessToken;
          return axios(error.response.config);
      }).catch(err => {
          console.log("auth/refresh error: ",err);
          //Destroy access token
          store.dispatch('logout');

          router.push('login');
          return Promise.reject(err);
      }).finally(interceptor);
  }
)};