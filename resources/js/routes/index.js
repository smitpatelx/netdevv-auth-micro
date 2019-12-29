import Vue from 'vue'
import VueRouter from 'vue-router'
import Header from '../layouts/Header';
import SideBar from '../layouts/SideBar';

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
      { path: '/', component: imports.Login },
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
        path: '/logout', 
        component: imports.Logout, 
        meta: { 
          requiresAuth: true,
          title: 'Sign Out - Netdevv Account'
        } 
      },
    ]
});

router.beforeEach((to, from, next) => {
  var pageTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  if (pageTitle) {
    document.title = pageTitle.meta.title;
    next()
  } else {
    next() // make sure to always call next()!
  }
})

export default router;