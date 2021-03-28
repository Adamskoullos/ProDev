import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { fAuth } from './firebase/config'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import './assets/main.css'


let app

fAuth.onAuthStateChanged(() => {
    if(!app){
        app = createApp(App).use(router).mount('#app')
    }
})