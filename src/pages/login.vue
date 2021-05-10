<template>
  <section id="login" class="d-flex justify-center align-center">
    <v-card class="mx-auto" max-width="344">
      <v-card-text>
        <h1 class="display-1 text--primary mb-3 text-center">
          Smartweb管理登入
        </h1>
        <v-text-field
          v-model="account"
          :counter="10"
          label="帳號"
          outlined
          dense
          autofocus
        ></v-text-field>
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          label="密碼"
          hint="At least 8 characters"
          @click:append="show1 = !show1"
          outlined
          dense
          @keydown.enter="doLogin()"
        ></v-text-field>
        <v-btn @click="doLogin()" depressed color="primary" block> 登入 </v-btn>
      </v-card-text>
    </v-card>
  </section>
</template>

<script>
  import router from "../router";
  import utils from '../helper/utils.js'
  export default {
    data() {
      return {
        show1: false,
        show2: true,
        show3: false,
        show4: false,
        password: "",
        account: "",
        rules: {
          required: (value) => !!value || "Required.",
          min: (v) => v.length >= 8 || "Min 8 characters",
          emailMatch: () => "The email and password you entered don't match",
        },
      };
    },
    methods: {
      doLogin() {
        console.log("Do Login",process.env);
        this.$api.auth
          .login({ account: this.account, password: this.password })
          .then((response) => {
            console.log("response=", response);
            if (response.data === null || response.data.status === undefined) {
              this.$store.dispatch("snackbar/openSnackbar", {
                msg: "請輸入正確的帳號密碼",
              });
            } else {
              this.$store
                .dispatch("auth/setAuth", {
                  token: response.data.data.token,
                  isLogin: true,
                })
                .then(() => {
                  if (utils.getUrlKey("redirect") !== null) {
                    this.$router.push(utils.getUrlKey("redirect"));
                  } else {
                    this.$router.push("/");
                  }
                  //
                  // router.replace({
                  //   name: 'Home'
                  // });
                });

              //console.log("response",response)
            }
          });
      },
    },
    mounted: function() {
      if (
        this.$store.state.auth.isLogin === true &&
        this.$store.state.auth.token !== null &&
        this.$store.state.auth.token !== undefined &&
        this.$store.state.auth.token !== ""
      ) {
        this.$store.dispatch("snackbar/openSnackbar", {
          msg: "已經是登入狀態，所以轉到 HOME",
        });
        router.replace({
          name: "Home",
        });
      }
    },
  };
</script>
<!-- style一定要放在最下面  -->
<style lang="scss">
// @import '~vuetify/src/styles/styles.sass';
@import './src/assets/sass/main.scss';//載入自訂的scss,
/*---  登入畫面-css ---*/
#login{
    position: relative;
    height: calc( 100vh - 64px );
    background:#E1E1E1;
    .v-card{
        position: relative;
        z-index: 2;
        width: 380px;
    }
  &::before{
    content:" ";
    position: absolute;
    top:0;
    left: 0;
   @include size(0,0);
    z-index: 1;
  border-style: solid;
  border-width: calc( 100vh - 64px ) 0 0 100vw;
  border-color: transparent transparent transparent $primary;
  }
  }

</style>