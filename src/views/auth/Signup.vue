<template>
  <form @submit.prevent="handleSubmit">
    <h3>Signup</h3>
    <input type="text" placeholder="Display Name" v-model="displayName" @click="handleReset" required>
    <input type="email" placeholder="Email" v-model="email" @click="handleReset" required>
    <input type="Password" placeholder="Password" v-model="password" @click="handleReset" required>
    <div class="error" v-if="error">{{ error }}</div>
    <button v-if="!isPending">Signup</button>
    <button v-if="isPending">Loading...</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useSignup from '@/composables/useSignup'
import { useRouter } from 'vue-router'

export default {
  setup(){
    const email = ref('')
    const password = ref('')
    const displayName = ref('')
    const router = useRouter()

    const { error, isPending, signup } = useSignup()
    
    const handleSubmit = async () => {
      const res = await signup(email.value, password.value, displayName.value)

      if(!error.value){
          router.push({ name: 'MyProjects' })
      }
    }

    const handleReset = ()=> {
      error.value = null
    }

    return { email, password, displayName, handleReset, handleSubmit, error, isPending }
  }

}
</script>

<style>

</style>