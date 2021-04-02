<template>
    <div>
        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="document" class="container-fluid">
            <div class=" single row">
                <div class="info col-12">
                    <h3>{{ document.title }}</h3>
                    <p class="user-name">By: {{ document.userName }}</p>
                    <span v-if="document.solved" class="material-icons">done</span>
                </div>
                <h6>Issue description</h6>
                <div class="single-bug">
                    <div class="bug">
                        <div class="actions">
                            <div class="details">
                                <p>{{ document.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <h6>Error message</h6>
                <div class="single-bug">
                    <div class="bug">
                        <div class="actions">
                            <div class="details">
                                <p>{{ document.errorMessage }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="document.solved" class="bugs col-12">
                    <h4>Solution</h4>
                    <div class="single-bug">
                        <div class="bug" :class="{ complete: document.solved }">
                            <div class="actions">
                                <div class="details">
                                    <p>{{ document.solution }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="document.imageUrl" class=" thumbnail col-12 col-sm-4">
                        <img :src="document.imageUrl" alt="project cover image">
                    </div>
                </div>
                <AddSolution v-if="ownership && showSolution" :bug="document"/>
            </div>
            <div class="buttons">
                <button v-if="!document.solved && ownership && !showSolution" @click="showSolution = true">Add Solution</button>
                <button v-if="ownership && !showSolution" @click="handleSolved">Solved</button>
                <button v-if="ownership && showSolution" @click="showSolution = false">Submit solution</button>
                <button v-if="ownership && showSolution" @click="showSolution = false">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
import useDocument from '../composables/useDocument'
import getDocument from '../composables/getDocument'
import getUser from '../composables/getUser'
import { useRouter } from 'vue-router'
import { computed, ref } from '@vue/runtime-core'
import AddSolution from '../components/AddSolution'

export default {
  props: ['id', 'light'],
  components: { AddSolution },
  setup(props){
    const { updateDoc, error } = useDocument('bugs', props.id)
    const { document } = getDocument('bugs', props.id)
    const { user } = getUser()
    const router = useRouter()
    const showSolution = ref(false)

    const ownership = computed(()=> {
        return document.value && user.value && user.value.uid == document.value.userId
    })

    

    const handleSolved = async () => {
      document.solved = !document.solved
      console.log(document.solved)
      await updateDoc({
        solved: document.solved
      })
    }

    return { ownership, error, document, user, handleSolved, showSolution }
  }
}
</script>


<style scoped>
.container-fluid{
    box-sizing: border-box;
    padding: auto auto;
}
h6{
    margin: auto;
    font-weight: 200;
}
.info span{
    font-size: 30px;
    color: rgb(51, 179, 1);
}
.single.row{
    margin: 10px auto;
    padding-right: calc(var(--bs-gutter-x)/ 3);
    padding-left: calc(var(--bs-gutter-x)/ 3);
}
.single {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border-radius: 4px;
    background: rgb(63, 63, 63, 0.0);
  }
  .single-bug{
    padding: 0;
  }
  .thumbnail {
    display: flex;
    justify-content:center;
    align-items: center;
    min-width: 100px;
    min-height: 100px;
    max-height: 150px;
    overflow: hidden;
    border-radius: 4px;
    border: 1px;
  }
  img {
    flex:1;
    margin-left: auto;
    margin-right: auto;
    max-width: 150px;
    border-radius: 4px;
    border: 1px;
  }
  .info{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }
  .info h3{
      margin-top: 5px;
      margin-bottom: 3px;
  }
  p.user-name{
      font-weight: 200;
  }
  .bugs{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      width: 100%;
      padding: 0;
  }
  .bugs h4{
      margin: 15px auto;
  }
  .buttons{
      display: flex;
      align-items: center;
      justify-content: center;
  }
  .buttons button{
      margin: 5px;
  }
   .buttons button:hover {
    
    color: rgb(51, 179, 1);
    box-shadow: 1px 2px 5px rgba(50,50,50,0.3);
    transform: scale(0.98);
    transition: all ease 0.3s;
  }
  
  .bug{
      background: rgb(63, 63, 63, 0.2);
      border-radius: 4px;
      box-shadow: 1px 1px 5px rgba(50,50,50,0.8);
      min-height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 10px auto;
  }
  .actions{
      min-width: 100%;
      display: flex;
      align-items: center;
      justify-content:stretch;
  }
  .icons{
      min-width: 75px;
      display: flex;
      align-items: center;
      margin: auto 15px auto auto;
  }
  .material-icons{
      font-size: 24px;
      color: #bbb;
      cursor: pointer;
      margin: auto ;
      display: block;
  }
  .material-icons:hover {
    color: rgb(51, 179, 1);
    transform: scale(1.3);
    transition: all ease 0.2s;
  }
  .details{
      display: flex;
      align-items: center;
      
  }
  .details p{
      margin: 5px auto 5px 15px;
      line-height: 2rem;
      font-size: 1.15rem;
  }
  .complete{
      border-left: 6px solid rgb(51, 179, 1);
  }
</style>