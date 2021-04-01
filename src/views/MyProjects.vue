<template>
<div class="wrapper">
    <div class="button-wrapper">
        <router-link :to="{ name: 'TeamProjects' }" :class="{light: light}">
            <button>Team Projects</button>
        </router-link>
        <router-link :to="{ name: 'NewProject' }" :class="{light: light}">
            <button>New Project</button>
        </router-link>
    </div>
    <div class="projects-window">
        <div v-if="error" class="error">
            <h4>Cannot access the the projects database</h4>
        </div>
        <div v-if="documents" class="project">
            <ProjectsList :projects="documents" />
        </div>
    </div>
</div>
</template>

<script>
import getCollection from '../composables/getCollection'
import ProjectsList from '../components/ProjectsList'
import getUser from '../composables/getUser'

export default {
    props: ['light'],
    components: { ProjectsList },
    setup(){
        const { user } = getUser()
        const { documents, error } = getCollection('projects', ['userId', '==', user.value.uid])

        return { documents, error }
    }
}
</script>

<style>
.button-wrapper{
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin: 20px auto;
}
.wrapper{
    display: flex;
    flex-direction: column;
    flex: 1;
    max-width: 95%;
    box-sizing: border-box; 
    justify-content: flex-start;
    align-items: stretch;
}
.projects-window{
    display: flex;
    flex:1;
}
.project{
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;
    
}
</style>