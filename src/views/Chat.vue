<template>
  <div class="main-chat-window" ref="messages">
    <Messages :light="light"/>
    <NewMessage :light="light"/>
  </div>
</template>

<script>
import NewMessage from '../components/NewMessage'
import Messages from '../components/Messages'

export default {
  components: { NewMessage, Messages },
  props: ['light']

}
</script>

<style scoped>
.main-chat-window{
  flex:1;
}
</style>