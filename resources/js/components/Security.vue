<template>
    <div class="w-auto bg-white rounded-lg py-6 px-6 md:px-10 shadow-lg flex flex-wrap antialiased">
        <form ref="change_p_form" @submit.prevent class="flex flex-wrap">
            <div class="w-full flex flex-wrap border-b-2 border-gray-300 mb-4">
                <div class="text-white hover:text-gray-500 py-2 font-semibold leading-tight text-2xl inline-flex justify-center items-center">
                    <a href="#change-password" class="inline-block fill-current mr-2 font-medium focus:text-green-500 focus:outline-none">#</a>
                    <span class="text-gray-700 font-medium">Change Password</span>
                </div>
            </div>
            <div class="w-full flex flex-wrap">
                <div class="w-1/2 md:w-2/5 xl:w-1/5 flex flex-wrap py-3 pr-2">
                    <label for="current_pass" class="w-full text-gray-600 text-sm font-normal mb-1">Current Password</label>
                    <input
                    type="text"
                    v-model.trim="$v.current_pass.$model"
                    ref="current_pass"
                    placeholder="Current Password"
                    class="border border-solid focus:outline-none focus:border-2 focus:border-primary-400 py-1 px-3 w-full rounded text-base"
                    :class="$v.current_pass.$error && $v.current_pass.$anyDirty ? 'border-red-500': 'border-gray-500'"
                    autocomplete="password"
                    autofocus
                    id="current_pass"
                    />
                </div>
            </div>
            <div class="w-full flex flex-wrap">
                <div class="w-1/2 md:w-2/5 xl:w-1/5 flex flex-wrap py-3 pr-2">
                    <label for="new_password" class="w-full text-gray-600 text-sm font-normal mb-1">New Password</label>
                    <input
                    type="text"
                    v-model.trim="$v.new_password.$model"
                    ref="new_password"
                    placeholder="New Password"
                    class="border border-solid focus:outline-none focus:border-2 focus:border-primary-400 py-1 px-3 w-full rounded text-base"
                    :class="$v.new_password.$error && $v.new_password.$anyDirty ? 'border-red-500': 'border-gray-500'"
                    autocomplete="password"
                    id="new_password"
                    />
                </div>
                <div class="w-1/2 md:w-2/5 xl:w-1/5 flex flex-wrap py-3 pr-2">
                    <label for="confirm_password" class="w-full text-gray-600 text-sm font-normal mb-1">Confirm Password</label>
                    <input
                    type="text"
                    v-model.trim="$v.confirm_password.$model"
                    ref="confirm_password"
                    placeholder="Confirm Password"
                    class="border border-solid focus:outline-none focus:border-2 focus:border-primary-400 py-1 px-3 w-full rounded text-base"
                    :class="$v.confirm_password.$error && $v.confirm_password.$anyDirty ? 'border-red-500': 'border-gray-500'"
                    autocomplete="password"
                    id="confirm_password"
                    />
                </div>
            </div>

            <div class="w-full flex flex-wrap flex-row justify-start py-4 px-1 mt-3">
                <button
                  @click="reset_change_p_form(); "
                  class="focus:outline-none focus:shadow-outline bg-gray-300 hover:bg-gray-400 rounded text-gray-700 py-2 px-4 font-semibold text-base flex flex-wrap justify-center items-center"
                >Reset
                    <svg class="w-4 h-4 inline-block ml-2 fill-current text-gray-600" viewBox="0 0 18 16"><path d="M7 4.5v-4l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/></svg>
                </button>
                <button
                  class="ml-4 focus:outline-none focus:shadow-outline bg-primary-500 hover:bg-primary-400 rounded text-white py-2 px-4 font-semibold text-base cursor-pointer flex flex-wrap justify-center items-center"
                  @click="form_submit"
                >Change Password
                <svg class="w-4 h-4 inline-block ml-2 fill-current text-white" viewBox="0 0 16 22"><path d="M8 0v3c4.42 0 8 3.58 8 8 0 1.57-.46 3.03-1.24 4.26L13.3 13.8c.45-.83.7-1.79.7-2.8 0-3.31-2.69-6-6-6v3L4 4l4-4zM2 11c0 3.31 2.69 6 6 6v-3l4 4-4 4v-3c-4.41998 0-8-3.58-8-8 0-1.57.460022-3.03 1.23999-4.26L2.70001 8.2C2.25 9.03 2 9.99 2 11z"/></svg>
                </button>
            </div>
        </form>
    </div>
</template>
<script>
import { required, email, minLength, maxLength, sameAs, helpers } from 'vuelidate/lib/validators';
const password_regex = helpers.regex('password_regex', /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#\$!%\*?\&])[A-Za-z\d@#\$!%\*?\&]{8,30}$/);
export default {
    data(){
        return {
            current_pass:'',
            new_password:'',
            confirm_password:''
        }
    },
    validations: {
        current_pass: {
            required,
            minLength: minLength(6),
            maxLength: maxLength(25),
        },
        confirm_password:{
            required,
            sameAs: sameAs('new_password'),
        },
        new_password:{
            required,
            minLength: minLength(8),
            maxLength: maxLength(30),
            password_regex
        },
    },
    methods:{
        form_submit(){
            if(!this.$v.$invalid){
                this.$notify({
                    group: 'main',
                    title: 'Success',
                    text: "Password Changed Successfully!",
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
        reset_change_p_form(){
            this.new_password = ''
            this.current_pass = ''
            this.confirm_password = ''
            this.$v.$reset()
            this.$refs.change_p_form.reset()
            this.$refs.current_pass.focus()
        }
    }
}
</script>