<template>
    <div id="app">
        <notifications group="main" classes="vue-notification2"/>
        <slide-x-left-transition origin="center" mode="out-in" :duration="300">
            <router-view></router-view>
        </slide-x-left-transition>
    </div>
</template>
<script>
import { FadeTransition, SlideXLeftTransition } from "vue2-transitions";
export default {
    components:{
        FadeTransition,
        SlideXLeftTransition
    }
}
</script>
<style lang="scss">
    //Notify
    .vue-notification2 {
        animation:slide-left 0.6s cubic-bezier(.25,.46,.45,.94) forwards;
        @apply text-primary-500 bg-white border-2 border-primary-300 border-solid text-base mt-4 mr-4 p-3 shadow-lg rounded;
  
        .notification-title {
            @apply text-gray-600;
        }

    
        &.warn {
            @apply text-yellow-500 border-yellow-500;
        }
    
        &.error {
            @apply text-red-500 border-red-500;
        }
    
        &.success {
            @apply text-green-500 border-green-500;
        }
    }

    .slide-left{animation:slide-left 0.5s cubic-bezier(.25,.46,.45,.94) forwards}
    @keyframes slide-left{0%{transform:translateX(-50px)}100%{transform:translateX(0px)}}
</style>