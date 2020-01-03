<template>
    <div class="w-5/6 bg-white rounded-lg mt-4 py-6 px-10 shadow-lg flex flex-wrap antialiased">
        <div class="w-full flex flex-wrap">
            <a href="#personal-info" class="nl-border text-gray-500 py-2 px-4 font-medium leading-tight text-sm">
                # Personal Information
            </a>
        </div>
        <form @submit.prevent class="w-full flex flex-wrap" ref="form1">
            <div class="w-1/5 flex flex-wrap py-3 px-2">
                <label for="first_name" class="w-full text-gray-600 text-xs font-medium mb-1">First Name</label>
                <input
                type="text"
                v-model.trim="$v.first_name.$model"
                ref="first_name"
                placeholder="First Name"
                class="border border-solid focus:outline-none focus:border-2 focus:border-primary-400 py-1 px-3 w-full rounded text-sm"
                :class="$v.first_name.$error && $v.first_name.$anyDirty ? 'border-red-500': 'border-gray-500'"
                autocomplete="given-name"
                autofocus
                id="first_name"
                />
            </div>
            <div class="w-1/5 flex flex-wrap py-3 px-2">
                <label for="last_name" class="w-full text-gray-600 text-xs font-medium mb-1">Last Name</label>
                <input
                type="text"
                v-model.trim="$v.last_name.$model"
                ref="last_name"
                placeholder="First Name"
                class="border border-solid focus:outline-none focus:border-2 focus:border-primary-400 py-1 px-3 w-full rounded text-sm"
                :class="$v.last_name.$error && $v.last_name.$anyDirty ? 'border-red-500': 'border-gray-500'"
                autocomplete="family-name"
                autofocus
                id="last_name"
                />
            </div>

            <div class="w-full flex flex-wrap flex-row justify-start py-4 px-1 mt-3">
                <button
                  class="focus:outline-none focus:shadow-outline hover:bg-primary-400 rounded text-white py-2 px-4 font-semibold text-sm cursor-pointer"
                  :class="$v.$invalid ? 'bg-primary-400':'bg-primary-500'"
                  @click="form_submit"
                >Save Changes</button>
                <button
                  @click="$refs.form1.reset()"
                  class="ml-4 focus:outline-none focus:shadow-outline bg-gray-200 hover:bg-gray-300 rounded text-primary-400 py-2 px-4 font-semibold text-sm"
                >Reset</button>
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
        })
        .catch(err=>{
            console.log(err);
        });
    },
    computed:{
        user(){
            return this.$store.getters.get_user;
        },
        first_name(){
            return this.$options.filters.capitalize(this.user.first_name);
        },
        last_name(){
            return this.$options.filters.capitalize(this.user.last_name);
        }
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