<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: "App",
    beforeMount() {
      //console.log(process.env);
    },
  };
</script>
