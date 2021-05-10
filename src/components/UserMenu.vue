<template>
      <v-menu offset-y>
        <template v-slot:activator="{  attrs,on }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in usermenus"
            :key="index"
            @click="item.action"
            link
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
</template>

<script>
export default{
    data(){
        return{
       //個人資料下拉選單
        usermenu: [
          {
            title: "個人檔案",
            href: "link01",
            logined_show: true,
            nologined_show: true,
            action:this.doProfile,//後面函式
          },
          {
            title: "設定",
            href: "link02",
            logined_show: true,
            nologined_show: true,
            action: this.doSetup,
          },
          {
            title: "登入",
            logined_show: false,
            nologined_show: true,
            action: this.doLogin,
          },
          {
            title: "登出",
            logined_show: true,
            nologined_show: false,
            action: this.doLogout,
          },
        ],
        }
    },
     computed: {
      usermenus: function() {
        if (this.$store.state.auth.isLogin === true) {
          return this.usermenu.filter((i) => i.logined_show === true);
        } else {
          return this.usermenu.filter((i) => i.nologined_show === true);
        }
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
            this.$router.push("/login");
          });
      },
      doLogin() {
        this.$router.push("/login");
      },
      doSetup() {
        // 未設定;
      },
      doProfile() {
         // 未設定;
      },
    },
}
</script>