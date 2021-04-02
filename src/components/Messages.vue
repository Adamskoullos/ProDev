<template>
    <div class="chat-window">
        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="documents" class="messages" ref="messages">
            <div v-for="doc in formattedDocuments" :key="doc.id" class="single">
                <div class="timestamp">
                    <span class="created-at">{{ doc.createdAt }}</span>
                    <span class="name">{{ doc.name }}</span>
                </div>
                <span class="message">{{ doc.message }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import getCollectionMessages from '../composables/getCollectionMessages'
import { formatDistanceToNow } from 'date-fns'
import { computed, onUpdated, ref } from '@vue/runtime-core'


export default {
    props: ['light'],
    setup(){
        const { documents, error } = getCollectionMessages('messages')

        const formattedDocuments = computed (() => {
            if(documents.value){
                return documents.value.map(doc => {
                    let time = formatDistanceToNow(doc.createdAt.toDate())
                    return { ...doc, createdAt: time }
                })
            }
        })

        // auto-scroll to bottom of messages to show the newest
        const messages = ref(null)
        // fire on every update to maintain always showing the latest messages
        onUpdated(() => {
            messages.value.scrollTop = messages.value.scrollHeight
        })

        return { formattedDocuments, documents, error, messages }
    }
}
</script>

<style scoped>
.chat-window{
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-end;
}
.messages{
    max-height: 70vh;
    box-sizing: border-box;
    overflow:auto;
}
.messages::-webkit-scrollbar {
    width: 0px;               /* width of the entire scrollbar */
}

.messages::-webkit-scrollbar-track {
background: rgb(75,75,75);        /* color of the tracking area */
}

.messages::-webkit-scrollbar-thumb {
background-color: rgb(75,75,75);    /* color of the scroll thumb */
border-radius: 20px;       /* roundness of the scroll thumb */
border: 0px solid rbg(75,75,75);  /* creates padding around scroll thumb */
}
.single{
    background: rgb(63, 63, 63, 0.4);
    border-radius: 4px;
    min-height: 50px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;
    margin: 10px auto;
    padding: 20px auto;
}
.timestamp{
    flex:1;
    display: flex;
    justify-content: space-between;
}
.timestamp span{
    font-weight: 200;
    margin: 5px 15px 0 15px;
}
span.message{
    line-height: 1.1rem;
    margin: 10px 15px;
}
</style>