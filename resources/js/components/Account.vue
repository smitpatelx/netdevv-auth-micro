<template>
    <div>
        Welcome {{user.first_name}} {{user.last_name}}
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