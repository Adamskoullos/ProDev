<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create new bug</h4>
    <input type="text" placeholder="Bug title" v-model="title" required>
    <textarea placeholder="Description of the issue" v-model="description" required></textarea>
    <textarea placeholder="Paste error message here" v-model="errorMessage" required></textarea>
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Add new bug</button>
    <button v-if="isPending" class="loading">Uploading...</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useCollection from '../composables/useCollection'
import getUser from '../composables/getUser'
import { timestamp } from '../firebase/config'
import { useRouter } from 'vue-router'

export default {
  setup(){
    const title = ref('')
    const description = ref('')
    const errorMessage = ref('')
    const isPending = ref(false)

    const { addDoc, error } = useCollection('bugs')
    const { user } =getUser()
    const router = useRouter()

    const handleSubmit = async () => {
      isPending.value = true
      const res = await addDoc({
        title: title.value,
        description: description.value,
        errorMessage: errorMessage.value,
        userId: user.value.uid,
        userName: user.value.displayName,
        solution: '',
        solved: false,
        createdAt: timestamp()
      })
      if(!error.value){
        isPending.value = false
        router.push({ name: 'SingleBug', params: { id: res.id } })
      }
      title.value = ''
      description.value = ''
      errorMessage.value = ''
    }

    return { title, description, errorMessage, isPending, handleSubmit, error }
  }
}
</script>

<style scoped>
form{
  flex:1;
  margin-top: 10vh;
  min-width: 95%;
  max-width: 600px;
}
</style>