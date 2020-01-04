<template>
  <div class="w-full">
    <form class="flex flex-wrap flex-col justify-center items-center py-10 px-4 sm:px-2" method="post" @submit.prevent>
      <div
        class="border border-solid border-transparent sm:border-gray-400 flex flex-col flex-wrap bg-white w-full sm:w-96 text-center bg-white my-2 py-8 rounded-lg"
      >
        <div class="flex flex-wrap justify-center pb-3">
          <a href="https://netdevv.com/" target="_blank" class="focus:outline-none w-full flex flex-wrap justify-center mb-4">
            <img src="/images/netdevv-logo.svg" class="select-none h-12 w-auto flex" alt="Netdevv" title="Netdevv"/>
          </a>
          <p class="w-full text-center text-gray-800 font-semibold text-xl mb-1">Sign In</p>
          <p class="w-full text-center text-gray-800 font-normal text-base mb-3">Use your Social Media</p>
          <a
            class="flex flex-wrap justify-between items-center w-auto focus:outline-none focus:shadow-outline bg-primary-500 hover:bg-primary-400 text-white text-sm py-2 px-3 rounded mx-2 mt-3"
            href="http://127.0.0.1:8890/auth/google?redirect=/auth-callback"
          >
            <svg class="fill-current w-4 h-4 mr-2" viewBox="0 0 24 24"><path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.09501 0-7.43901-3.389-7.43901-7.574 0-4.185 3.345-7.574 7.43901-7.574 2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0 5.60499 0 .23999 5.365.23999 12S5.60499 24 12.24 24c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/></svg>
            <span>Sign-in Google</span>
          </a>

          <a
            class="flex flex-wrap justify-between items-center w-auto focus:outline-none focus:shadow-outline bg-primary-500 hover:bg-primary-400 text-white text-sm py-2 px-3 rounded mx-2 mt-3"
            href="http://127.0.0.1:8890/auth/github?redirect=/auth-callback"
          >
            <svg class="fill-current w-4 h-4 mr-2" viewBox="0 0 24 24"><path d="M12 .297119C5.37.297119 0 5.67012 0 12.2971c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.37998 1.235-3.21998-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.90998 1.23 3.21998 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57 4.801-1.574 8.236-6.074 8.236-11.369C24 5.67012 18.627.297119 12 .297119z"/></svg>
            <span>Sign-in Github</span>
          </a>
        </div>
        <div class="mt-6 px-4 md:px-10 pb-4 flex flex-wrap">
          <div class="w-full flex flex-wrap p-2">
            <input
              type="email"
              v-model.trim="$v.email.$model"
              ref="email"
              placeholder="Email"
              class="border border-solid focus:outline-none focus:border-2 focus:border-primary-400 py-2 px-4 w-full rounded"
              :class="$v.email.$error && $v.email.$anyDirty ? 'border-red-500': 'border-gray-500'"
              autocomplete="current-email"
              autofocus
              id="email"
            />
          </div>
          <div class="w-full flex flex-wrap p-2">
            <div class="flex flex-row flex-wrap mb-1 rounded w-full border-solid items-stretch" 
            :class="[$v.password.$error && $v.password.$anyDirty ? 'border-red-500': 'border-gray-500', pass_focus ? 'border-2 border-primary-400':'border']">
              <input
                @focus="pass_focus = true"
                @blur="pass_focus = false"
                :type="password_show ? 'text' : 'password'"
                v-model.trim="$v.password.$model"
                ref="password"
                placeholder="**********"
                class="focus:outline-none border-0 py-2 px-4 w-5/6 rounded-l"
                autocomplete="current-password"
                id="password"
              />
              <button
                type="button"
                class="focus:outline-none bg-white py-2 px-2 transition-1 w-1/6 rounded-r-lg text-gray-500 hover:text-gray-700 focus:text-gray-700 flex-wrap flex items-center justify-center"
                @click="password_show = !password_show"
              >
                <svg v-if="password_show" class="fill-current w-5 h-5" viewBox="0 0 22 20"><path fill-rule="evenodd" d="M1.01001 1.87L2.42004.450012 20.15 18.2l-1.41 1.41-3.4299-3.43C13.97 16.7 12.52 17 11 17c-5 0-9.27002-3.11-11-7.5.77002-1.96997 2.06006-3.66998 3.68994-4.95001L1.01001 1.87zM16 9.5c0-2.76001-2.24-5-5-5-.51 0-1 .09998-1.46997.23999L7.35999 2.57001C8.51001 2.20001 9.72998 2 11 2c5 0 9.27 3.10999 11 7.48999C21.3099 11.25 20.21 12.79 18.8199 14.02L15.76 10.96c.14-.46.24-.95.24-1.46zm-5 5c-2.76001 0-5-2.24-5-5 0-.77002.18005-1.5.48999-2.14001l1.57007 1.57C8.03003 9.10999 8 9.29999 8 9.5c0 1.66 1.33997 3 3 3 .2 0 .38-.03.5699-.07L13.14 14c-.65.32-1.37.5-2.14.5zm2.97-5.32996c-.1501-1.40002-1.25-2.48999-2.64-2.64001l2.64 2.64001z" clip-rule="evenodd"/></svg>
                <svg v-else class="fill-current w-5 h-5" viewBox="0 0 22 15"><path fill-rule="evenodd" d="M11 0C6 0 1.72998 3.10999 0 7.5 1.72998 11.89 6 15 11 15s9.27-3.11 11-7.5C20.27 3.10999 16 0 11 0zm0 12.5c-2.76001 0-5-2.24-5-5 0-2.76001 2.23999-5 5-5 2.76 0 5 2.23999 5 5 0 2.76-2.24 5-5 5zm-3-5c0-1.65997 1.33997-3 3-3 1.66 0 3 1.34003 3 3s-1.34 3-3 3c-1.66003 0-3-1.34003-3-3z" clip-rule="evenodd"/></svg> 
              </button>
            </div>
            <router-link tag="a" to="/login/reset-password" class="mt-1 w-full text-left text-primary-400 hover:text-primary-200 font-semibold text-sm">Forgot Password?</router-link>
          </div>
          <p class="px-2 my-4 w-full text-left text-black font-normal text-sm">
            For any issue regarding login, please contact us at 
            <a href="mailto:support@netdevv.com" target="_blank" class="font-semibold text-primary-400 hover:text-primary-500">support@netdevv.com</a>
          </p>
          <div class="w-full flex flex-wrap flex-row justify-between py-4 px-1 mt-3">
            <router-link
              tag="a" to="/register"
              class="focus:outline-none focus:shadow-outline bg-gray-200 hover:bg-gray-300 rounded text-primary-400 py-2 px-4 font-semibold text-sm"
            >Create Account</router-link>
            <button
              class="focus:outline-none focus:shadow-outline hover:bg-primary-400 rounded text-white py-2 px-4 font-semibold text-sm cursor-pointer"
              :class="$v.$invalid ? 'bg-primary-400':'bg-primary-500'"
              @click="login_form"
            >Login</button>
          </div>

        </div>
      </div>
      <!-- Help -->
      <div class="w-full sm:w-96 flex flex-wrap items-center justify-center px-16 sm:px-24">
        <router-link tag="a" to="/help" class="mx-4 text-gray-600 hover:text-gray-800 font-semibold text-sm">Help</router-link>
        <router-link tag="a" to="/privacy-policy" class="mx-4 text-gray-600 hover:text-gray-800 font-semibold text-sm">Privacy</router-link>
        <router-link tag="a" to="/terms-of-services" class="mx-4 text-gray-600 hover:text-gray-800 font-semibold text-sm">Terms</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = 'http://127.0.0.1:8890/';
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      password_show: false,
      email: "",
      password: "",
      pass_focus: false
    };
  },
  validations: {
      email: {
        required,
        email,
        minLength: minLength(8),
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(25),
      }
    },
  methods: {
    login_form() {
      if(!this.$v.$invalid){
        axios.post('/auth/login',{
          email: this.email,
          password: this.password
        })
        .then(data=>{
          console.log(data)
          let payload = {
            accessToken: data.data.result.accessToken,
            refresh_token: data.data.result.refresh_token
          };
          this.$store.commit('set_tokens', payload);
          //Get User
          axios({
            method: 'post', //you can set what request you want to be
            url: '/user',
            data: {},
            headers: {
                Authorization: 'Bearer ' + data.data.result.accessToken,
            }
          })
          .then(user_data=>{
            this.$store.commit('set_user', user_data.data);
            this.$router.push('account');
          })
          .catch(err=>{
              console.log(err);
          });
        })
        .catch(err=>{
          this.$notify({
            group: 'main',
            title: 'Error',
            text: "Email or Password is incorrect",
            type: 'error',
            'animation-name':'slide-left'
          });
        });
      } else {
        this.$notify({
          group: 'main',
          title: 'Error',
          text: "Please check your inputs",
          type: 'error',
          'animation-name':'slide-left'
        });
      }
    }
  },
  created() {
    this.$nextTick(() => this.$refs.email.focus());
  }
};
</script>