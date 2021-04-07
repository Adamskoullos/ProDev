<template>
    <div class="row">
        <h2 class="heading">ProDev Premium can be customised to suit your teams needs</h2>
        <h5>Get in touch and let us know what features and functionality would best fit your operations and we can get you up and running with a private environment</h5>
        <p>Thankyou for contacting ProDev, once we receive your request we will contact you to arrange an initial virtual consultation to discuss the details</p>
        <form @submit.prevent="handleEmail" class="col-12 contact-form">
            <input type="text" placeholder="Name" v-model="name" required>
            <input type="text" placeholder="Email" v-model="email" required>
            <input type="number" placeholder="Number of team members" v-model="teamMembers">
            <textarea type="text" placeholder="Please let us know any further info about your requirements" v-model="message" />
            <div class="error">{{ error }}</div>
            <button v-if="!isPending">Submit request</button>
            <button v-if="isPending" class="loading">Submitting...</button>
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
        const name = ref('')
        const email = ref('')
        const teamMembers = ref(null)
        const error = ref(null)
        
        
        const handleEmail = async () => {
            isPending.value = true
            const templateParams = {
                name: name.value,
                email: email.value,
                teamMembers: teamMembers.value,
                message: message.value
            }
            try{
                const res = await emailjs.send('service_2l8gu2j','template_78gjpjd', templateParams, 'user_Z5EDWeJCvIFumIfxti1gd')
                console.log('SUCCESS!', res.status, res.text);
                router.push({ name: 'Login' })
            }
            catch(err){
                error.value = err.message
                console.log(err.message)
            }
        }


        return { isPending, handleEmail, name, email, teamMembers, message, error }
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
h2{
    margin: 5vh auto 30px auto;
    text-align: center;
    font-weight: 200;
}
h5{
    margin: 20px auto;
    text-align: center;
    font-weight: 500;
}
p{
    text-align: center;
    margin: 20px auto;
}
form{
    margin: 40px auto;
    width: 100%;
    max-width: 600px;
}
</style>