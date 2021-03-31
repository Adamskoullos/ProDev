<template>
    <div>
        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="document" class="container-fluid">
            <div class=" single row">
                <div class=" thumbnail col-12 col-sm-4">
                    <img :src="document.imageUrl" alt="project cover image">
                </div>
                <div class="info col-12 col-sm-8">
                    <h3>{{ document.title }}</h3>
                    <p class="user-name">Project lead: {{ document.userName }}</p>
                    <p>{{ document.description }}</p>
                </div>
                <button v-if="ownership && !isPending" @click="handleDelete">Project Complete</button>
                <button v-if="isPending" class="loading">Completing...</button>
                <div class="tasks col-12">
                    <h3>Tasks</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import useStorage from '../composables/useStorage'
import useDocument from '../composables/useDocument'
import getDocument from '../composables/getDocument'
import getUser from '../composables/getUser'
import { useRouter } from 'vue-router'
import { computed, ref } from '@vue/runtime-core'

export default {
    props: ['id', 'light'],
    components: {},
    setup(props){
        const { deleteImage } = useStorage()
        const { deleteDoc, error } = useDocument('projects', props.id)
        const { document } = getDocument('projects', props.id)
        const { user } = getUser()
        const router = useRouter()
        const isPending =ref(false)

        const ownership = computed(()=> {
            return document.value && user.value && user.value.uid == document.value.userId
        })

        const handleDelete = async () => {
            isPending.value = true
            await deleteDoc()
            await deleteImage(document.value.filePath)
            isPending.value = false
            router.push({ name: 'MyProjects' })
        }

        return { document, error, ownership, handleDelete, isPending }
    }
}
</script>

<style>
.single.row{
  margin: 10px auto;
}
.single {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border-radius: 4px;
    background: rgb(63, 63, 63);
    box-shadow: 2px 2px 20px rgba(50,50,50,0.4);
    width: 95%;
  }
  
  .thumbnail {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 150px;
    min-width: 100px;
    min-height: 100px;
    max-height: 150px;
    overflow: hidden;
    border-radius: 4px;
    border: 1px;
    background: rgb(63, 63, 63);
  }
  img {
    flex:1;
    margin-left: auto;
    margin-right: auto;
    max-width: 150px;
    border-radius: 4px;
    border: 1px;
  }
  .info{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
  }
  .info h3{
      margin-top: 15px
  }
  p.user-name{
      margin-top: 0px;
  }
  .tasks{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
  }
  .tasks h3{
      margin: 15px auto;
  }
  .single button{
      margin: 15px auto;
  }
</style>