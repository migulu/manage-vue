<template>
  <div class="home">
    <v-btn @click="getClients()">click</v-btn>
    <HelloWorld msg="這是傳進去的 msg "/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data() {
    return{}
  },
  components: {
    HelloWorld
  },
  methods: {
    getClients() {
  
    }
  }
}
</script>
