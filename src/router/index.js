import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import TeamProjects from '../views/TeamProjects.vue'
import MyProjects from '../views/MyProjects.vue'
import NewProject from '../views/NewProject.vue'
import Bugs from '../views/Bugs.vue'
import NewBug from '../views/NewBug.vue'
import Chat from '../views/Chat'
import Login from '../views/auth/Login'
import Signup from '../views/auth/Signup'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/team-projects',
    name: 'TeamProjects',
    component: TeamProjects
  },
  {
    path: '/my-projects',
    name: 'MyProjects',
    component: MyProjects
  },
  {
    path: '/new-project',
    name: 'NewProject',
    component: NewProject
  },
  {
    path: '/bugs',
    name: 'Bugs',
    component: Bugs
  },
  {
    path: '/new-bug',
    name: 'NewBug',
    component: NewBug
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
