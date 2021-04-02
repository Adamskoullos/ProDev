<template>
    <div class="buttons">
        <button v-if="showSolution" @click="handleCloseForm">Cancel</button>
        <button v-if="!bug.solved && !showSolution" @click="showSolution = true">Add Solution</button>
    </div>
    <form v-if="showSolution" @submit.prevent="handleSubmit">
        <h5>Add solution details</h5>
        <textarea placeholder="Solution details" v-model="solution" required></textarea>
        <label>Upload solution image</label>
        <input type="file" @change="handleChange">
        <div class="error">{{ fileError }}</div>
        <div class="buttons">
            <button v-if="!isPending">Submit solution</button>
            <button v-if="isPending" class="loading">Uploading...</button>  
        </div>
    </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useStorage from '../composables/useStorage'
import getUser from '../composables/getUser'
import { useRouter } from 'vue-router'
import useDocument from '../composables/useDocument'
import { onMounted } from '@vue/runtime-core'

export default {
    props: ['bug'],
    setup(props){
        const showSolution = ref(false)
        const solution = ref('')
        const solutionImage = ref(null)
        const fileTypes = ['image/png', 'image/jpeg']
        const fileError = ref(null)
        const isPending = ref(false)

        const { uploadImage, error, filePath, url } = useStorage()
        const { updateDoc } = useDocument('bugs', props.bug.id)

        onMounted(() => {
            if(props.bug.solved){
                showSolution.value = true
            }
        })

        const handleCloseForm = () => {
            showSolution.value = false
            solution.value = ''
            solutionImage.value = null
        }

        const handleChange = (e) => {
            const selected = e.target.files[0]
            if(selected && fileTypes.includes(selected.type)){
                solutionImage.value = selected
                fileError.value = null
            } else{
                solutionImage.value = null
                fileError.value = 'Please select an image file, jpeg or png'
            }
        }

        const handleSubmit = async () => {
            if(solutionImage.value){
                isPending.value = true
                await uploadImage(solutionImage.value)
                const res = await updateDoc({
                solution: solution.value,
                imageUrl: url.value,
                filePath: filePath.value
                })
                if(!error.value){
                isPending.value = false
                showSolution.value = true
                }
            } 
            solutionImage.value = null
            solution.value = ''
            fileError.value = null
        }


        return { showSolution, handleCloseForm, handleSubmit,handleChange, solution, fileError, isPending }
    }
}
</script>

<style scoped>
.buttons{
    margin: 10px auto;
    display: flex;
    align-items: center;
    justify-content: center;
}
form{
    margin-top: 10px;
}
</style>