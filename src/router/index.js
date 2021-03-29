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
    component: TeamProjects,
    props: true
  },
  {
    path: '/my-projects',
    name: 'MyProjects',
    component: MyProjects,
    props: true
  },
  {
    path: '/new-project',
    name: 'NewProject',
    component: NewProject,
    props: true
  },
  {
    path: '/bugs',
    name: 'Bugs',
    component: Bugs,
    props: true
  },
  {
    path: '/new-bug',
    name: 'NewBug',
    component: NewBug,
    props: true
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    props: true
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
