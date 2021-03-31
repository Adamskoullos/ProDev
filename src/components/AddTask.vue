<template>
  <div class="add-task">
    <button v-if="!addTask" @click="addTask = true">Add tasks</button>
    <form v-if="addTask" @submit.prevent="handleAddTask">
      <input type="text" placeholder="Add task" v-model="task" required>
      <div class="task-buttons">
        <button v-if="!isPending" class="task-buttons">Add</button>
        <button v-if="isPending" class="task-buttons">Adding...</button>
        <button v-if="addTask && !isPending" class="task-buttons" @click="addTask = false">Cancel</button>
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
    const { updateTasks } = useDocument('projects', props.project.id)
    const task = ref('')
    const addTask = ref(false)
    const isPending = ref(false)

    const handleAddTask = async () => {
      isPending.value = true
      addTask.value = true
      const newTask = {
        task: task.value,
        completed: false,
        id: Math.floor(Math.random()*1000000000)
      }
      await updateTasks({
        tasks: [...props.projects.tasks, newTask]
      })
      task.value = ''
      isPending.value = false
      addTask.value = false
    }

    return { handleAddTask, task, addTask, isPending  }
  }
}
</script>

<style scoped>
.add-task{
    max-width: 100%;
    margin-top: 40px;
}
form{
    max-width: 100%;
    text-align: left;
}
.task-buttons{
    display: flex;
    justify-content:flex-start;
}
.task-buttons-close{
    margin-left: 10px;
}
</style>