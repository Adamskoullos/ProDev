<template>
  <form @submit.prevent="handleSubmit" :class="{dark: dark}">
    <h3 :class="{dark: dark}">Login</h3>
    <input type="email" placeholder="Email" v-model="email" @click="handleReset" :class="{dark: dark}" required>
    <input type="Password" placeholder="Password" v-model="password" @click="handleReset" :class="{dark: dark}" required>
    <div class="error" v-if="error" :class="{dark: dark}">{{ error }}</div>
    <button v-if="!isPending" :class="{dark: dark}">Login</button>
    <button v-if="isPending" :class="{dark: dark}">Loading...</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useLogin from '../../composables/useLogin'
import { useRouter } from 'vue-router'

export default {
  setup(){
    const email = ref('')
    const password = ref('')
    const router = useRouter()

    const { error, login, isPending } = useLogin()

    const handleSubmit = async () => {
      const res = await login(email.value, password.value)
      if(!error.value){
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

<style>

</style>