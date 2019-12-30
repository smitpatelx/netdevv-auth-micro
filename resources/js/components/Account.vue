<template>
    <div class="w-4/5 bg-white rounded-lg mt-4 py-6 px-10 shadow-lg flex flex-wrap antialiased">
        <p class="w-full text-lg text-gray-700">
            Welcome {{user.first_name}} {{user.last_name}}
        </p>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return{
            user:{}
        }
    },
    methods:{
        get_users(){
            let varToken = this.$store.getters.getToken;
            axios({
                method: 'post', //you can set what request you want to be
                url: '/user',
                data: {},
                headers: {
                    Authorization: 'Bearer ' + varToken,
                }
            })
            .then(data=>{
                this.user = data.data;
            })
            .catch(err=>{
                console.log(err);
            });
        }
    },
    created(){
        this.get_users();
    }
}
</script>