<template>
  <input type="text" v-model="search" placeholder="Title search" :class="{light: light}">
  <div v-for="bug in bugSearch" :key="bug.id" class="container-fluid bug-list-wrapper">
    <router-link :to="{ name: 'SingleBug', params: {id: bug.id} }" class="route-tag">
        <div class="single row" :class="{light: light}">
          <div class="top-row">
            <div class="info col-12">
              <span v-if="!bug.solved" class="material-icons not-solved">build_circle</span>
              <span v-if="bug.solved" class="material-icons">verified</span>
              <h3 :class="{light: light}">{{ bug.title }}</h3>
              <p :class="{light: light}">Issued by: {{ bug.userName }}</p>
            </div>
          </div>
          <div class="description col-12">
              <p :class="{light: light}">{{ bug.description }}</p>
          </div>
        </div>
    </router-link>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'

export default {
  props: ['bugs', 'light'],
  setup(props){
    const search = ref('')

    const bugSearch = computed(() => {
      return props.bugs.filter(bug => {
        return bug.title.toLowerCase().match(search.value.toLowerCase())
      })
    })

    return { search, bugSearch }
  }
}
</script>

<style scoped>
.bug-list-wrapper{
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
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  padding: 10px;
  border-radius: 8px;
  background: rgb(63, 63, 63, 0.9);
  transition: all ease 0.1s;
  width: 100%;
}
.single.light{
  background: white;
}
.single:hover {
  box-shadow: 1px 2px 12px rgba(50,50,50,0.2);
  transform: scale(1.02);
  transition: all ease 0.3s;
  cursor: pointer;
}
.single.light:hover{
  box-shadow: 1px 2px 12px rgba(50,50,50,0.3);
  transform: scale(1.02);
}
.top-row{
  display: flex;
  align-items:center;
  justify-content: space-between;
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
  justify-content: space-between;
  align-items:center;
}
.info h3{
  margin: auto;
}
.info p{
  margin: auto;
  font-weight: 200;
}
.info h3.light,
.info p.light{
  color: var(--primary);
}
.description {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
}
.description p{
  margin: auto;
  text-align:justify;
}
.description p.light{
  color: var(--primary);
}
.info span{
  color: rgb(51, 179, 1);
  font-size: 30px;
}
.info span.not-solved{
  font-size: 30px;
  color: rgb(45, 144, 236);
}
input{
  width: 100%;
  margin: 10px;
}
input.light{
  width: 100%;
  margin: 10px;
  border: 2px solid rgb(255, 255, 255, 0.2)
}
input.light:focus{
  border: 2px solid white;
}
</style>