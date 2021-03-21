<template>
  <div class="container-fluid view-container">
    <div class="row gx-0 nav-row">
      <div class="col">
        <nav class="navbar navbar-expand-lg ps-3 pe-3 navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">ProDev</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse main-nav" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
                <li class="nav-item">
                  <router-link :to="{ name: 'TeamProjects' }" class="nav-link active" aria-current="page">Team Projects</router-link>
                </li>
                <li class="nav-item">
                  <router-link :to="{ name: 'MyProjects' }" class="nav-link" aria-current="page">My Projects</router-link>
                </li>
                <li class="nav-item">
                  <router-link :to="{ name: 'NewProject' }" class="nav-link" aria-current="page">New Project</router-link>
                </li>
                <li class="nav-item">
                  <router-link :to="{ name: 'Bugs' }" class="nav-link" aria-current="page">Bugs</router-link>
                </li>
                <li class="nav-item">
                  <router-link :to="{ name: 'NewBug' }" class="nav-link" aria-current="page">New Bug</router-link>
                </li>
                <li class="nav-item">
                  <span class="btn nav-link" @click="toggleSideChat">Team Chat</span>
                </li>
              </ul>
              <div class="theme">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                </div>
              </div>
              <div class="user">
                <span>User Name</span>
              </div>
              <button class="btn logout"><span class="material-icons">logout</span></button>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <div class="row content-row gx-0">
      <div class="col content-window">
        <router-view/>
      </div>
      <div v-if="showSideChat" class="col-12 col-lg-4 chat-window">
        <h1>Chat</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'

export default {

    setup(){
        const showSideChat = ref(true)
        const user = ref(true)

        const toggleSideChat = () => {
            showSideChat.value = !showSideChat.value
        }

        return { toggleSideChat, showSideChat, user }
    }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.container-fluid{
  padding-right: 0;
  padding-left: 0;
}
.nav-row{
  min-height: 60px;
  height: 10vh;
}
.main-nav{
  display: flex;
  justify-content: center;
  align-items: center;
}
.view-container{
  min-height: 100vh;
  background: rgb(150, 39, 39);
}
.chat-window{
  min-height: 90vh;
  background: cornflowerblue;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}
.content-window{
  min-height: 90vh;
  background: darkgoldenrod;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.content-row{
  min-height: 10vh;
  background: rgb(71, 94, 66);
  display: flex;
  align-items: stretch;
  justify-content: stretch;
}
.user, .theme{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}
.theme{
  margin-left: auto;
}
.logout{
  display:flex;
  justify-content: center;
  align-items: center;
}
li span{
  margin-right: 10px;
}
</style>
