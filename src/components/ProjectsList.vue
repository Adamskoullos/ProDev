<template>
  <input type="text" v-model="search" placeholder="Title search" :class="{light: light}">
  <div v-for="project in projectSearch" :key="project.id" class="container-fluid project-list-wrapper">
    <router-link :to="{ name: 'SingleProject', params: {id: project.id} }" class="route-tag">
        <div class=" single row" :class="{light: light}">
          <div class="thumbnail col-12 col-sm-3">
              <img :src="project.imageUrl" alt="project cover image">
          </div>
          <div class="info col-12 col-sm-6" :class="{light: light}">
              <h3>{{ project.title }}</h3>
              <p>Project lead: {{ project.userName }}</p>
          </div>
          <div class="tasks col-12 col-sm-3" :class="{light: light}">
              <p>Tasks: {{ project.tasks.length }}</p>
          </div>
        </div>
    </router-link>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
export default {
    props: ['projects', 'light'],
    setup(props){
      const search = ref('')

      const projectSearch = computed(() => {
        return props.projects.filter(project => {
          return project.title.toLowerCase().match(search.value.toLowerCase())
        })
      })

      return { search, projectSearch }
    }
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
  margin: 10px 0;
}
.single {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-radius: 4px;
  background: rgb(63, 63, 63, 0.5);
  transition: all ease 0.1s;
  width: 100%;
}
.single.light {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.9);
  transition: all ease 0.1s;
  width: 100%;
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
.info.light h3,
.info.light p{
  color: var(--primary);
}
.tasks {
  margin-left: auto;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 150px;
}
.tasks p{
  margin: auto;
}
input[data-v-0b85af30]{
width: 100%;
margin: 10px;
}
</style>