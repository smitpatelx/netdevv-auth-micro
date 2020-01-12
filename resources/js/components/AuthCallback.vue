<template>
    <div class="flex flex-wrap w-full justify-center items-center content-center min-h-screen">

    </div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return{
            accessToken: '',
            refreshToken: ''
        }
    },
    methods:{
        getTokens(){
            let data = JSON.parse(this.$route.query.data);
            this.accessToken = data.accessToken;
            this.refreshToken = data.refresh_token;
            
            let payload = {
            accessToken: this.accessToken,
            refresh_token: this.refreshToken
          };
          this.$store.commit('set_tokens', payload);
            //Get User
            axios({
                method: 'post', //you can set what request you want to be
                url: '/user',
                data: {},
                headers: {
                    Authorization: 'Bearer ' + this.accessToken,
                }
            })
            .then(user_data=>{
                this.$store.commit('set_user', user_data.data);
            })
            .catch(err=>{
                console.log(err);
            });
            this.$router.push('account');
        }
    },
    created(){
        this.getTokens();
    }
}
</script>
<style lang="scss" scoped>

</style>