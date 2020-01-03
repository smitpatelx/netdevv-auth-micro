<template>
    <div class="w-5/6 bg-white rounded-lg mt-4 py-6 px-10 shadow-lg flex flex-wrap antialiased">
        <div class="w-full flex flex-wrap">
            <a href="#linked-accounts" class="nl-border text-primary-500 py-2 px-4 font-medium leading-tight text-sm">
                # Linked Accounts
            </a>
        </div>
        <dir class="w-full flex flex-wrap p-0">
            <div class="w-auto flex flex-wrap flex-row p-2">
                <div class="w-auto flex flex-wrap justify-center items-center">
                    <svg v-if="typeof user.google_id==='undefined'" class="fill-current w-6 h-6 text-red-500" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M9.98999 0C4.46997 0 0 4.48001 0 10c0 5.52 4.46997 10 9.98999 10C15.52 20 20 15.52 20 10 20 4.48001 15.52 0 9.98999 0zM11 11V5H9v6h2zm0 4v-2H9v2h2zm-9-5c0 4.42 3.58002 8 8 8 4.42 0 8-3.58 8-8 0-4.42001-3.58-8-8-8-4.41998 0-8 3.57999-8 8z" clip-rule="evenodd"/></svg>
                    <svg v-else class="fill-current w-6 h-6 text-green-500" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 0C4.47998 0 0 4.48 0 10s4.47998 10 10 10c5.52 0 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41003 0-8-3.59-8-8s3.58997-8 8-8c4.41 0 8 3.59 8 8s-3.59 8-8 8zm-2-5.83l6.59-6.59L16 7l-8 8-4-4 1.41003-1.41L8 12.17z" clip-rule="evenodd"/></svg>
                </div>
                <a
                    class="flex flex-wrap justify-between items-center w-auto focus:outline-none focus:shadow-outline bg-gray-400 hover:bg-gray-300 text-gray-700 text-sm py-2 px-3 rounded mx-2"
                    href="http://127.0.0.1:8890/auth/google?redirect=/linked-accounts"
                >
                    <svg class="fill-current w-4 h-4 mr-2" viewBox="0 0 24 24"><path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.09501 0-7.43901-3.389-7.43901-7.574 0-4.185 3.345-7.574 7.43901-7.574 2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0 5.60499 0 .23999 5.365.23999 12S5.60499 24 12.24 24c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/></svg>
                    <span v-html="typeof user.google_id==='undefined' ? 'Sign-in Google' : 'Google'"></span>
                </a>
            </div>

            <div class="w-auto flex flex-wrap flex-row p-2">
                <div class="w-auto flex flex-wrap justify-center items-center">
                    <svg v-if="typeof user.github_id==='undefined'" class="fill-current w-6 h-6 text-red-500" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M9.98999 0C4.46997 0 0 4.48001 0 10c0 5.52 4.46997 10 9.98999 10C15.52 20 20 15.52 20 10 20 4.48001 15.52 0 9.98999 0zM11 11V5H9v6h2zm0 4v-2H9v2h2zm-9-5c0 4.42 3.58002 8 8 8 4.42 0 8-3.58 8-8 0-4.42001-3.58-8-8-8-4.41998 0-8 3.57999-8 8z" clip-rule="evenodd"/></svg>
                    <svg v-else class="fill-current w-6 h-6 text-green-500" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 0C4.47998 0 0 4.48 0 10s4.47998 10 10 10c5.52 0 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41003 0-8-3.59-8-8s3.58997-8 8-8c4.41 0 8 3.59 8 8s-3.59 8-8 8zm-2-5.83l6.59-6.59L16 7l-8 8-4-4 1.41003-1.41L8 12.17z" clip-rule="evenodd"/></svg>
                </div>
                <a
                    class="flex flex-wrap justify-between items-center w-auto focus:outline-none focus:shadow-outline bg-gray-400 hover:bg-gray-300 text-gray-700 text-sm py-2 px-3 rounded mx-2"
                    href="http://127.0.0.1:8890/auth/github?redirect=/linked-accounts"
                >
                    <svg class="fill-current w-4 h-4 mr-2" viewBox="0 0 24 24"><path d="M12 .297119C5.37.297119 0 5.67012 0 12.2971c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.37998 1.235-3.21998-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.90998 1.23 3.21998 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57 4.801-1.574 8.236-6.074 8.236-11.369C24 5.67012 18.627.297119 12 .297119z"/></svg>
                    <span v-html="typeof user.github_id==='undefined' ? 'Sign-in Github' : 'Github'"></span>
                </a>
            </div>
        </dir>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            loginWindow:'',
            user:{}
        }
    },
    methods:{
       update_user(){
            this.user = this.$store.getters.get_user;
        }
    },
    mounted(){    
        //Get User
        axios({
            method: 'post', //you can set what request you want to be
            url: '/user',
            data: {},
            headers: {
                Authorization: 'Bearer ' + this.$store.getters.getToken,
            }
        })
        .then(user_data=>{
            this.$store.commit('set_user', user_data.data);
            this.update_user();
        })
        .catch(err=>{
            console.log(err);
        });
    }
}
</script>