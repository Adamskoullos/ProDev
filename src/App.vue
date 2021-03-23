<template>
  <div class="container-fluid">
    <div class="row main-row">
      <transition name="side-nav" appear 
      @before-enter="sideNavBeforeEnter"
      @enter="sideNavEnter"
      @before-leave="sideNavBeforeLeave"
      @leave="sideNavLeave">
        <div class="col-2 side-nav" v-if="showSideNav && user">
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
                <router-link :to="{ name: 'TeamProjects' }">Team Projects</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'MyProjects' }">My Projects</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'NewProject' }">New Project</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'Bugs' }">Bugs</router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{ name: 'NewBug' }">New Bug</router-link>
            </li>
          </ul>
      </nav>
        </div>
      </transition>
      <div class="col main-col">
        <transition name="top-bar" appear
        @before-enter="topBarBeforeEnter"
        @enter="topBarEnter"
        @before-leave="topBarBeforeLeave"
        @leave="topBarLeave">
          <div class="row top-bar-row">
          <div class="col top-bar-col">
            
              <nav v-if="!user" class="top-nav no-auth-nav">
                <div class="no-auth-logo">
                  <span><h1>ProDev</h1></span>
                </div>
                <div class="no-auth no-auth-login">
                  <router-link :to="{ name: 'Login' }"><h3>Login</h3></router-link>
                </div>
                <div class="no-auth">
                  <router-link :to="{ name: 'Signup' }"><h3>Signup</h3></router-link>
                </div>
              </nav>
              <nav class="top-nav" v-if="!showSideNav && user">
                <div class="view-icons" v-if="user">
                  <router-link :to="{ name: 'MyProjects' }">
                    <span class="material-icons">folder</span>
                  </router-link>
                </div>
                <div class="view-icons" v-if="user">
                  <router-link :to="{ name: 'Bugs' }">
                    <span class="material-icons">bug_report</span>
                  </router-link>
                </div>
                <div class="view-icons">
                  <router-link :to="{ name: 'Chat' }">
                    <span class="material-icons">chat_bubble</span>
                  </router-link>
                </div>
              </nav>
            
            <div class="user-name" v-if="user">
              <h3>User Name</h3>
            </div>
            <div class="logout" v-if="user">
              <span class="material-icons">logout</span>
            </div>
          </div>
          </div>
        </transition>
        <div class="row content-row">
          <div class="col content-col">
            <div class="col-12 chat-col" v-if="showSideChat && !showSideNav">
              <Chat />
            </div>
            <router-view v-if="(!showSideChat && !showSideNav) || (!showSideChat && showSideNav) || (showSideNav)"/>
          </div>
          <div class="col-12 col-md-4 chat-col side-chat-window" v-if="showSideChat && showSideNav">
            <Chat />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { onBeforeMount, onUnmounted } from '@vue/runtime-core'
import Chat from './views/Chat'
import { useRouter } from 'vue-router'
import gsap from 'gsap'


export default {
components: { Chat },
    setup(){
        const showSideChat = ref(false)
        const user = ref(true)
        const showSideNav = ref(false)
        const router = useRouter()

        onBeforeMount(()=> {
          window.addEventListener('load', ()=> {
            if(visualViewport.width < 1200){
              showSideNav.value = false
              showSideChat.value = false
            }
            if(visualViewport.width > 1200){
              showSideNav.value = true 
            }
          }),

          window.addEventListener('resize', () =>{
            if(visualViewport.width < 1200){
              showSideNav.value = false
              showSideChat.value = false
            }
            if(visualViewport.width > 1200){
              showSideNav.value = true
              router.push({ name: 'MyProjects' }) 
            }
          })
        })

        onUnmounted(() => {
          window.removeEventListener()
        })

        const toggleSideChat = () => {
            showSideChat.value = !showSideChat.value
        }

        const topBarBeforeEnter = (el) => {
          el.style.transform = 'translateY(-200px)'
          el.style.opacity = 0
        }

        const topBarEnter = (el) => {
          gsap.to(el, {
            y:0,
            opacity: 1,
            duration: 1.5,
            ease: 'sine',
            delay: 0.5
          })
        }

        const topBarBeforeLeave = (el) => {
          el.style.transform = 'translateY(0)'
          ell.style.opacity = 1
        }

        const topBarLeave = (el) => {
          gsap.to(el, {
            y:-200,
            opacity: 0,
            duration: 1,
            ease: 'sine',
            delay: 1
          })
        }

        const sideNavBeforeEnter = (el) => {
          el.style.transform = 'translateX(-400px)'
          el.style.opacity = 0
        }

        const sideNavEnter = (el) => {
          gsap.to(el, {
            x:0,
            opacity: 1,
            duration: 0.6,
            ease: 'sine',
            
          })
        }

        const sideNavBeforeLeave = (el) => {
          el.style.transform = 'translateX(0)'
          el.style.opacity = 1
        }

        const sideNavLeave = (el) => {
          gsap.to(el, {
            x:-400,
            opacity: 0,
            duration: 0.3,
            ease: 'sine',
            
          })
        }
        

        return { 
          toggleSideChat, 
          showSideChat, 
          user, 
          showSideNav, 
          topBarBeforeEnter, 
          topBarEnter, 
          sideNavBeforeEnter, 
          sideNavEnter,
          topBarBeforeLeave,
          topBarLeave,
          sideNavBeforeLeave,
          sideNavLeave}
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

/* Basic layout and responsiveness for main window - Main view, side chat, side nav, top bar */ 

.side-nav{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: rgb(188, 202, 170);
  max-width: 200px;
  margin: 0px;
  border-radius: 0px;
  box-shadow: 4px 1px 17px rgba(50,50,50,0.5);
  border: 0px solid  var(--secondary);
  z-index: 4;
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
  z-index: 3;
}
.top-bar-col{
  display: flex;
  align-items: center;
  box-shadow: 4px 4px 15px rgba(50,50,50,0.4);
  border: 0px solid  var(--secondary);
  border-radius: 8px;
  margin: 1px;
  z-index: 3;
  min-height: 60px;
  background: rgb(188, 202, 170);
  border-radius: 0px;
}
.content-row{
  background: var(--background-b);
  flex: 1;
}
.content-col{
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
}
.chat-col{
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--background-b);
  box-shadow: -3px 1px 13px rgba(50,50,50,0.3);
  z-index: 1;
}
/* Inner layout styling for side nav elements ******************************/
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
  background:rgb(188, 202, 170);
  color: var(--primary);
  border-radius: 8px;
  border: 0;
  padding: 10px 12px;
  font-weight: 600;
  cursor: pointer;
  display: inline-block;
  box-shadow: 1px 3px 12px rgba(50,50,50,0.5);
  border: 0px solid  var(--secondary);
  width: 100%;
  transition: all ease 0.2s;
}
.nav-item:hover{
  box-shadow: 1px 2px 6px rgba(50,50,50,0.3);
  transform: scale(0.96);
  transition: all ease 0.3s;
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
ul li a{
  display: block;
}
/* Top Bar *******************************************/
.top-nav{
  display: flex;
  align-items: center;
  z-index: 2;
}
.user-name{
  margin: auto 5px auto auto;
}
.logout span{
  margin: auto 10px auto 12px;
  transition: all ease 0.2s;
}
.logout span:hover{
  box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
  transform: scale(1.13);
  transition: all ease 0.2s;
  color: var(--primary);
  cursor: pointer;
}
.view-icons{
  margin: auto 12px;
  transition: all ease 0.2s;
}
.view-icons:hover{
  box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
  transform: scale(1.13);
  transition: all ease 0.2s;
  color: var(--primary);
  cursor: pointer;
}
span.material-icons{
  font-size: 30px;
  display: block;
}
.chat{
  margin-right: auto;
}
/* Top bar when user not logged in ******************************/

.no-auth-nav{
  box-sizing: border-box;
  flex:1;
  display: flex;
  justify-content: flex-end
}
.no-auth-logo{
  margin: auto auto auto 20px;
}
.no-auth{
  margin: auto 20px;
}
.no-auth-login{
  margin-left: auto;
}
.no-auth h3{
  transition: all ease 0.2s;
}
.no-auth h3:hover{
  transform: scale(1.05);
  transition: all ease 0.2s;
  color: var(--primary);
}

/* Main elements move transitions (when breakpoints are hit)**********/

.side-nav{
  transition: all 0.2s ease;
}

/* View transition ******************************************/


</style>
