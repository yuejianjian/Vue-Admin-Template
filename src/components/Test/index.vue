<template>
    <div>
        
        {{message|dataFormat}}
    </div>
</template>
<script>
    export default{
        data(){
            return{
                message:'1111'
            }
        },
        filters:{
            dataFormat(msg){
                return msg +"过滤器"
            }
        }
    }
</script>