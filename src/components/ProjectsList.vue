<template>
  <div v-for="project in projects" :key="project.id" class="container-fluid project-list-wrapper">
    <div class=" single row">
      <div class=" thumbnail col-12 col-sm-3">
          <img :src="project.imageUrl" alt="project cover image">
      </div>
      <div class="info col-12 col-sm-6">
          <h3>{{ project.title }}</h3>
          <p>Project lead: {{ project.userName }}</p>
      </div>
      <div class="tasks col-12 col-sm-3">
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
.container-fluid{
}
.project-list-wrapper{
  padding: 0 !important;
  display:flex;
  justify-content: center;
  
}
.single.row{
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}
.single {
    display: flex;
    /* flex:1; */
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border-radius: 4px;
    background: rgb(63, 63, 63);
    box-shadow: 1px 1px 10px rgba(50,50,50,0.5);
    margin:  15px auto;
    transition: all ease 0.2s;
    width: 95%;
    
    
  }
  .single:hover {
    box-shadow: 2px 2px 15px rgba(50,50,50,0.5);
    transform: scale(1.02);
    transition: all ease 0.2s;
  }
  .thumbnail {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 200px;
    min-width: 100px;
    min-height: 100px;
    max-height: 150px;
    overflow: hidden;
    border-radius: 4px;
    margin: auto;
  }
  img {
    flex:1;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    border-radius: 4px;
  }
  .info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
  }
  .info h3{
    margin: 15px auto 5px auto;
  }
  .info p{
    margin: 5px auto 15px auto;
  }
  .tasks {
    margin-left: auto;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tasks p{
    margin: auto;
  }
</style>