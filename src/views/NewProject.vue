<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create new project</h4>
    <input type="text" placeholder="Project title" v-model="title" required>
    <textarea placeholder="Description" v-model="description" required></textarea>
    <label>Upload project image</label>
    <input type="file" @change="handleChange">
    <div class="error">{{ fileError }}</div>
    <button v-if="!isPending">Add new project</button>
    <button v-if="isPending" class="loading">Uploading...</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useStorage from '../composables/useStorage'
import useCollection from '../composables/useCollection'
import getUser from '../composables/getUser'
import { timestamp } from '../firebase/config'
import { useRouter } from 'vue-router'


export default {
  setup(){
    const title = ref('')
    const description = ref('')
    const projectImage = ref(null)
    const fileTypes = ['image/png', 'image/jpeg']
    const fileError = ref(null)
    const isPending = ref(false)

    const { uploadImage, error, filePath, url } = useStorage()
    const { addDoc } = useCollection('projects')
    const { user } = getUser()
    const router = useRouter()

    const handleSubmit = async () => {
      if(projectImage.value){
        isPending.value = true
        await uploadImage(projectImage.value)
        await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          imageUrl: url.value,
          filePath: filePath.value,
          tasks: [],
          createdAt: timestamp()
        })
        isPending.value = false
        router.push({ name: 'MyProjects' })
      }
      projectImage.value = null
      title.value = ''
      description.value = ''
      fileError.value = null
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

    return { title, description, projectImage, fileError, handleSubmit, handleChange, error, isPending }
  }
}
</script>

<style>

</style>