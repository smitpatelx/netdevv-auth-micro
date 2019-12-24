<template>
    <div id="app">
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