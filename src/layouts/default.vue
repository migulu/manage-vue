<template>
  <v-app>
    <!-- 側邊攔 -->
      <Drawer :drawershow="drawer" @close="closeDrawer"></Drawer>
    <!-- header  -->
    <v-app-bar color="primary" dark app> 
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <bookmark></bookmark>
      <v-spacer></v-spacer>
      <v-badge
        v-show="msgCount"
        overlap
        :content="msgCount"
        offset-x="24px"
        offset-y="24px"
        color="secondary"
      >
        <v-btn icon>
          <v-icon>mdi-bell</v-icon>
        </v-btn>
      </v-badge>

      <UserMenu></UserMenu>
    </v-app-bar>

    <v-main>
      <snackbar></snackbar>
      <router-view />
    </v-main>

  </v-app>
</template>

<script>
  import Snackbar from "@/components/_partial/Snackbar";
  import Bookmark from "@/components/Bookmark";
  import Drawer from "@/components/Drawer";
  import UserMenu from "@/components/UserMenu";
  export default {
    components: {
      Snackbar,
      Bookmark,
      Drawer,
      UserMenu
    },

    data() {
      return {
        drawer: null,
        msg_counter: 10,
      };
    },
  methods: {
    closeDrawer(value) {
      this.drawer = value;
    },
  },
    computed: {
      usermenus: function() {
        if (this.isLogin === true) {
          return this.usermenu.filter((i) => i.logined_show === true);
        } else {
          return this.usermenu.filter((i) => i.nologined_show === true);
        }
      },
      isLogin: function() {
        return this.$store.state.auth.isLogin;
      },
      drawerItems: function() {
        if (this.isLogin === true) {
          return this.items;
        } else {
          return null;
        }
      },
      msgCount: function() {
        if (this.isLogin === true){
          return 8
        } else {
          return null
        }
      },
    },

  };
</script>