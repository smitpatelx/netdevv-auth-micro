import axios from 'axios';
import store from './store/index';
import router from './routes/index';

const interceptor = axios.interceptors.response.use(
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
);

export default interceptor;