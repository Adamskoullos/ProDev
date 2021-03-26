<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email" required>
    <input type="Password" placeholder="Password" v-model="password" required>
    <div class="error" v-if="error">{{ error }}</div>
    <button>Login</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useLogin from '../../composables/useLogin'

export default {
  setup(){
    const email = ref('')
    const password = ref('')

    const { error, login } = useLogin()

    const handleSubmit = async () => {
      const res = await login(email.value, password.value)
      if(!error.value){
          router.push({ name: 'MyProjects' })
      }
    }

    return { error, email, password, handleSubmit }
  }
}
</script>

<style>

</style>