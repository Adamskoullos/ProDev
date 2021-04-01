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
import SingleProject from '../views/SingleProject.vue'
import SingleBug from '../views/SingleBug.vue'

import { fAuth } from '../firebase/config'

const requireAuth = (to, from, next) => {
  const user = fAuth.currentUser
  if(!user){
    next({ name: 'Home' })
  } else{
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/projects',
    name: 'TeamProjects',
    component: TeamProjects,
    props: true,
    beforeEnter: requireAuth
  },
  {
    path: '/projects/user',
    name: 'MyProjects',
    component: MyProjects,
    props: true,
    beforeEnter: requireAuth
  },
  {
    path: '/projects/new',
    name: 'NewProject',
    component: NewProject,
    props: true,
    beforeEnter: requireAuth
  },
  {
    path: '/projects/:id',
    name: 'SingleProject',
    component: SingleProject,
    props: true,
    beforeEnter: requireAuth
  },
  {
    path: '/bugs',
    name: 'Bugs',
    component: Bugs,
    props: true,
    beforeEnter: requireAuth
  },
  {
    path: '/bugs/new',
    name: 'NewBug',
    component: NewBug,
    props: true,
    beforeEnter: requireAuth
  },
  {
    path: '/bugs/:id',
    name: 'SingleBug',
    component: SingleBug,
    props: true,
    beforeEnter: requireAuth
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    props: true,
    beforeEnter: requireAuth
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
