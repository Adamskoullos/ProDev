<template>
  <div class="add-task">
    <button v-if="!addTask" @click="openForm">Add tasks</button>
    <form v-if="addTask" @submit.prevent="handleAddTask">
      <input type="text" placeholder="Add task" v-model="task" autofocus required>
      <div class="task-buttons">
        <button v-if="!isPending" class="task-buttons">Add</button>
        <button v-if="isPending" class="task-buttons">Adding...</button>
        <button v-if="addTask && !isPending" class="task-buttons" @click.prevent="addTask = false">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import useDocument from '../composables/useDocument'

export default {
  props: ['projects'],
  setup(props){
    const { updateDoc } = useDocument('projects', props.projects.id)
    const task = ref('')
    const addTask = ref(false)
    const isPending = ref(false)
    const focusInput = ref()

    const openForm = () => {
      addTask.value = true
    }

    const handleAddTask = async () => {
      isPending.value = true
      addTask.value = true
      const newTask = {
        task: task.value,
        completed: false,
        id: Math.floor(Math.random()*1000000000)
      }
      await updateDoc({
        tasks: [...props.projects.tasks, newTask]
      })
      task.value = ''
      isPending.value = false
      addTask.value = false
    }

    return { handleAddTask, task, addTask, isPending, openForm, focusInput  }
  }
}
</script>

<style scoped>
.add-task{
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
}
.add-task form{
  min-width: 100%;
  box-shadow: 1px 2px 10px rgba(50,50,50,0.8);
}
.task-buttons{
    display: flex;
    justify-content: center;
    align-items: center;
}
input{
}

</style>