<template>
  <v-row justify="center">
    <v-dialog v-model="visible" persistent max-width="1340">
      <v-card>
        <v-card-title class="headline manage-titl">
          {{ client.account }} 的相關資料設定
        </v-card-title>
        <v-card-text class="setting-block">
          <!-- 第1大區塊  -->
          <v-row>
            <v-col><h3 class="setting-block__header">登入資料</h3></v-col>
          </v-row>
          <!-- 第一列-radio-1  -->
          <v-row class="align-center">
            <v-col cols="3">米格魯會員</v-col>
            <v-col cols="9">
              <v-radio-group row class="mt-0" hide-details>
                <v-radio name="migulu_staff" label="是" value="Y"></v-radio>
                <v-radio name="migulu_staff" label="否" value="N"></v-radio> </v-radio-group
            ></v-col>
          </v-row>
          <v-row class="align-center">
            <v-col cols="3">網址1</v-col>
            <v-col cols="9">
              <!-- counter阻擋在哪裡? -->
              <v-text-field
                name="domain"
                v-model="client.domain"
                :counter="80"
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="align-center">
            <v-col cols="3">網址2</v-col>
            <v-col cols="9">
              <!-- domain2是綁資料名稱 -->
              <v-text-field
                name="domain2"
                v-model="client.domain2"
                :counter="60"
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- 第2大區塊  -->
          <v-row>
            <v-col><h3 class="setting-block__header">基本資料</h3></v-col>
          </v-row>
          <v-row class="align-center">
            <v-col cols="3">公司名稱</v-col>
            <v-col cols="9">
              <v-text-field
               name="company"
                v-model="client.company"
                :counter="60"
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
         <v-row class="align-center">
            <v-col cols="3">公司電話</v-col>
            <v-col cols="9">
              <v-text-field
               name="phone"
                v-model="client.phone"
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-col>
          </v-row> 
        </v-card-text>
        <v-card-actions class="fixed-nav">
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="onCancel()">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="onSave()"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "EditClient",
  props: {
    visible: Boolean,
    client: {
      type: Object,
    },
    account: String,
    company: String,
  },
  data() {
    return {
      dialog: this.visible,
      client_data: this.client,
    };
  },
  methods: {
    onSave() {
      //console.log("onSave client =",this.client);
      console.log("save button gets here...");
      this.$emit("saved", this.client); // confirmed 是 parent 自定的事件名稱
    },
    onCancel() {
      console.log("cancel button gets here...");
      this.$emit("canceled");
    },
  },
  // watch: {
  //   clientData : {
  //     deep: true,
  //     handler(val) {
  //       this.$emit('update', val)
  //     }
  //   }
  // }
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
.scrollspy{
  position: sticky;
  top:0;
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