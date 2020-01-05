<template>
    <div class="w-auto bg-white rounded-lg py-6 px-6 shadow-lg flex flex-wrap antialiased">
        <form ref="change_p_form" @submit.prevent class="flex flex-wrap">
            <div class="w-full flex flex-wrap border-b-2 border-gray-300 mb-4">
                <a href="#change-password" class="text-white hover:text-gray-500 py-2 font-semibold leading-tight text-lg inline-flex justify-center items-center">
                    <span class="text-gray-700">Change Password</span>
                    <svg class="w-4 h-4 inline-block fill-current ml-2" style="transform: rotate(-45deg);" viewBox="0 0 20 10"><path d="M1.89999 5c0-1.71001 1.39-3.10001 3.10001-3.10001h4V0H5C2.24001 0 0 2.24001 0 5s2.24001 5 5 5h4V8.10001H5c-1.71001 0-3.10001-1.39-3.10001-3.10001zM6 6h8V4H6v2zm5-6h4c2.76 0 5 2.24001 5 5s-2.24 5-5 5h-4V8.10001h4c1.71 0 3.1-1.39 3.1-3.10001 0-1.71001-1.39-3.10001-3.1-3.10001h-4V0z"/></svg>
                </a>
            </div>
            <div class="w-full flex flex-wrap">
                <div class="w-1/2 md:w-2/5 xl:w-1/5 flex flex-wrap py-3 pr-2">
                    <label for="current_pass" class="w-full text-gray-600 text-xs font-normal mb-1">Current Password</label>
                    <input
                    type="text"
                    v-model.trim="$v.current_pass.$model"
                    ref="current_pass"
                    placeholder="Current Password"
                    class="border border-solid focus:outline-none focus:border-2 focus:border-primary-400 py-1 px-3 w-full rounded text-sm"
                    :class="$v.current_pass.$error && $v.current_pass.$anyDirty ? 'border-red-500': 'border-gray-500'"
                    autocomplete="password"
                    autofocus
                    id="current_pass"
                    />
                </div>
            </div>
            <div class="w-full flex flex-wrap">
                <div class="w-1/2 md:w-2/5 xl:w-1/5 flex flex-wrap py-3 pr-2">
                    <label for="new_password" class="w-full text-gray-600 text-xs font-normal mb-1">New Password</label>
                    <input
                    type="text"
                    v-model.trim="$v.new_password.$model"
                    ref="new_password"
                    placeholder="New Password"
                    class="border border-solid focus:outline-none focus:border-2 focus:border-primary-400 py-1 px-3 w-full rounded text-sm"
                    :class="$v.new_password.$error && $v.new_password.$anyDirty ? 'border-red-500': 'border-gray-500'"
                    autocomplete="password"
                    id="new_password"
                    />
                </div>
                <div class="w-1/2 md:w-2/5 xl:w-1/5 flex flex-wrap py-3 pr-2">
                    <label for="confirm_password" class="w-full text-gray-600 text-xs font-normal mb-1">Confirm Password</label>
                    <input
                    type="text"
                    v-model.trim="$v.confirm_password.$model"
                    ref="confirm_password"
                    placeholder="Confirm Password"
                    class="border border-solid focus:outline-none focus:border-2 focus:border-primary-400 py-1 px-3 w-full rounded text-sm"
                    :class="$v.confirm_password.$error && $v.confirm_password.$anyDirty ? 'border-red-500': 'border-gray-500'"
                    autocomplete="password"
                    id="confirm_password"
                    />
                </div>
            </div>

            <div class="w-full flex flex-wrap flex-row justify-start py-4 px-1 mt-3">
                <button
                  class="focus:outline-none focus:shadow-outline hover:bg-primary-400 rounded text-white py-2 px-4 font-semibold text-sm cursor-pointer"
                  :class="$v.$invalid ? 'bg-primary-400':'bg-primary-500'"
                  @click="form_submit"
                >Change Password</button>
                <button
                  @click="reset_change_p_form(); "
                  class="ml-4 focus:outline-none focus:shadow-outline bg-gray-200 hover:bg-gray-300 rounded text-primary-400 py-2 px-4 font-semibold text-sm"
                >Reset</button>
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