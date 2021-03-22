<template>
  <div class="container-fluid">
    <div class="row main-row">
      <div class="col-2 side-nav" v-if="showSideNav">
            <nav>
              <div class="logo">
                <router-link :to="{ name: 'MyProjects' }" class=""><h3>ProDev</h3></router-link>
              </div>
              <div class="theme">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
                </div>
              </div>
              <ul class="navbar-nav mb-2 mb-lg-0">
                <li class="nav-item" @click="toggleSideChat">
                  <span >Team Chat</span>
                </li>
                <li class="nav-item">
                  <router-link :to="{ name: 'TeamProjects' }" class="" aria-current="page">Team Projects</router-link>
                </li>
                <li class="nav-item">
                  <router-link :to="{ name: 'MyProjects' }" class="" aria-current="page">My Projects</router-link>
                </li>
                <li class="nav-item">
                  <router-link :to="{ name: 'NewProject' }" class="" aria-current="page">New Project</router-link>
                </li>
                <li class="nav-item">
                  <router-link :to="{ name: 'Bugs' }" class="" aria-current="page">Bugs</router-link>
                </li>
                <li class="nav-item">
                  <router-link :to="{ name: 'NewBug' }" class="" aria-current="page">New Bug</router-link>
                </li>
                <li class="nav-item">
                  <a class="logout">Logout</a>
                </li>
              </ul>
            </nav>
            
      </div>
      <div class="col main-col">
        <div class="row top-bar-row">
          <div class="col top-bar-col">
            <div class="user">
              <h2>Top bar</h2>
            </div>
          </div>
        </div>
        <div class="row content-row">
          <div class="col content-col">
            <h1>Content Window</h1>
          </div>
          <div class="col-12 col-md-4 chat-col">
            <h1>Chat Window</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { onBeforeMount, onUnmounted } from '@vue/runtime-core'

export default {

    setup(){
        const showSideChat = ref(true)
        const user = ref(true)
        const showSideNav = ref(false)

        onBeforeMount(()=> {
          window.addEventListener('load', ()=> {
            if(visualViewport.width < 900){
              showSideNav.value = false
            }
            if(visualViewport.width > 900){
              showSideNav.value = true 
            }
          }),

          window.addEventListener('resize', () =>{
            if(visualViewport.width < 900){
              showSideNav.value = false
            }
            if(visualViewport.width > 900){
              showSideNav.value = true 
            }
          })
        })

        onUnmounted(() => {
          window.removeEventListener()
        })

        const toggleSideChat = () => {
            showSideChat.value = !showSideChat.value
        }

        

        return { toggleSideChat, showSideChat, user, showSideNav }
    }
}

</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #464646;
}

/* Basic layout and responsiveness for main window*/ 

.side-nav{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: #fff;
  max-width: 200px;
  margin: 0px;
  border-radius: 0px;
  box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
  border: 1px solid  var(--secondary);
}
.main-row{
  max-height: 100vh;
}
.main-col{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.top-bar-row{
  min-height: 60px;
  background: rgb(255, 255, 255);
}
.top-bar-col{
  display: flex;
  align-items: center;
}
.content-row{
  background: lightgray;
  flex: 1;
}
.content-col{
  display: flex;
  justify-content: center;
  align-items: center;
}
.chat-col{
  display: flex;
  justify-content: center;
  align-items: center;
  background: lightslategrey;
}
/* Inner layout styling for side nav elements */
.navbar-expand-md .navbar-nav{ 
    flex-direction: column;
    
}
.navbar{
  display: flex;
  flex-direction: column;
  padding-top: 0;
  padding-bottom: 0;
}
.nav-container-div{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}
.main-nav{
  flex:1;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-around;
  min-height: 100vh;
}
.logo{
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 12px; 
}
.nav-item{
  background: var(--secondary);
  color: var(--primary);
  border-radius: 8px;
  border: 0;
  padding: 10px 12px;
  font-weight: 600;
  cursor: pointer;
  display: inline-block;
  box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
  border: 1px solid  var(--secondary);
  width: 100%;
}
a{
  color: var(--primary);
}
.theme{
  display: flex;
  justify-content: center;
  align-items: center;
}
.theme div{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px auto;
}
.theme input{
  margin-right: -2px;
}
.navbar-nav{
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
}
ul li {
  margin: 10px auto 10px 0;
  min-width: 130px;
}
</style>
