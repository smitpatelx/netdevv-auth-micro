import Vue from 'vue';
import router from './routes/index';
import store from './store/index';
import App from './layouts/App'
import Vuelidate from 'vuelidate';

Vue.use(Vuelidate);

let vm = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  });
  
export default vm;