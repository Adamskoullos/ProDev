<template>
  <div v-for="project in projects" :key="project.id">
      <div class="single">
          <div class="thumbnail">
              <img src="project.imageUrl" alt="project cover image">
          </div>
          <div class="info">
              <h3>{{ project.title }}</h3>
              <p>Project lead: {{ project.userName }}</p>
          </div>
          <div class="tasks">
              <p>Tasks: {{ project.tasks.length }}</p>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props: ['projects']
}
</script>

<style>

</style>