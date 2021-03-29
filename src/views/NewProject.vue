<template>
  <form @submit.prevent="addNewProject">
    <h4>Create new project</h4>
    <input type="text" placeholder="Project title" v-model="title" required>
    <textarea placeholder="Description" v-model="description" required></textarea>
    <label>Upload project image</label>
    <input type="file" @change="handleChange">
    <div class="error">{{ fileError }}</div>
    <button>Add new project</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'


export default {
  setup(){
    const title = ref('')
    const description = ref('')
    const projectImage = ref(null)
    const fileTypes = ['image/png', 'image/jpeg']
    const fileError = ref(null)

    const addNewProject = async () => {

    }

    const handleChange = (e) => {
      const selected = e.target.files[0]
      if(selected && fileTypes.includes(selected.type)){
        projectImage.value = selected
        fileError.value = null
      } else{
        projectImage.value = null
        fileError.value = 'Please select an image file, jpeg or png'
      }
    }

    return { title, description, projectImage, fileError, addNewProject, handleChange }
  }
}
</script>

<style>

</style>