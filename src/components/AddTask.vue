<template>
  <div class="add-task" :class="{light: light}">
    <button v-if="!addTask" @click="openForm" :class="{light: light}">Add tasks</button>
    <button v-if="addTask && !isPending" @click.prevent="addTask = false" :class="{light: light}">Cancel</button>
    <form v-if="addTask" @submit.prevent="handleAddTask" :class="{light: light}">
      <input type="text" placeholder="Add task" v-model="task" ref="inputEl" :class="{light: light}" autofocus required>
      <div class="task-buttons">
        <button v-if="!isPending" class="task-buttons" :class="{light: light}">Add</button>
        <button v-if="isPending" class="task-buttons" :class="{light: light}">Adding...</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import useDocument from '../composables/useDocument'

export default {
  props: ['projects', 'light'],
  setup(props){
    const { updateDoc } = useDocument('projects', props.projects.id)
    const task = ref('')
    const addTask = ref(false)
    const isPending = ref(false)
    const inputEl = ref<Element>(null)

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

    return { handleAddTask, task, addTask, isPending, inputEl, openForm  }
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
form,
form.light{
  margin-top: 25px;
  padding: 15px;
}
input {
  padding: 10px;
  margin: 10px 0 15px 0;
}
.add-task form{
  min-width: 100%;
  box-shadow: 1px 1px 10px rgba(50,50,50,0.3);
}
.task-buttons{
    display: flex;
    justify-content: center;
    align-items: center;
}
.task-buttons button.light{
  background: rgb(216, 216, 216, 0.5);
  box-shadow: 1px 1px 5px rgba(50,50,50,0.5);
}
.task-buttons button.light:hover{
  box-shadow: 1px 1px 2px rgba(50,50,50,0.3);
  transform: scale(0.97);
}
</style>