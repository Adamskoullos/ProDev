<template>
  <div class="row">
    <form @submit.prevent="handleEmail" class="col-12 contact-form">
        <h3>Thank you for reporting a ProDev issue</h3>
        <textarea type="text" placeholder="Please describe the issue" v-model="message"/>
        <div class="error">{{ error }}</div>
        <button v-if="!isPending">Submit issue</button>
        <button v-if="isPending">Submitting...</button>
    </form>
</div>
</template>

<script>
import { ref } from '@vue/reactivity'
import emailjs from 'emailjs-com';
import { useRouter } from 'vue-router';

export default {
    setup(){
        const router = useRouter()
        const isPending = ref(false)
        const message = ref('')
        const error = ref(null)
        
        
        const handleEmail = async () => {
            isPending.value = true
            const templateParams = {
                message: message.value
            }
            try{
                const res = await emailjs.send('service_2l8gu2j','template_78gjpjd', templateParams, 'user_Z5EDWeJCvIFumIfxti1gd')
                console.log('SUCCESS!', res.status, res.text);
                router.push({ name: 'MyProjects' })
            }
            catch(err){
                error.value = err.message
                console.log(err.message)
            }
        }


        return { isPending, handleEmail, message, error }
    }
}
</script>

<style scoped>
.row{
    flex:1;
    flex-direction: column;
    align-items: stretch;
    max-width: 95%;
}
h3{
    margin: 10px auto 0 15px;
}
form{
    margin: 40px auto;
    width: 100%;
    max-width: 600px;
}

</style>