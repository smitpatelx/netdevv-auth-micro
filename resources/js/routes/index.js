import Vue from 'vue'
import VueRouter from 'vue-router'

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
      { path: '/login', component: imports.Login },
      { path: '/register', component: imports.Register },
      { path: '/account', component: imports.Account }
    ]
});

export default router;