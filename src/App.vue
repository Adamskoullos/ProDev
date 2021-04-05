<template>
  <div class="container-fluid">
    <div class="row main-row" :class="{light: light}">
      <transition name="side-nav" appear 
      @before-enter="sideNavBeforeEnter"
      @enter="sideNavEnter"
      @before-leave="sideNavBeforeLeave"
      @leave="sideNavLeave">
        <div class="col-2 side-nav" v-if="showSideNav && user" :class="{light: light}">
          <nav :class="{light: light}">
            <div class="logo" :class="{light: light}">
            <router-link :to="{ name: 'MyProjects' }" :class="{light: light}"><h3 :class="{light: light}">ProDev</h3></router-link>
            </div>
            <div class="nav-spacer">
            </div>
            <ul class="navbar-nav mb-2 mb-lg-0">
              <li class="nav-item" @click="toggleSideChat" :class="{light: light}">
                  <span :class="{light: light}" class="chat-side-nav">Team Chat</span>
              </li>
              <li class="nav-item" :class="{light: light}">
                  <router-link :to="{ name: 'TeamProjects' }" :class="{light: light}" class="projects">Team Projects</router-link>
              </li>
              <li class="nav-item" :class="{light: light}">
                  <router-link :to="{ name: 'MyProjects' }" :class="{light: light}" class="projects">My Projects</router-link>
              </li>
              <li class="nav-item" :class="{light: light}">
                  <router-link :to="{ name: 'NewProject' }" :class="{light: light}" class="projects">New Project</router-link>
              </li>
              <li class="nav-item" :class="{light: light}">
                  <router-link :to="{ name: 'Bugs' }" :class="{light: light}" class="bugs">Bugs</router-link>
              </li>
              <li class="nav-item" :class="{light: light}">
                  <router-link :to="{ name: 'NewBug' }" :class="{light: light}" class="bugs">New Bug</router-link>
              </li>
              <li class="nav-item" :class="{light: light}">
                  <router-link :to="{ name: 'Email' }" :class="{light: light}" class="util">Report Issue</router-link>
              </li>
            </ul>
          </nav>
          <div class="dark-mode" :class="{light: light}">
              <div  class="nav-item" :class="{light: light}" @click="toggleMode">
                <span :class="{light: light}" class="util">Mode</span>
              </div> 
          </div>
        </div>
      </transition>
      <div class="col main-col" :class="{ light: light }">
        <transition name="top-bar" appear
        @before-enter="topBarBeforeEnter"
        @enter="topBarEnter"
        @before-leave="topBarBeforeLeave"
        @leave="topBarLeave">
          <div class="row top-bar-row" :class="{light: light}">
          <div class="col top-bar-col" :class="{light: light}" v-if="showTopBar">
              <nav v-if="!user" class="top-nav no-auth-nav" :class="{light: light}">
                <div class="no-auth-logo">
                  <router-link :to="{ name: 'Home' }"><h1 :class="{light: light}">ProDev</h1></router-link>
                </div>
                <div class="no-auth no-auth-login">
                  <router-link :to="{ name: 'Login' }"><h3 :class="{light: light}">Login</h3></router-link>
                </div>
                <div class="no-auth">
                  <router-link :to="{ name: 'Signup' }"><h3 :class="{light: light}">Signup</h3></router-link>
                </div>
              </nav>
              <nav class="top-nav" v-if="!showSideNav && user" :class="{light: light}">
                <div class="view-icons" v-if="user">
                  <router-link :to="{ name: 'MyProjects' }">
                    <span class="material-icons projects" :class="{light: light}">folder</span>
                  </router-link>
                </div>
                <div class="view-icons" v-if="user">
                  <router-link :to="{ name: 'Bugs' }">
                    <span class="material-icons bugs" :class="{light: light}">bug_report</span>
                  </router-link>
                </div>
                <div class="view-icons">
                  <router-link :to="{ name: 'Chat' }">
                    <span class="material-icons chat" :class="{light: light}">chat_bubble</span>
                  </router-link>
                </div>
              </nav>
            <div class="user-name" :class="{light: light}" >
              <h3 :class="{light: light}" v-if="user">{{ user.displayName }}</h3>
            </div>
            <div class="logout" :class="{light: light}" v-if="user" @click="handleLogout">
              <span v-if="!isPending" :class="{light: light}" class="material-icons util">logout</span>
              <span v-if="isPending" class="material-icons" :class="{light: light}">autorenew</span>
            </div>
          </div>
          </div>
        </transition>
        <div class="row content-row" :class="{light: light}">
          <div class="col content-col" :class="{light: light}">
            <div class="col-12 chat-col side-chat-window" :class="{light: light}" v-if="showSideChat && !showSideNav">
              <Chat :light="light" />
            </div>
            <router-view :light="light" 
            @signedUp="handleLogin"
            @login="handleLogin" 
            v-if="
            (!showSideChat && !showSideNav) || 
            (!showSideChat && showSideNav) || 
            (showSideNav)" 
            v-slot="{ Component }">
              <transition name="route" mode="out-in">
                <component :is="Component"></component>
              </transition>  
            </router-view>
          </div>
          <transition name="slideSideChat"
          @before-enter="sideChatBeforeEnter"
          @enter="sideChatEnter"
          @before-leave="sideChatBeforeLeave"
          @leave="sideChatLeave">
            <div class="col-12 col-md-4 chat-col side-chat-window" :class="{light: light}" v-if="showSideChat && showSideNav">
              <Chat :light="light" />
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { onBeforeMount, onUnmounted, onBeforeUpdate, onUpdated } from '@vue/runtime-core'
import Chat from './views/Chat'
import { useRoute, useRouter } from 'vue-router'
import gsap from 'gsap'
import useLogout from './composables/useLogout'
import getUser from './composables/getUser'


export default {
components: { Chat },
    setup(){
        const showSideChat = ref(false)
        const showSideNav = ref(true)
        const showTopBar = ref(true)
        const router = useRouter()
        const light =ref(false)
        const { logout, error, isPending } = useLogout()
        const { user } = getUser()
        const route = useRoute()

        onBeforeMount(()=> {
            if(visualViewport.width < 1100){
              showSideNav.value = false
              showSideChat.value = false
            }
            if(visualViewport.width > 1100){
                showSideNav.value = true
            }
          })

          window.addEventListener('resize', () =>{
            if(visualViewport.width < 1100){
              showSideNav.value = false
              showSideChat.value = false
            }
            if(visualViewport.width > 1100 && user.value){
              showSideNav.value = true
              if(route.name == 'Chat'){
                router.push({ name: 'MyProjects' })
                showSideChat.value = true
              }
            }
          
        })
        
        onBeforeUpdate(() => {
          if(visualViewport.width < 1100){
              showSideNav.value = false
              showSideChat.value = false
            }
            if(visualViewport.width > 1100 && user.value){
              showSideNav.value = true
            }
        })

        onUnmounted(() => {
          window.removeEventListener()
        })

        const toggleMode = () => {
          light.value = !light.value
        }

        
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
            duration: 0.8,
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

        const sideChatBeforeEnter = (el) => {
          el.style.transform = 'translateX(600px)'
          el.style.opacity = 0
        }

        const sideChatEnter = (el) => {
          gsap.to(el, {
            x:0,
            opacity: 1,
            duration: 0.1,
            ease: 'sine',
            
          })
        }

        const sideChatBeforeLeave = (el) => {
          el.style.transform = 'translateX(0)'
          el.style.opacity = 1
        }

        const sideChatLeave = (el) => {
          gsap.to(el, {
            x:600,
            opacity: 0,
            duration: 0.1,
            ease: 'sine',
            
          })
        }

        const handleLogout = async () => {
            await logout()
            light.value = false
            showSideChat.value = false
            router.push({name: 'Login' })
        } 
        const handleLogin = () => {
          showTopBar.value = false
          showTopBar.value = true
          if(visualViewport.width < 1100){
              showSideNav.value = false
              showSideChat.value = false
          }
          if(visualViewport.width > 1100 && user.value){
            showSideNav.value = true
          }
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
          sideNavLeave,
          sideChatBeforeEnter,
          sideChatEnter,
          sideChatBeforeLeave,
          sideChatLeave,
          toggleMode,
          light,
          handleLogout,
          error,
          isPending,
          handleLogin,
          showTopBar}
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
.content-col::-webkit-scrollbar {
    width: 0px;               /* width of the entire scrollbar */
}

.content-col::-webkit-scrollbar-track {
background: rgb(75,75,75);        /* color of the tracking area */
}

.content-col::-webkit-scrollbar-thumb {
background-color: rgb(75,75,75);    /* color of the scroll thumb */
border-radius: 20px;       /* roundness of the scroll thumb */
border: 0px solid rbg(75,75,75);  /* creates padding around scroll thumb */
}
/** Default dark mode  ****************/

.chat-col{
  box-shadow: -3px 3px 16px rgba(50,50,50,0.6);
}
.side-nav{
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  background: rgb(63, 63, 63);
  max-width: 200px;
  margin: 0px;
  border-radius: 0px;
  border: 0px solid  var(--secondary);
  z-index: 4;
  box-shadow: 4px 1px 17px rgba(0, 0, 0, 0.5);
  color: rgb(188, 202, 170);
}

.main-row{
  min-height: 100vh;
  position: relative;
  background: rgb(75, 75, 75);
}
.main-col{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.top-bar-row{
  min-height: 60px;
  z-index: 3;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}
.top-bar-col{
  display: flex;
  align-items: center;
  box-shadow: 3px 8px 15px rgb(0, 0, 0, 0.3);
  border: 0px solid  var(--secondary);
  border-radius: 8px;
  margin: 0px;
  z-index: 3;
  min-height: 60px;
  background: rgb(63, 63, 63);
  border-radius: 0px;
}
.content-row{
  padding-top: 60px;
  background: var(--background-b);
  flex: 1;
  position: relative;
  background: rgb(75, 75, 75);
  max-height: 100vh;
}
.content-col{
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 0;
  background: rgb(75, 75, 75);
  padding-top: 30px;
}
.chat-col{
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: var(--background-b);
  z-index: 1;
  background: rgb(75, 75, 75);
  box-shadow: -3px 3px 16px rgba(50,50,50,0.6);
  padding-top: 30px;
}

/** Light mode ***************************************/
.main-row.light{
  background: rgb(216, 216, 216);
}
.side-nav.light{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  background: rgb(255, 255, 255);
  max-width: 200px;
  margin: 0px;
  border-radius: 0px;
  box-shadow: 4px 1px 17px rgba(50,50,50,0.5);
  border: 0px solid  var(--secondary);
  z-index: 4;
}
.main-row{
  max-height: 100vh;
  position: relative;
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
.top-bar-col.light{
  display: flex;
  align-items: center;
  box-shadow: 2px 2px 13px rgba(50,50,50,0.4);
  border: 0px solid  var(--secondary);
  border-radius: 8px;
  margin: 0px;
  z-index: 3;
  min-height: 60px;
  background: rgb(255, 255, 255);
  border-radius: 0px;
}
.content-row.light{
  background: rgb(216, 216, 216);
  flex: 1;
  position: relative;
}
.content-col.light{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 0;
  background: rgb(216, 216, 216);
}
.chat-col.light{
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: rgb(216, 216, 216);
  box-shadow: -3px 1px 13px rgba(50,50,50,0.3);
  z-index: 1;
}

/* Inner layout styling for side nav elements ******************************/
.navbar-expand-md .navbar-nav{ 
    flex-direction: column;
}
.nav-spacer{
  height: 50px;
}
.dark-mode{
  margin-top: 100px;
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
/** Dark mode nav items ************************/
.nav-item{
    box-shadow: 3px 6px 10px rgba(50,50,50,0.9);
    transition: all ease 0.2s;
    background:rgb(64, 64, 64);
    border-radius: 8px;
    border: 0;
    padding: 0px 0px;
    font-weight: 600;
    cursor: pointer;
    display: inline-block;
    width: 100%;
    color: var(--primary);
  }
  .nav-item:hover{
    box-shadow: 2px 3px 8px rgba(50,50,50,0.3);
    transform: scale(0.97);
    transition: all ease 0.2s;
  }
.nav-item span,
.nav-item a{
    display: block;
    padding: 10px 12px;
    border-radius: 4px;
  }
  .nav-item span:hover{
    color: rgb(51, 179, 1);
  }
  span.material-icons:hover{
  color: rgb(51, 179, 1);
}
.no-auth h3:hover{
  color: rgb(226, 226, 226);
}
.user-name h3{
  color: rgb(236, 236, 236);
}
.logo h3:hover{
  color: rgb(45, 144, 236);
}
.projects a:hover{
  color: rgb(51, 179, 1);
}

span.chat:hover{
  color: rgb(119, 0, 230);
}
span.chat-side-nav:hover{
  color: rgb(160, 58, 255);
}
.bugs:hover,
span.bugs:hover{
  color: rgb(17,116,221);
}
span.util:hover{
  color: rgb(216, 158, 0);
}
 a.util:hover{
    color: rgb(216, 158, 0);
  }
/* Light mode nav items ************************/
.nav-item.light{
  background:rgb(255, 255, 255);
  color: var(--primary);
  box-shadow: 1px 2px 12px rgba(50,50,50,0.4);
}
.nav-item.light:hover{
  box-shadow: 1px 2px 6px rgba(50,50,50,0.3);
  transform: scale(0.97);
  transition: all ease 0.3s;
  color: var(--primary);
}
.nav-item span.light{
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
span.util.light:hover{
  color: var(--primary);
}
a.light.util:hover{
  color: var(--primary);
}
a.light.projects:hover{
  color: var(--primary);
}
a.light.bugs:hover{
  color: var(--primary);
}
span.projects.light:hover{
  color: var(--primary);
}
span.bugs.light:hover{
  color: var(--primary);
}
span.chat.light:hover{
  color: var(--primary);
}
span.chat-side-nav.light:hover{
  color: var(--primary);
}
h1.light, h2.light,
h3.light, h4.light{
  color: var(--primary)
}
span.material-icons.light{
  color: var(--primary);
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
}

/* Main elements move transitions (when breakpoints are hit)**********/

.side-nav{
  transition: all 0.2s ease;
}
.side-chat-window{
  transition: all 0.2s ease;
}

/* View transition ******************************************/
.route-enter-from{
  opacity: 0;
  transform: translateX(-1500px);
}
.route-enter-active{
  transition: all 0.3s ease-out;
}
.route-leave-to{
  opacity: 0;
  transform: translateX(1500px);
}
.route-leave-active{
  transition: all 0.3s ease-in;
}


/* Side chat slider */
.slideSideChat{
  transition: all 0.1s ease;
}


</style>
