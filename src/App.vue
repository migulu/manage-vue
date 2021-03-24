<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>
      <v-spacer></v-spacer>
      <v-btn to="/" text>Home</v-btn>
      <v-btn to="/about" text>About</v-btn>
      <v-btn v-if="isLogin" @click="doLogout()" text>登出</v-btn>
      <v-btn v-else to="/login" text>登入</v-btn>

      <v-spacer></v-spacer>
      <div v-if="isLogin">{{ getAccount }} 你好</div>
    </v-app-bar>

    <v-main>
      <snackbar></snackbar>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
  import Snackbar from "@/components/_partial/Snackbar";
  import jwt_decode from "jwt-decode";

  export default {
    name: "App",
    components: {
      Snackbar,
    },
    data: () => ({
      account: "",
    }),
    computed: {
      isLogin() {
        return this.$store.state.auth.isLogin;
      },
      getAccount() {
          const decode = jwt_decode(this.$store.state.auth.token);
          return decode.account        
      }
    },
    methods: {
      doLogout() {
        this.$store
          .dispatch("auth/setAuth", {
            token: "",
            isLogin: false,
            isAdmin: false,
          })
          .then(() => {
            this.$router.push("/home");
          });
      },
    },
  };
</script>
