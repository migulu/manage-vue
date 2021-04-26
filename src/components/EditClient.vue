<template>
  <v-row justify="center">
    <v-dialog v-model="visible" persistent max-width="1080">
      <v-card>
        <v-card-title class="headline">
          修改 {{ client.account }} 的基本資料
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="client.company"
            :counter="60"
            label="公司名稱"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="client.domain"
            :counter="60"
            label="網址1"
            outlined
            dense
          ></v-text-field>

          <v-text-field
            v-model="client.domain2"
            :counter="60"
            label="網址2"
            outlined
            dense
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="onCancel()">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="onSave()">
            Save
          </v-btn>
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
