<template>
  <form @submit.prevent="handleSubmit">
    <h3>Signup</h3>
    <input type="text" placeholder="Display Name" v-model="displayName" required>
    <input type="email" placeholder="Email" v-model="email" required>
    <input type="Password" placeholder="Password" v-model="password" required>
    <div class="error" v-if="error">{{ error }}</div>
    <button>Signup</button>
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
    


  }

}
</script>

<style>

</style>