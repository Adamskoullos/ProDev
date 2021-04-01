<template>
<div class="wrapper">
    <div class="button-wrapper">
        <router-link :to="{ name: 'NewBug' }" :class="{light: light}">
            <button>New Bug</button>
        </router-link>
    </div>
    <div class="Bugs-window">
        <div v-if="error" class="error">
            <h4>Cannot access the the Bugs database</h4>
        </div>
        <div v-if="documents" class="Bugs">
            <BugsList :Bugs="documents" />
        </div>
    </div>
</div>
</template>

<script>
import getCollection from '../composables/getCollection'
import BugsList from '../components/BugsList'

export default {
    props: ['light'],
    components: { BugsList },
    setup(){
        const { documents, error } = getCollection('Bugs')

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
.Bugs-window{
    display: flex;
    flex:1;
}
.Bugs{
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;
    
}
</style>