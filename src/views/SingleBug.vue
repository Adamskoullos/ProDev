<template>
    <div class="outside">
        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="document" class="outer-wrapper">
            <div class=" single row">
                <div class="info col-12">
                    <h3 :class="{light: light}">{{ document.title }}</h3>
                    <p class="user-name" :class="{light: light}">By: {{ document.userName }}</p>
                    <span v-if="!document.solved" class="material-icons not-solved">build_circle</span>
                    <span v-if="document.solved" class="material-icons">verified</span>
                    <button v-if="ownership" @click="handleSolved" :class="{light: light}">Solved</button>
                </div>
                <h6 :class="{light: light}">Issue description</h6>
                <div class="single-bug col-12">
                    <div class="bug" :class="{light: light}">
                        <div class="actions">
                            <div class="details">
                                <p :class="{light: light}">{{ document.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <h6 :class="{light: light}">Error message</h6>
                <div class="single-bug col-12">
                    <div class="bug" :class="{light: light}">
                        <div class="actions">
                            <div class="details">
                                <p :class="{light: light}">{{ document.errorMessage }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="document.solution" class="bugs col-12">
                    <h4 :class="{light: light}">Solution</h4>
                    <div class="single-bug">
                        <div class="bug" :class="{ complete: document.solved, light: light}">
                            <div class="actions">
                                <div class="details">
                                    <p :class="{light: light}">{{ document.solution }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="document.imageUrl" class=" thumbnail col-12 col-sm-4">
                        <img :src="document.imageUrl" alt="project cover image">
                    </div>
                </div>
                <AddSolution v-if="!document.Solved" :bug="document" :light="light" />
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

    const ownership = computed(()=> {
        return document.value && user.value && user.value.uid == document.value.userId
    })

    

    const handleSolved = async () => {
      document.solved = !document.solved
      await updateDoc({
        solved: document.solved
      })
    }

    return { ownership, error, document, user, handleSolved }
  }
}
</script>


<style scoped>
.outside{
    flex:1;
}
.outer-wrapper{
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
}
h6{
    margin: auto;
    font-weight: 200;
}
h6.light{
    color: var(--primary)
}
.info span{
    font-size: 30px;
    color: rgb(51, 179, 1);
}
.info span.not-solved{
    font-size: 30px;
    color: rgb(45, 144, 236);
}
.info button.light{
    margin-top: 15px;
}
.single.row{
    margin: 10px auto;
    min-width: 100%;
    display: flex;
    justify-content:stretch;
    flex:1;
}
.single {
    flex:1;
    display: flex;
    align-items: center;
    justify-content: stretch;
    padding: 20px;
    border-radius: 8px;
    background: rgb(63, 63, 63, 0.0);
  }
  .single-bug{
    padding: 0;
    flex:1;

  }
  .thumbnail {
    margin:15px auto;
    display: flex;
    justify-content:center;
    align-items: center;
    min-width: 100px;
    min-height: 100px;
    max-height: 150px;
    overflow: hidden;
    border-radius: 8px;
    border: 1px;
  }
  img {
    flex:1;
    margin-left: auto;
    margin-right: auto;
    max-width: 150px;
    border-radius: 8px;
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
      margin: 10px auto;
  }
  button{
   margin: 15px 0;
  }
  button:hover{
    color: rgb(51, 179, 1);
    box-shadow: 1px 2px 5px rgba(50,50,50,0.3);
    transform: scale(0.98);
    transition: all ease 0.2s;
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
      background: rgb(63, 63, 63, 0.8);
      border-radius: 8px;
      box-shadow: 1px 1px 5px rgba(50,50,50,0);
      min-height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 10px auto;
  }
  .bug.light{
      background: rgb(255,255,255, 0.9);
      box-shadow: 1px 1px 10px rgba(50,50,50,0);
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