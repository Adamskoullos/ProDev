<template>
    <div>
        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="document" class="">
            <div class=" single row" :class="{light: light}">
                <div class=" thumbnail col-12 col-sm-4" :class="{light: light}">
                    <img :src="document.imageUrl" alt="project cover image" :class="{light: light}">
                </div>
                <div class="info col-12 col-sm-8">
                    <h3 :class="{light: light}">{{ document.title }}</h3>
                    <p class="user-name" :class="{light: light}">Project lead: {{ document.userName }}</p>
                    <p :class="{light: light}">{{ document.description }}</p>
                </div>
                <button v-if="ownership && !isPending" @click="handleDelete" class=" big" :class="{light: light}">Project Complete</button>
                <button v-if="isPending" class="loading big" :class="{light: light}">Completing...</button>
                <div class="tasks col-12">
                    <h4 :class="{light: light}">Tasks</h4>
                    <div v-for="task in document.tasks" :key="task.id" class="single-task">
                        <div class="task" :class="{ complete: task.completed, light: light}">
                            <div class="actions">
                                <div class="details">
                                    <p :class="{light: light}">{{ task.task }}</p>
                                </div>
                                <div class="icons" v-if="ownership">
                                    <span class="material-icons" @click="handleDeleteTask(task.id)" :class="{light: light}">delete</span> 
                                    <span class="material-icons" @click="handleTaskComplete(task.id)" :class="{light: light}">done</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <AddTask v-if="ownership" :projects="document" :light="light"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AddTask from '../components/AddTask'
import useStorage from '../composables/useStorage'
import useDocument from '../composables/useDocument'
import getDocument from '../composables/getDocument'
import getUser from '../composables/getUser'
import { useRouter } from 'vue-router'
import { computed, ref } from '@vue/runtime-core'

export default {
    props: ['id', 'light'],
    components: { AddTask },
    setup(props){
        const { deleteImage } = useStorage()
        const { deleteDoc, updateDoc, error } = useDocument('projects', props.id)
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

        const handleTaskComplete = async (id) => {
            const tasks = document.value.tasks.map(task => {
              if (task.id == id){
                task.completed = !task.completed
              }
              return task
            })
            await updateDoc({
              tasks: tasks
            })
        }

        const handleDeleteTask = async (id) => {
            const tasks = document.value.tasks.filter(task => task.id != id)
            await updateDoc({
              tasks: [...tasks]
            })
        }

        return { document, error, ownership, handleDelete, isPending, handleTaskComplete, handleDeleteTask }
    }
}
</script>

<style scoped>

.single.row{
  margin: 10px auto;
}
.single {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 20px;
    border-radius: 4px;
    background: rgb(63, 63, 63, 0.0);
  }
  
  .thumbnail {
    display: flex;
    justify-content:center;
    align-items: center;
    min-width: 100px;
    min-height: 100px;
    max-height: 150px;
    overflow: hidden;
    border-radius: 8px;
    border: 1px;
  }
  img {
    flex:1;
    margin-left: auto;
    margin-right: auto;
    max-width: 150px;
    border-radius: 8px;
    border: 1px;
  }
  .info{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }
  .info h3{
      margin-top: 5px;
      margin-bottom: 3px;
  }
  p.user-name{
      font-weight: 200;
  }
  .tasks{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      width: 100%;
      padding: 0;
  }
  .tasks h4{
      margin: 15px auto;
  }
  .single button.big{
      margin: 15px auto;
  }
   .single button.big:hover {
    
    color: rgb(51, 179, 1);
    box-shadow: 1px 2px 5px rgba(50,50,50,0.3);
    transform: scale(0.98);
    transition: all ease 0.3s;
  }
  
  .task{
      background: rgb(63, 63, 63, 0.3);
      border-radius: 4px;
      box-shadow: 1px 1px 10px rgba(50,50,50,0.8);
      min-height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-left: 6px solid rgb(119, 0, 230);
      margin: 10px auto;
  }
  .task.light{
      background: white;
      box-shadow: 1px 1px 10px rgba(50,50,50,0.3);
  }
  .actions{
      min-width: 100%;
      display: flex;
      align-items: center;
      justify-content:stretch;
  }
  .icons{
      min-width: 75px;
      display: flex;
      align-items: center;
      margin: auto 15px auto auto;
  }
  .material-icons{
      font-size: 24px;
      color: #bbb;
      cursor: pointer;
      margin: auto ;
      display: block;
  }
  .material-icons:hover {
    color: rgb(51, 179, 1);
    transform: scale(1.3);
    transition: all ease 0.2s;
  }
  .details{
      display: flex;
      align-items: center;
      
  }
  .details p{
      margin: 5px auto 5px 15px;
      line-height: 2rem;
      font-size: 1.15rem;
  }
  .complete{
      border-left: 6px solid rgb(51, 179, 1);
  }
</style>