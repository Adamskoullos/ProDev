<template>
  <div v-for="project in projects" :key="project.id">
      <div class="row single">
      <div class="col thumbnail">
          <img :src="project.imageUrl" alt="project cover image">
      </div>
      <div class="col">
          <div class="info">
              <h3>{{ project.title }}</h3>
              <p>Project lead: {{ project.userName }}</p>
          </div>
          <div class="tasks">
              <p>Tasks: {{ project.tasks.length }}</p>
          </div>
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
.single {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-radius: 4px;
    background: rgb(63, 63, 63);
    margin: 16px 0;
    transition: all ease 0.2s;
    width: 90%;
    
  }
  .single:hover {
    box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
    transform: scale(1.02);
    transition: all ease 0.2s;
  }
  .thumbnail {
    max-width: 100px;
    max-height: 100px;
    overflow: hidden;
    border-radius: 10px;
  }
  img {
    height: 200px;
    width: 200px;
    display: block;
    z-index: 10;
  }
  .info {
    margin: 0 30px;
  }
  .tasks {
    margin-left: auto;
  }
</style>