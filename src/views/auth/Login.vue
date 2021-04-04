<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email" @click="handleReset" required>
    <input type="Password" placeholder="Password" v-model="password" @click="handleReset" required>
    <div class="error" v-if="error">{{ error }}</div>
    <button v-if="!isPending">Login</button>
    <button class="loading" v-if="isPending">Loading...</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useLogin from '../../composables/useLogin'
import { useRouter } from 'vue-router'

export default {
  emits: ['login'],
  props:['light'],
  setup(props, context){
    const email = ref('')
    const password = ref('')
    const router = useRouter()

    const { error, login, isPending } = useLogin()

    const handleSubmit = async () => {
      const res = await login(email.value, password.value)
      if(!error.value){
          context.emit('login')
          router.push({ name: 'MyProjects' })
      }
    }

    const handleReset = ()=> {
      error.value = null
    }

    return { error, email, password, handleSubmit, isPending, handleReset }
  }
}
</script>

<style scoped>
form{
  margin-top: 10vh;
}
</style>