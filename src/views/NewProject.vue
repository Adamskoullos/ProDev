<template>
  <div class="row">
    <form @submit.prevent="handleSubmit" class="col-12">
      <h4>Create new project</h4>
      <input type="text" placeholder="Project title" v-model="title" required>
      <textarea placeholder="Description" v-model="description" required></textarea>
      <label for="file-upload" class="file-upload-button">Upload project image</label>
      <input id="file-upload" type="file" @change="handleChange">
      <div class="error">{{ fileError }}</div>
      <button v-if="!isPending">Add new project</button>
      <button v-if="isPending" class="loading">Uploading...</button>
    </form>
  </div>
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
        const res = await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          imageUrl: url.value,
          filePath: filePath.value,
          tasks: [],
          createdAt: timestamp()
        })
        if(!error.value){
          isPending.value = false
          router.push({ name: 'SingleProject', params: { id: res.id } })
        }
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

<style scoped>
.row{
    flex:1;
    flex-direction: column;
    align-items: stretch;
    max-width: 95%;
}
form{
  margin-top: 10vh;
  width: 100%;
  max-width: 600px;
}
input[type="file"]{
  display: none;
}
.file-upload-button{
  background: rgb(75, 75, 75);
  color:rgb(206, 206, 206);
  border-radius: 4px;
  border: 0;
  padding: 10px 12px;
  font-weight: 600;
  cursor: pointer;
  display: inline-block;
  margin: auto 5px;
  box-shadow: 1px 2px 10px rgba(50,50,50,0.8);
  border: 0px solid  var(--secondary);
  transition: all ease 0.2s;
}
.file-upload-button:hover{
  color: rgb(51, 179, 1);
  box-shadow: 1px 2px 6px rgba(50,50,50,0.3);
  transform: scale(0.94);
  transition: all ease 0.3s;
}
</style>