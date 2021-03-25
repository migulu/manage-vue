<template>
  <div class="home">

    這是登入後的首頁123
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  data() {
    return{}
  },
  beforeMount: function() {
    if (this.$store.state.auth.isLogin === false){
      this.$router.push("/login");
    }
  },
  methods: {
    getClients() {
  
    }
  }
}
</script>
