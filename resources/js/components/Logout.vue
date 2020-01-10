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

        }
    },
    methods:{
        logout(){
            axios({
                method: 'post', //you can set what request you want to be
                url: '/auth/logout',
                data: {
                    refresh_token: this.$store.getters.getRefToken
                },
                headers: {
                    Authorization: 'Bearer ' + this.$store.getters.getToken,
                }
            })
            .then(data=>{
                this.$store.dispatch('logout');
                this.$router.push('login');
            })
            .catch(err=>{
                this.$notify({
                    group: 'main',
                    title: 'Error',
                    text: "Error Logging Out. Try Again!!!",
                    type: 'error',
                    'animation-name':'slide-left'
                });
                location.reload(true);
                // setTimeout(()=>{
                //     this.$router.push('login');
                // },4000);
            });
        }
    },
    mounted(){
        this.logout();
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