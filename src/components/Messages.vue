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
    max-height: 80vh;
    box-sizing: border-box;
    overflow:auto;
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
    margin: auto 15px;
}
span.message{
    line-height: 1.1rem;
    margin: 10px 15px;
}
</style>