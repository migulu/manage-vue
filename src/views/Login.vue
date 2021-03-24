<template>
  <v-form>
    <v-container>
      <v-card class="mx-auto" max-width="344">
        <v-card-text>
         <h1 class="display-1 text--primary mb-3 text-center">Smartweb管理登入</h1>
            <v-text-field
            v-model="account"
            :counter="10"
            label="帳號"
            outlined
            dense
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
          ></v-text-field>
          <v-btn @click="doLogin()" depressed color="primary" block> 登入 </v-btn>
        </v-card-text>       
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
import router from "../router";
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
      //console.log("Do Login");
      this.$api.auth
        .login({ account: this.account, password: this.password })
        .then((response) => {
          //console.log(response.data);
          if (response.data.token === undefined) {
            this.$store.dispatch("snackbar/openSnackbar", {
              msg: "請輸入正確的帳號密碼",
            });
          } else {
            this.$store
              .dispatch("auth/setAuth", {
                token: response.data.token,
                isLogin: true,
              })
              .then(() => {
                this.$router.push("/home");
                // router.replace({
                //   name: 'Home'
                // });
              });

            //console.log("response",response)
          }
        });
    },
  },
  mounted: function () {
    if (this.$store.state.auth.isLogin === true) {
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
