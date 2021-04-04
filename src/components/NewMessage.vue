<template>
    <form :class="{light: light}">
        <textarea
        :class="{light: light}"
        v-model="message"
        placeholder="Type your message and hit enter"
        @keydown.enter.prevent="handleSubmit" required>
        </textarea>
        <div class="error">{{ error }}</div>
    </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import getUser from '../composables/getUser'
import useCollection from '../composables/useCollection'
import { timestamp } from '../firebase/config'


export default {
    props: ['light'],
    setup(){
        const message = ref('')
        const { addDoc, error } = useCollection('messages')
        const { user } = getUser()

        const handleSubmit = async () => {
            const chat = {
                name: user.value.displayName,
                message: message.value,
                createdAt: timestamp()
            }
            await addDoc(chat)
            if(!error.value){
                message.value = ''
            }
        }

        return { addDoc, error, handleSubmit, message }
    }
}
</script>

<style scoped>

form{
    padding: 0px;
    flex:1;
    margin: 10px auto;
    min-width: 100%;
}
form.light{
    padding: 0px;
    flex:1;
    margin: 10px auto;
    min-width: 100%;
    background: rgba(255, 255, 255, 0.2);
}
textarea{
    margin: 5px 0;
    border-radius: 4px;
}
textarea.light{
    margin: 5px 0;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgb(216, 216, 216);
}
textarea.light:focus{
    margin: 5px 0;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgb(255, 255, 255);
}
</style>