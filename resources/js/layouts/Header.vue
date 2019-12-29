<template>
    <div class=" w-full flex flex-wrap justify-between items-center py-3 px-16">
        <div class="flex flex-wrap justify-center items-center">
            <img src="/images/netdevv-logo.svg" class="select-none h-12 w-auto flex" alt="Netdevv" title="Netdevv"/>
        </div>
        <div class="flex flex-wrap">
            <div class="relative">
                <button @click="open=!open" v-click-outside="hide" class="block rounded-full p-3 shadow-md bg-gray-100 focus:outline-none text-gray-600 focus:text-primary-400">
                    <svg class="block h-4 w-4 fill-current" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M12 4c0 2.21002-1.79 4-4 4-2.20996 0-4-1.78998-4-4s1.79004-4 4-4c2.21 0 4 1.78998 4 4zm-2 0c0-1.09998-.90002-2-2-2s-2 .90002-2 2 .90002 2 2 2 2-.90002 2-2zM8 9c-2.67004 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm-6 4.01V14h12v-1c-.2-.71-3.3-2-6-2-2.69995 0-5.80005 1.29-6 2.01z"/></svg>
                </button>
                <div v-if="open" class="absolute rounded-lg shadow-lg z-10 bg-gray-100 right-0 mt-3 w-48 py-3">
                    <div class="flex flex-wrap w-full flex-col text-sm font-medium antialiased">
                        <router-link to="logout" class="focus:outline-none focus:underline transition-all ease-out transition-medium text-gray-700 hover:text-primary-400 antialiased bg-transparent hover:bg-white shadow-none hover:shadow py-1 pl-6 flex flex-wrap justify-start items-center">
                            Sign out
                        </router-link>
                        <router-link to="account" class="focus:outline-none focus:underline transition-all ease-out transition-medium text-gray-700 hover:text-primary-400 antialiased bg-transparent hover:bg-white shadow-none hover:shadow py-1 pl-6 flex flex-wrap justify-start items-center">
                            Account
                        </router-link>
                        <router-link to="change-password" class="focus:outline-none focus:underline transition-all ease-out transition-medium text-gray-700 hover:text-primary-400 antialiased bg-transparent hover:bg-white shadow-none hover:shadow py-1 pl-6 flex flex-wrap justify-start items-center">
                            Security
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ClickOutside from 'vue-click-outside';
export default {
    data(){
        return{
            open:false
        }
    },
    methods:{
        hide(){
            this.open=false
        }
    },
    directives: {
        ClickOutside
    }
}
</script>
<style lang="sass" scoped>
    .active{
        @apply underline;
    }
</style>