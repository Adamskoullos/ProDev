<template>
<div class="wrapper">
    <div class="button-wrapper">
        <router-link :to="{ name: 'MyProjects' }" :class="{light: light}">
            <button>My Projects</button>
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

export default {
    props: ['light'],
    components: { ProjectsList },
    setup(){
        const { documents, error } = getCollection('projects')

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
    justify-content: center;
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