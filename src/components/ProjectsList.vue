<template>
  <div v-for="project in projects" :key="project.id" class="container-fluid project-list-wrapper">
    <router-link :to="{ name: 'SingleProject', params: {id: project.id} }" class="route-tag">
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
    </router-link>
  </div>
</template>

<script>
export default {
    props: ['projects']
}
</script>

<style scoped>

.project-list-wrapper{
  padding: 0 !important;
  display:flex;
  justify-content: center;
}
a.route-tag{
  display: flex;
  flex: 1;
}
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
    box-shadow: 2px 2px 10px rgba(50,50,50,0.4);
    transition: all ease 0.1s;
    width: 95%;
    
    
  }
  .single:hover {
    box-shadow: 3px 3px 12px rgba(50,50,50,0.5);
    transform: scale(1.01);
    transition: all ease 0.3s;
    cursor: pointer;
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
    margin: auto;
  }
  img {
    flex:1;
    margin-left: auto;
    margin-right: auto;
    max-width: 150px;
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