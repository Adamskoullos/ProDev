<template>
  <div class="row">
    <form @submit.prevent="handleSubmit" class="col-12">
        <h3>Thank you for reporting a ProDev issue</h3>
        <textarea type="text" placeholder="Please describe the issue" v-model="description"/>
        <button v-if="!isPending">Submit issue</button>
        <button v-if="isPending">Submitting...</button>
    </form>
</div>
</template>

<script>
import { ref } from '@vue/reactivity'


export default {
    setup(){
        const isPending = ref(false)


        return { isPending }
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