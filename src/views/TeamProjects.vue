<template>
<div class="wrapper">
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
    components: { ProjectsList },
    setup(){
        const { documents, error } = getCollection('projects')

        return { documents, error }
    }
}
</script>

<style>
.wrapper{
    display: flex;
    flex: 1;
    max-width: 95%;
    box-sizing: border-box; 
    justify-content: center;
    align-items: center;
}
.projects-window{
    display: flex;
    flex:1;
}
.project{
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    
}
</style>