<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      item-key="name"
      class="elevation-1"
      :search="search"
      :custom-filter="filterOnlyCapsText"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search (UPPER CASE ONLY)"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:body.append>
        <tr>
          <td></td>
          <td>
            <v-text-field
              v-model="calories"
              type="number"
              label="Less than"
            ></v-text-field>
          </td>
          <td colspan="4"></td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
    name: "About",
    data() {
      return {
        search: "",
        calories: "",
        desserts: [],
      };
    },

    methods: {
      showMsg() {
        this.$store.dispatch("snackbar/openSnackbar", {
          msg: "測試MSG SHOW",
        });
      },
      filterOnlyCapsText(value, search) {
        return (
          value != null &&
          search != null &&
          typeof value === "string" &&
          value
            .toString()
            .toLocaleUpperCase()
            .indexOf(search) !== -1
        );
      },
    },
    computed: {
      headers() {
        return [
          {
            text: "帳號",
            align: "start",
            sortable: false,
            value: "account",
          },
          {
            text: "公司名稱",
            value: "company",
          },
          { text: "Fat (g)", value: "fat" },
          { text: "Carbs (g)", value: "carbs" },
          { text: "Protein (g)", value: "protein" },
          { text: "Iron (%)", value: "iron" },
        ];
      },
    },
    mounted: function() {
      console.log("要呼叫 clinents", this.$api.v1.clients);
      this.$api.v1.clients
        .list()
        .then((result) => {
          this.desserts = result.data;
          console.log("result=", result);
        }).catch((error) => {
          console.log("error=", error);
        });
    },
  };
</script>
