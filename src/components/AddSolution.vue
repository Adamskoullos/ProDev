<template>
    <div class="buttons">
        <button v-if="showSolution" @click="handleCloseForm" :class="{light: light}">Cancel</button>
        <button v-if="!bug.solved && !showSolution" @click="showSolution = true" :class="{light: light}">Add Solution</button>
    </div>
    <form v-if="showSolution" @submit.prevent="handleSubmit" :class="{light: light}">
        <h5 :class="{light: light}">Add solution details</h5>
        <textarea placeholder="Solution details" v-model="solution" required :class="{light: light}"></textarea>
        <div class="buttons">
            <label for="file-upload" class="file-upload-button" :class="{light: light}">Upload solution image</label>
            <input id="file-upload" type="file" @change="handleChange">
        </div>
        <div class="error">{{ fileError }}</div>
        <div class="buttons">
            <button v-if="!isPending" :class="{light: light}">Submit solution</button>
            <button v-if="isPending" class="loading" :class="{light: light}">Uploading...</button>  
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
    props: ['bug', 'light'],
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
                showSolution.value = false
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
    min-width: 100%;
    padding: 20px;
}
form.light{
    margin: 15px auto;
    
}
form h5.light{
    color: var(--primary)
}
input[type="file"]{
  display: none;
}
.file-upload-button{
  background: rgb(75, 75, 75);
  color:rgb(206, 206, 206);
  border-radius: 8px;
  border: 0;
  padding: 10px 12px;
  font-weight: 600;
  cursor: pointer;
  display: inline-block;
  margin: auto;
  box-shadow: 1px 2px 10px rgba(50,50,50,0.8);
  border: 0px solid  var(--secondary);
  transition: all ease 0.2s;
}
.file-upload-button[data-v-6761eb8c].light{
    background: rgb(216, 216, 216, 0.5);
    color: var(--primary);
    box-shadow: 1px 1px 5px rgba(50,50,50,0.5);
}
.file-upload-button[data-v-6761eb8c].light:hover{
    box-shadow: 1px 1px 2px rgba(50,50,50,0.3);
    transform: scale(0.97);
}
.buttons button.light{
    background: rgb(216, 216, 216, 0.5);
}
.buttons button.light:hover{
    box-shadow: 1px 1px 2px rgba(50,50,50,0.3);
    transform: scale(0.97);
}
.file-upload-button:hover{
  color: rgb(51, 179, 1);
  box-shadow: 1px 2px 4px rgba(50,50,50,0.3);
  transform: scale(0.97);
  transition: all ease 0.3s;
}
</style>