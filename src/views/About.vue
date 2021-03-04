<template>
  <div class="about">
    <h1>客戶列表</h1>
    <v-btn @click="showMsg()">秀MSG</v-btn>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return{

    }
  },
  methods: {
    showMsg() {
      this.$store.dispatch('snackbar/openSnackbar', {
        "msg": "測試MSG SHOW"
      });
    },
  },
  mounted: function(){
    console.log("要呼叫 users.detail",this.$api.v1.users);
      this.$api.v1.users.detail()
      .then((result) => { console.log("result=",result)})
      .catch((error) => { console.log("error=",error)});
  }
}
</script>