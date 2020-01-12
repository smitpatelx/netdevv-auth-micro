<template>
    <div class="w-auto bg-white rounded-lg py-6 px-6 md:px-10 shadow-lg flex flex-wrap antialiased">
        <div class="w-full flex flex-wrap border-b-2 border-gray-200 mb-4">
            <div class="text-white hover:text-gray-500 py-2 leading-tight text-2xl inline-flex justify-center items-center block">
                <a href="#personal-info" class="inline-block fill-current mr-2 font-medium focus:text-green-500 focus:outline-none">#</a>
                <span class="text-gray-700 font-medium">Personal Information</span>
            </div>
        </div>
        <form @submit.prevent class="w-full flex flex-wrap" ref="form1">
            <div class="w-1/2 md:w-1/3 lg:w-1/5 flex flex-wrap py-3 pr-2">
                <label for="first_name" class="w-full text-gray-600 text-sm font-normal mb-1">First Name</label>
                <input
                type="text"
                v-model.trim="$v.first_name.$model"
                ref="first_name"
                placeholder="First Name"
                class="border border-solid bg-gray-200 focus:bg-white focus:outline-none focus:border-2 focus:border-primary-400 py-1 px-3 w-full rounded text-base"
                :class="$v.first_name.$error && $v.first_name.$anyDirty ? 'border-red-500': 'border-transparent'"
                autocomplete="given-name"
                autofocus
                id="first_name"
                />
            </div>
            <div class="w-1/2 md:w-1/3 lg:w-1/5 flex flex-wrap py-3 pr-2">
                <label for="last_name" class="w-full text-gray-600 text-sm font-normal mb-1">Last Name</label>
                <input
                type="text"
                v-model.trim="$v.last_name.$model"
                ref="last_name"
                placeholder="First Name"
                class="border border-solid bg-gray-200 focus:bg-white focus:outline-none focus:border-2 focus:border-primary-400 py-1 px-3 w-full rounded text-base"
                :class="$v.last_name.$error && $v.last_name.$anyDirty ? 'border-red-500': 'border-transparent'"
                autocomplete="family-name"
                autofocus
                id="last_name"
                />
            </div>

            <div class="w-full flex flex-wrap flex-row justify-start py-4 px-1 mt-3">
                <button
                  @click="reset_form"
                  button
                  class="focus:outline-none focus:shadow-outline bg-gray-300 hover:bg-gray-400 rounded text-gray-700 py-2 px-4 font-semibold text-base flex flex-wrap justify-center items-center"
                >   
                    Revert
                    <svg class="w-3 h-3 inline-block ml-2 fill-current text-gray-600" viewBox="0 0 18 16"><path d="M7 4.5v-4l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/></svg>
                </button>
                <button
                  class="ml-4 focus:outline-none focus:shadow-outline bg-primary-500 hover:bg-primary-400 rounded text-white py-2 px-4 font-semibold text-base cursor-pointer flex flex-wrap justify-center items-center"
                  @click="form_submit"
                >
                    Save
                    <svg class="w-3 h-3 inline-block ml-2 fill-current text-white" viewBox="0 0 18 18"><path d="M2 0h12l4 4v12c0 1.1-.9 2-2 2H2c-1.109985 0-2-.9-2-2V2C0 .899994.890015 0 2 0zm14 16V4.83L13.17 2H2v14h14zM9 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm3-6H3v4h9V3z"/></svg>
                </button>
            </div>
        </form>
    </div>
</template>
<script>
import axios from 'axios';
import { required, email, minLength, maxLength, sameAs, alpha, helpers } from 'vuelidate/lib/validators';
export default {
    data(){
        return{
            first_name:'',
            last_name: '',
            salutation: '',
            address: '',
            state: '',
            country: '',
            pin_code: '',
            primary_email: '',
            secondary_email: '',
            email_verified: false,
            phone: '',
            extension: '',
            avatar: '',
            createdAt: null,
            updatedAt: null,
        }
    },
    validations: {
        first_name:{
            required,
            minLength: minLength(2),
            maxLength: maxLength(30),
            alpha
        },
        last_name:{
            required,
            minLength: minLength(2),
            maxLength: maxLength(30),
            alpha
        },
    },
    methods:{
        reset_form(){
            this.first_name = this.$options.filters.capitalize(this.user.first_name);
            this.last_name = this.$options.filters.capitalize(this.user.last_name);
        },
        form_submit(){
            if(!this.$v.$invalid){
                this.$notify({
                    group: 'main',
                    title: 'Success',
                    text: "Congrates",
                    type: 'success',
                    'animation-name':'slide-left'
                });
            } else {
                this.$notify({
                    group: 'main',
                    title: 'Error',
                    text: "Please check your inputs",
                    type: 'error',
                    'animation-name':'slide-left'
                });
            }
        },
        init(){
            this.first_name = this.$options.filters.capitalize(this.user.first_name);
            this.last_name = this.$options.filters.capitalize(this.user.last_name);
        }
    },
    created(){
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
            this.init();
        })
        .catch(err=>{
            this.$router.push('logout');
        });
    },
    computed:{
        user(){
            return this.$store.getters.get_user;
        },
    },
    filters:{
        capitalize: val => {
            if (!val) return ''
            val = val.toString()
            return val.charAt(0).toUpperCase() + val.slice(1)
        }
    }
}
</script>