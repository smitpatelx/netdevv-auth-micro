<template>
    <div class="w-1/6 flex flex-wrap justify-start">
        <div class="w-48 rounded-lg p-2 z-10 mt-2">
            <div class="flex flex-wrap w-full flex-col text-sm font-medium antialiased">
                <router-link to="account" class="focus:outline-none focus:underline text-gray-700 rounded-lg antialiased bg-transparent hover:underline shadow-none py-2 px-5 flex flex-wrap justify-start items-center">
                    <svg class="inline-block h-4 w-4 fill-current mr-2" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M17.5022 10c0 .34-.03.66-.0701.98l2.11 1.65c.1901.15.24.42.12.64l-2 3.46c-.09.16-.26.25-.4299.25-.0601 0-.12-.01-.1801-.03l-2.49-1c-.52.39-1.0799.73-1.6899.98l-.38 2.65c-.03.24-.24.42-.49.42h-4c-.25 0-.46009-.18-.48999-.42l-.38001-2.65c-.60998-.25-1.17004-.58-1.69006-.98l-2.48999 1c-.05005.02-.10999.03-.17005.03-.17993 0-.34997-.09-.43994-.25L.342163 13.27c-.119995-.22-.069946-.49.119995-.64l2.109982-1.65c-.04004-.32-.06994-.65-.06994-.98 0-.32999.0299-.66.06994-.98001L.462158 7.37c-.189941-.15-.25-.41999-.119995-.63999L2.34216 3.26999c.08997-.16.26001-.25.43006-.25.05993 0 .11999.01001.17993.03l2.48999 1c.52002-.38999 1.08008-.72998 1.69006-.97998L7.51221.420013C7.54211.179993 7.7522 0 8.0022 0h4c.25 0 .46.179993.49.420013l.38 2.649997c.61.25 1.1699.57998 1.6899.97998l2.49-1c.0501-.01999.11-.03.1701-.03.1799 0 .3499.09.4399.25l2 3.46002c.12.22.0701.48999-.12.63999l-2.11 1.64999c.0401.32001.0701.64001.0701.98001zm-2 0c0-.20999-.01-.42001-.0501-.73001l-.14-1.12998.89-.70001 1.0701-.85-.7001-1.21-1.27.51001-1.0599.43-.91-.70001c-.4001-.29999-.8-.53-1.23-.71l-1.0601-.42999-.1599-1.13L10.6921 2H9.30212l-.19995 1.35001-.16003 1.13L7.8822 4.91c-.41003.16999-.82007.41001-1.25.73001l-.90002.68-1.04004-.42002-1.27002-.50998-.69995 1.21L3.80212 7.44l.89002.70001-.14002 1.12998c-.0299.30002-.04992.53-.04992.73001 0 .2.02002.43.04992.74l.14002 1.13-.89002.7-1.07995.84.69995 1.21 1.27002-.51 1.06006-.43.90991.7c.40002.3.80005.53 1.2301.71l1.05994.43.16003 1.13.18994 1.35h1.39998l.2001-1.35.1599-1.13 1.0601-.43c.41-.17.8199-.41 1.25-.73l.9-.68 1.0399.42 1.2701.51.7-1.21-1.0801-.84-.89-.7.14-1.13c.0301-.3.0501-.52.0501-.73zm-5.5-4c-2.20996 0-4 1.79001-4 4 0 2.21 1.79004 4 4 4 2.21 0 4-1.79 4-4 0-2.20999-1.79-4-4-4zm-2 4c0 1.1.90002 2 2 2 1.1 0 2-.9 2-2 0-1.10001-.9-2-2-2-1.09998 0-2 .89999-2 2z" /></svg>
                    Account
                </router-link>
                <router-link to="security" class="focus:outline-none focus:underline text-gray-700 rounded-lg antialiased bg-transparent hover:underline shadow-none py-2 px-5 flex flex-wrap justify-start items-center">
                    <svg class="inline-block h-4 w-4 fill-current mr-2" viewBox="0 0 20 21"><path fill-rule="evenodd" d="M13 7h1c1.1 0 2 .89999 2 2v10c0 1.1-.9 2-2 2H2c-1.099976 0-2-.9-2-2V9c0-1.10001.900024-2 2-2h1V5c0-2.76001 2.23999-5 5-5 2.76 0 5 2.23999 5 5v2zM8 2C6.33997 2 5 3.34 5 5v2h6V5c0-1.66-1.33997-3-3-3zM2 19V9h12v10H2zm8-5c0 1.1-.90002 2-2 2s-2-.9-2-2 .90002-2 2-2 2 .9 2 2z" clip-rule="evenodd"/></svg>
                    Security
                </router-link>
                <router-link to="linked-accounts" class="focus:outline-none focus:underline text-gray-700 rounded-lg antialiased bg-transparent hover:underline shadow-none py-2 px-5 flex flex-wrap justify-start items-center">
                    <svg class="inline-block h-4 w-4 fill-current mr-2" viewBox="0 0 22 22"><path fill-rule="evenodd" d="M0 11.295C0 5.22501 4.93005.295013 11 .295013c6.0699 0 11 4.929997 11 10.999987h-2c0-4.96999-4.03-8.99999-9-8.99999-4.96997 0-9 4.03-9 8.99999H0zm11-6.99999c-3.87 0-7 3.13001-7 6.99999h2c0-2.76 2.23999-4.99999 5-4.99999 2.76 0 5 2.23999 5 4.99999h2c0-3.86998-3.13-6.99999-7-6.99999zm1 9.28999c.88-.39 1.5-1.26 1.5-2.29 0-1.37999-1.12-2.49999-2.5-2.49999s-2.5 1.12-2.5 2.49999c0 1.02.62 1.9 1.5 2.29v3.3l-3.41003 3.41L8 21.705l3-3 3 3 1.4099-1.41L12 16.885v-3.3z" clip-rule="evenodd"/></svg>
                    Linked Accounts
                </router-link>
                <router-link to="logout" class="focus:outline-none focus:underline text-gray-700 rounded-lg antialiased bg-transparent hover:underline shadow-none py-2 px-5 flex flex-wrap justify-start items-center">
                    <svg class="inline-block h-4 w-4 fill-current mr-2" viewBox="0 0 20 20"><path d="M2 0h14c1.1 0 2 .899994 2 2v14c0 1.1-.9 2-2 2H2c-1.109985 0-2-.9-2-2v-4h2v4h14V2H2v4H0V2C0 .899994.890015 0 2 0zm6.5 14l-1.41003-1.41L9.67004 10H0V8h9.67004L7.08997 5.41 8.5 4l5 5-5 5z"/></svg>
                    Sign out
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="sass" scoped>
    .active{
        @apply bg-white text-primary-400 shadow;
    }
</style>