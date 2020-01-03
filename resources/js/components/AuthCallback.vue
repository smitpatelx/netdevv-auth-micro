<template>
    <div class="flex flex-wrap w-full justify-center items-center content-center min-h-screen">
        <svg viewBox="0 0 960 300">
            <symbol id="s-text">
                <text text-anchor="middle" x="50%" y="80%">Hold On</text>
            </symbol>
            <g class = "g-ants">
                <use xlink:href="#s-text" class="text-copy"></use>
                <use xlink:href="#s-text" class="text-copy"></use>
                <use xlink:href="#s-text" class="text-copy"></use>
                <use xlink:href="#s-text" class="text-copy"></use>
                <use xlink:href="#s-text" class="text-copy"></use>
            </g>
        </svg>
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

svg {
    display: block;
    font: 10.5em 'Montserrat';
    width: 960px;
    height: 300px;
    margin: 0 auto;
}

.text-copy {
    fill: none;
    stroke: white;
    stroke-dasharray: 6% 29%;
    stroke-width: 5px;
    stroke-dashoffset: 0%;
    animation: stroke-offset 5.5s infinite linear;
}

.text-copy:nth-child(1){
	stroke: rgb(0, 80, 252);
	animation-delay: -1;
}

.text-copy:nth-child(2){
	stroke: rgb(45, 112, 255);
	animation-delay: -2s;
}

.text-copy:nth-child(3){
	stroke: rgb(0, 189, 189);
	animation-delay: -3s;
}

.text-copy:nth-child(4){
	stroke: rgb(0, 113, 189);
	animation-delay: -4s;
}

.text-copy:nth-child(5){
	stroke: rgb(5, 64, 141);
	animation-delay: -5s;
}

@keyframes stroke-offset{
	100% {stroke-dashoffset: -35%;}
}
</style>