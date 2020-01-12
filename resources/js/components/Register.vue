<template>
  <div class="w-full min-h-screen flex items-center justify-center">
    <form class="flex flex-wrap flex-col justify-center items-center py-10 px-4 md:px-2" method="post" @submit.prevent>
      <div
        class="border border-solid border-transparent md:border-gray-400 flex flex-wrap bg-white w-full md:w-97 text-center bg-white my-2 py-8 rounded-lg"
      >
        <div class="w-full md:w-4/6 flex flex-wrap px-2">
            <div class="w-full flex flex-wrap justify-center pb-3">
                <a href="https://netdevv.com/" target="_blank" class="focus:outline-none w-full flex flex-wrap justify-center items-center mb-4 mx-2">
                    <img src="/images/netdevv-logo.svg" class="select-none h-10 w-auto flex" alt="Netdevv" title="Netdevv"/>
                </a>
                <p class="w-full text-center text-gray-800 font-normal text-2xl mb-1 mx-2">Create your Netdevv Account</p>
                <a
                    class="flex flex-wrap justify-between items-center w-auto focus:outline-none focus:shadow-outline bg-primary-500 hover:bg-primary-400 text-white text-lg py-2 px-3 rounded mx-2 mt-3"
                    href="http://127.0.0.1:8890/auth/google"
                >
                    <svg class="fill-current w-4 h-4 mr-2" viewBox="0 0 24 24"><path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.09501 0-7.43901-3.389-7.43901-7.574 0-4.185 3.345-7.574 7.43901-7.574 2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0 5.60499 0 .23999 5.365.23999 12S5.60499 24 12.24 24c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/></svg>
                    <span>Sign-up Google</span>
                </a>
            
                <a
                    class="flex flex-wrap justify-between items-center w-auto focus:outline-none focus:shadow-outline bg-primary-500 hover:bg-primary-400 text-white text-lg py-2 px-3 rounded mx-2 mt-3"
                    href="http://127.0.0.1:8890/auth/github"
                >
                    <svg class="fill-current w-4 h-4 mr-2" viewBox="0 0 24 24"><path d="M12 .297119C5.37.297119 0 5.67012 0 12.2971c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.37998 1.235-3.21998-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.90998 1.23 3.21998 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57 4.801-1.574 8.236-6.074 8.236-11.369C24 5.67012 18.627.297119 12 .297119z"/></svg>
                    <span>Sign-up Github</span>
                </a>
            </div>
            <div class="mt-6 pt-0 pb-4 flex flex-wrap">    
                <div class="w-1/2 flex flex-wrap p-2">
                    <input
                    type="text"
                    v-model.trim="$v.first_name.$model"
                    ref="first_name"
                    placeholder="First name"
                    class="border border-solid focus:outline-none focus:border-2 focus:border-primary-400 py-1 px-3 w-full rounded text-lg"
                    :class="$v.first_name.$error && $v.first_name.$anyDirty ? 'border-red-500': 'border-gray-500'"
                    autocomplete="given-name"
                    autofocus
                    id="first_name"
                    />
                </div>
                <div class="w-1/2 flex flex-wrap p-2">
                    <input
                    type="text"
                    v-model.trim="$v.last_name.$model"
                    ref="last_name"
                    placeholder="Last name"
                    class="border border-solid focus:outline-none focus:border-2 focus:border-primary-400 py-1 px-3 w-full rounded text-lg"
                    :class="$v.last_name.$error && $v.last_name.$anyDirty ? 'border-red-500': 'border-gray-500'"
                    autocomplete="family-name"
                    id="last_name"
                    />
                </div>
                <div class="w-1/2 flex flex-wrap px-2 pt-2">
                    <input
                    type="email"
                    v-model.trim="$v.email.$model"
                    ref="email"
                    placeholder="Primary email"
                    class="border border-solid focus:outline-none focus:border-2 focus:border-primary-400 py-1 px-3 w-full rounded text-lg"
                    :class="$v.email.$error && $v.email.$anyDirty ? 'border-red-500': 'border-gray-500'"
                    autocomplete="email"
                    id="email"
                    />
                </div>
                <div class="w-1/2 flex flex-wrap px-2 pt-2">
                    <input
                    type="email"
                    v-model.trim="$v.confirm_email.$model"
                    ref="confirm_email"
                    placeholder="Re-enter your email"
                    class="border border-solid focus:outline-none focus:border-2 focus:border-primary-400 py-1 px-3 w-full rounded text-lg"
                    :class="$v.confirm_email.$error && $v.confirm_email.$anyDirty ? 'border-red-500': 'border-gray-500'"
                    autocomplete="email"
                    id="confirm_email"
                    />
                </div>
                <p class="ml-2 mt-1 w-full text-left text-gray-700 font-normal text-sm">
                    You can use letters, numbers &amp; periods
                </p>
                <div class="w-1/2 flex flex-wrap px-2 pt-2">
                    <label for="password" class="w-full text-sm my-1 text-left font-normal"
                        :class="$v.password.$error && $v.password.$anyDirty ? 'text-red-500': 'text-gray-500'">
                        Password
                    </label>
                    <input
                        type="password"
                        v-model.trim="$v.password.$model"
                        ref="password"
                        placeholder="**********"
                        class="border border-solid focus:outline-none focus:border-2 focus:border-primary-400 py-1 px-3 w-full rounded text-lg"
                        :class="$v.password.$error && $v.password.$anyDirty ? 'border-red-500': 'border-gray-500'"
                        autocomplete="password"
                        id="password"
                    />
                </div>
                <div class="w-1/2 flex flex-wrap px-2 pt-2">
                    <label for="confirm_password" class="w-full text-sm my-1 text-left font-normal"
                        :class="$v.confirm_password.$error && $v.confirm_password.$anyDirty ? 'text-red-500': 'text-gray-500'">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        v-model.trim="$v.confirm_password.$model"
                        ref="confirm_password"
                        placeholder="**********"
                        class="border border-solid focus:outline-none focus:border-2 focus:border-primary-400 py-1 px-3 w-full rounded text-lg"
                        :class="$v.confirm_password.$error && $v.confirm_password.$anyDirty ? 'border-red-500': 'border-gray-500'"
                        autocomplete="password"
                        id="confirm_password"
                    />
                </div>
                <p class="ml-2 mt-1 w-full text-left text-gray-700 font-normal text-sm">
                    Use 8 or more characters with a mix of letters, numbers &amp; symbols
                </p>
            
              <div class="w-full flex flex-wrap flex-row justify-between py-4 px-1 mt-3">
                <router-link
                  tag="a" to="/login"
                  class="focus:outline-none focus:shadow-outline bg-gray-200 hover:bg-gray-300 rounded text-primary-400 py-2 px-4 font-semibold text-base"
                >Login Instead</router-link>
                <button
                  class="focus:outline-none focus:shadow-outline hover:bg-primary-400 rounded text-white py-2 px-4 font-semibold text-base cursor-pointer"
                  :class="$v.$invalid ? 'bg-primary-400':'bg-primary-500'"
                  @click="register"
                >Sign up</button>
              </div>
            </div>
        </div>
        <div class="w-full md:w-2/6 hidden md:flex flex-wrap justify-center items-center content-center pl-2 pr-4">
            <img src="/images/vector/piece_of_puzzel-2.svg" class="select-none w-full flex" alt="Netdevv Services" title="Netdevv Services"/>
            <h2 class="select-none w-full mt-2 text-black text-2xl font-normal">Access all services through single Netdevv account</h2>
        </div>
    </div>
    <!-- Help -->
    <div class="w-full md:w-97 flex flex-wrap items-center justify-center px-16 md:px-24">
        <router-link tag="a" to="/help" class="mx-4 text-gray-600 hover:text-gray-800 font-semibold text-base">Help</router-link>
        <router-link tag="a" to="/privacy-policy" class="mx-4 text-gray-600 hover:text-gray-800 font-semibold text-base">Privacy</router-link>
        <router-link tag="a" to="/terms-of-services" class="mx-4 text-gray-600 hover:text-gray-800 font-semibold text-base">Terms</router-link>
    </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { required, email, minLength, maxLength, sameAs, alpha, helpers } from 'vuelidate/lib/validators';
const password_regex = helpers.regex('password_regex', /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#\$!%\*?\&])[A-Za-z\d@#\$!%\*?\&]{8,30}$/);

export default {
  data() {
    return {
      password_show: false,
      email: "",
      confirm_email: "",
      password: "",
      confirm_password: "",
      first_name: "",
      last_name: "",
    };
  },
  validations: {
      email: {
        required,
        email,
        minLength: minLength(8),
        maxLength: maxLength(70)
      },
      confirm_email: {
        required,
        email,
        minLength: minLength(8),
        maxLength: maxLength(70),
        sameAs: sameAs('email'),
      },
      password:{
        required,
        minLength: minLength(8),
        maxLength: maxLength(30),
        password_regex
      },
      confirm_password:{
        required,
        sameAs: sameAs('password'),
      },
      first_name:{
        required,
        minLength: minLength(2),
        maxLength: maxLength(30),
        alpha
      },
      last_name:{
        required,
        minLength: minLength(2),
        maxLength: maxLength(30),
        alpha
      },
    },
  methods: {
    register() {
      if(!this.$v.$invalid){
        axios.post('/auth/register',{
          email: this.email,
          confirm_email: this.confirm_email,
          password: this.password,
          confirm_password: this.confirm_password,
          first_name: this.first_name,
          last_name: this.last_name
        })
        .then(data=>{
          let payload = {
            accessToken: data.data.accessToken,
            refresh_token: data.data.refresh_token
          };
          
          this.$store.commit('set_tokens', payload);
          //Get User
          axios({
            method: 'post', //you can set what request you want to be
            url: '/user',
            data: {},
            headers: {
                Authorization: 'Bearer ' + data.data.accessToken,
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
            if(err.response.data.error_message.length <= 2){
              err.response.data.error_message = "Something went wrong";
            }

            this.$notify({
              group: 'main',
              title: 'Error',
              text: err.response.data.error_message,
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
    },
  },
  created() {
    this.$nextTick(() => this.$refs.first_name.focus());
  }
};
</script>