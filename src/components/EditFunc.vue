<template>
  <v-row justify="center">
    <v-dialog v-model="visible" persistent max-width="400">
      <v-card>
        <v-card-title class="headline manage-titl">
          {{ clientData.account }} 功能設定
        </v-card-title>
        <v-card-text class="setting-block">
          <v-row class="align-left" v-for="item in funcData" :key="item.id">
            <v-col cols="12">
              <v-text-field
                :label="item.name"
                v-model.number="item.number"
                outlined
                dense
                hide-details
                @keydown.enter="onSave()"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="fixed-nav">
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="onCancel()">
            關閉
          </v-btn>
          <v-btn color="green darken-1" text @click="onSave()">
            送出資料
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    name: "EditFunc",
    props: {
      // EditFuncShow: {
      //     type: Boolean,
      //     default: false,
      //   },
      visible: Boolean,
      func: {
        type: Array,
      },
      client: {
        cid: Number,
        account: String,
        company: String,
      },
    },
    data() {
      return {
        dialog: this.visible,
        client_data: this.client,
      };
    },
    computed: {
      funcData: function() {
        return this.func;
      },
      clientData: function() {
        if (this.func[0] !== undefined) {
          return this.func[0];
        } else {
          return {'account':''}
        }
      },
    },
    //   computed: {
    //   dialog: {
    //     //get 和set是固定的
    //     get() {
    //       return this.EditFuncShow;
    //     },
    //     set(newvalue) {
    //       this.$emit("close", newvalue);
    //     },
    //   },
    // },
    methods: {
      onSave() {
        //console.log("onSave client =",this.client);
        let out = {};
        out["funcData"] = this.funcData;
        console.log("out=", out);
        console.log("save button gets from EditFunc...", this.funcData);
        this.$emit("saved", out);
      },
      onCancel() {
        console.log("cancel button gets here...");
        this.$emit("canceled");
      },
    },
  };
</script>
<style lang="scss">
  @import "./src/assets/sass/main.scss"; //載入自訂的scss,
  /*設定資料、列表時的使用*/
  .setting-block {
    &__header {
      text-align: center;
      background-color: $secondary;
      color: $secondary-on-surface;
      line-height: 42px;
      border-radius: 4px;
    }
    &__sub {
      //副標
      margin-top: 1rem;
      color: $primary-darker;
      border-bottom: 1px solid $primary-darker;
    }
    > .row {
      border-bottom: 1px solid $gray-light;
    }
  }
  /*側邊快速選單*/
  .scrollspy {
    position: sticky;
    top: 0;
    max-height: 80vh;
  }

  // /*置底浮動的修改按鈕*/
  .fixed-nav {
    position: sticky;
    bottom: 0;
    border-top: 1px solid $gray-light;
    padding: 0.5rem;
    background: $secondary-on-surface;
    z-index: 1;
  }
</style>
