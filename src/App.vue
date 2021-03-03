<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
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
      <v-btn to="/login" text>登入</v-btn>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <snackbar></snackbar>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

import Snackbar from '@/components/_partial/Snackbar'

export default {
  name: 'App',
  components: {
    Snackbar
  },
  data: () => ({
    //
  }),
};
</script>
