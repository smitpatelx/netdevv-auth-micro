<template>
     <div class="flex flex-wrap py-3 pr-2" :class="width">
        <label for="last_name" class="w-full text-gray-600 text-xs font-normal mb-1">{{label}}</label>
        <input
        type="text"
        v-model.trim='$v.modelName.$model'
        ref="last_name"
        :placeholder="placeholder"
        :name="name"
        class="border border-solid bg-gray-200 focus:bg-white focus:outline-none focus:border-2 focus:border-primary-400 py-1 px-3 w-full rounded text-sm"
        :class="$v.last_name.$error && $v.last_name.$anyDirty ? 'border-red-500': 'border-transparent'"
        autocomplete="family-name"
        autofocus
        :id="typeof id !== 'undefined'?id:modelName"
        />
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    props:{
        modelName:{
            type: String,
            required: true
        },
        id:{
            type: String,
            required: false,
            default: this.modelName
        },
        placeholder:{
            type: String,
            required: false,
            default: this.label
        },
        label:{
            type: String,
            required: true
        },
        width:{
            type: String,
            required: false,
            default: 'w-1/2 md:w-1/3 lg:w-1/5'
        }
    }
}
</script>