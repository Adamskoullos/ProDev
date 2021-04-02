<template>
    <div class="buttons">
        <button v-if="!bug.solved && !showSolution" @click="showSolution = true">Add Solution</button>
        <button v-if="showSolution" @click="showSolution = false">Submit solution</button>
        <button v-if="showSolution" @click="showSolution = false">Cancel</button>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'

export default {
    props: ['bug'],
    setup(){
        const showSolution = ref(false)


        return { showSolution }
    }
}
</script>

<style scoped>
.buttons{
    margin: 15px auto;
}
</style>