// 秀畫面
<template>
  <div>
    <v-alert
      class="text-center"
      :value="visible"
      :type="type"
      dismissible
      outlined
      border="left"
      @input="close"
      >{{ message }}</v-alert
    >
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {}
    },
    computed: {
      message() {
        return this.$store.state.alert.msg;
      },
      type() {
        return !this.$store.state.alert.type
          ? "suscess"
          : this.$store.state.alert.type;
      },
      visible() {
        return this.$store.state.alert.visible;
      },
      showClose() {
        return this.$store.state.alert.showClose;
      },
    },
    methods: {
      close() {
        this.$store.commit("alert/CLOSE_ALERT");
      },
    },
  };
</script>
