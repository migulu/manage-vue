<template>
  <v-navigation-drawer v-model="drawer" absolute temporary app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title"> Menu </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list>
      <v-list-group
        v-for="item in drawerItems"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.items"
          :key="child.id"
          @click="goTo(item.id, child.id)"
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    drawershow: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      // drawer: false,
      //側邊選單資料
      items: [
        {
          id: 1,
          action: "mdi-account-supervisor",
          items: [
            { id: 1, title: "所有客戶", route: "/client/list" },
            {
              id: 2,
              title: "新雙贏客戶",
              route: "/client/list",
              type: "newwinwin",
            },
            {
              id: 3,
              title: "舊雙贏客戶",
              route: "/client/list",
              type: "free",
            },

            {
              id: 4,
              title: "舊年費客戶",
              route: "/client/list",
              type: "normal",
            },
            { id: 5, title: "經銷商", route: "/client/list", type: "dealer" },
            {
              id: 6,
              title: "有設定GA的客戶",
              route: "/client/list",
              type: "google",
            },
            {
              id: 7,
              title: "有開啟Enhanced的客戶",
              route: "/client/list",
              type: "ec",
            },
          ],
          title: "客戶列表",
        },
        {
          id: 2,
          action: "mdi-cogs",
          items: [
            { title: "收費設定" },
            { title: "系統設定" },
            { title: "CSP設定" },
            { title: "金流相關設定" },
            { title: "合約內容設定" },
            { title: "通知機制設定" },
            { title: "GA設定" },
            { title: "狀態列版本設定" },
          ],
          title: "新雙贏計畫設定",
        },
        {
          action: "mdi-chart-areaspline-variant",
          items: [
            { title: "客戶 CODE 設定" },
            { title: "重新取得 FB access token" },
            { title: "重新取得 Google Access token" },
          ],
          title: "行銷設定",
        },
        {
          action: "mdi-currency-usd",
          items: [
            { title: "系統保證金" },
            { title: "米幣訂單" },
            { title: "月費" },
          ],
          title: "費用收付",
        },
        {
          action: "mdi-piggy-bank",
          items: [
            { title: "米幣管理" },
            { title: "購買米幣優惠折扣設定" },
            { title: "米幣條款及相關設定" },
            { title: "客戶米幣狀況" },
            { title: "中央銀行" },
          ],
          title: "米幣設定",
        },
        {
          action: "mdi-file",
          items: [
            { title: "後台系統公告管理" },
            { title: "前台首頁設定" },
            { title: "廣告管理" },
          ],
          title: "後台管理",
        },
        {
          action: "mdi-web",
          items: [{ title: "語系檔管理" }, { title: "通知信件管理" }],
          title: "語系管理",
        },
        {
          action: "mdi-pencil",
          items: [{ title: "自訂網頁(page.php)" }, { title: "eclib.js" }],
          title: "自訂內容",
        },
        {
          action: "mdi-medical-bag",
          items: [{ title: "設定" }],
          title: "安全防護機制設定",
        },
      ],
    };
  },
  computed: {
    drawer: {
      //get 和set是固定的
      get() {
        console.log("drawer get=" + this.drawershow);
        return this.drawershow;
      },
      set(newvalue) {
        console.log("drawer set=" + newvalue);
        this.$emit("close", newvalue);
      },
    },
    drawerItems: function () {
      //把登入判斷寫進這裡面
      if (this.$store.state.auth.isLogin === true) {
        return this.items;
      } else {
        return null;
      }
    },
  },
  methods: {
    goTo(id1, id2) {
      const activeItem = this.items.filter((i) => i.id === id1);
      const childItem = activeItem[0].items.filter((i) => i.id === id2);
      //console.log(childItem[0])
      let route;
      if (childItem[0].type !== undefined) {
        route = childItem[0].route + "/?type=" + childItem[0].type;
      } else {
        route = childItem[0].route;
      }
      console.log(this.$router.replace(route));
    },
  },
};
</script>
