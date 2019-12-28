import Vue from 'vue';
import router from './routes/index';
import store from './store/index';
import App from './layouts/App'
import Vuelidate from 'vuelidate';
import Notifications from 'vue-notification';
import axios from 'axios';

axios.defaults.headers.common = {
    'csrf-token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
};

Vue.use(Vuelidate);
Vue.use(Notifications);

let vm = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
  
export default vm;