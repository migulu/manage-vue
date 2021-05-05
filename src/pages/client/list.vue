<route>
{
  "name": "list",
  "meta": {
    "requiresAuth": true
  }
}
</route>
<template>
  <v-container class="about" fluid>
    <!--  路徑導覽列- -->
    <v-breadcrumbs :items="breadcrumbsItems"></v-breadcrumbs>
    <!--  搜尋列-->
    <v-form>
      <v-row>
        <!-- select 重複-->
        <v-col cols="12" lg="1">
          <v-select
            v-model="selectItems.active.select"
            :items="selectItems.active.items"
            label="啟用狀態"
            outlined
            dense
          ></v-select>
        </v-col>
        <v-col cols="12" lg="1">
          <v-select
            v-model="selectItems.frontend.select"
            :items="selectItems.frontend.items"
            label="前台狀態"
            outlined
            dense
          ></v-select>
        </v-col>
        <v-col cols="12" lg="1">
          <v-select
            v-model="selectItems.overdue.select"
            :items="selectItems.overdue.items"
            label="逾期狀態"
            outlined
            dense
          ></v-select>
        </v-col>

        <v-col cols="12" lg="3">
          <v-select
            v-model="selectItems.package.select"
            :items="selectItems.package.items"
            label="選擇產品"
            outlined
            dense
          ></v-select>
        </v-col>

        <v-col cols="12" lg="3">
          <v-select
            v-model="selectItems.dealer.select"
            :items="selectItems.dealer.items"
            label="選擇經銷商"
            outlined
            dense
          ></v-select>
        </v-col>
        <v-col cols="12" lg="auto">
          <v-text-field
            v-model="selectItems.keyword"
            label="關鍵字"
            outlined
            dense
            autofocus
            @keydown.enter="getClientList"
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="auto">
          <v-btn depressed color="primary" @click=getClientList>
            搜尋
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <!-- 客戶列表 -->
    <template>
      <v-data-table :headers="headers" :items="clients" :items-per-page="10">
        <!-- 狀態欄位 -->

        <template v-slot:[`item.status`]="{ item }">
          <v-icon
            dense
            v-for="(statusItem, index) in item.status"
            :key="index"
            >{{ statusIcon(statusItem) }}</v-icon
          >
        </template>

        <!-- 進入後台欄位 -->
        <template v-slot:[`item.backstage`]="{ item }">
          <v-btn text icon :href="item.backstage.link"
            ><v-icon dense>{{ item.backstage.icon }}</v-icon></v-btn
          >
        </template>

        <template v-slot:[`item.info`]="{ item }">
          <v-btn text icon @click="openProfile(item.info.id)"
            ><v-icon dense>{{ item.info.icon }}</v-icon></v-btn
          >
        </template>

        <template v-slot:[`item.func`]="{ item }">
          <v-btn text icon @click="openFunc(item.func.id)"
            ><v-icon dense>{{ item.func.icon }}</v-icon></v-btn
          >
        </template>
      </v-data-table>
      <edit-client
        :client="clientData"
        :visible="isDialogVisible"
        @saved="onEditClientSaved"
        @canceled="onEditClientCanceled"
      ></edit-client>
      <EditFunc   
      :client="funcData"
      :EditFuncShow="isDialogfunc" 
       ></EditFunc>
    </template>
    <!-- <v-btn @click="showMsg()">秀MSG</v-btn> -->
  </v-container>
</template>

<script>
  import EditClient from "@/components/EditClient.vue"; //修改客戶資料
  import EditFunc from "@/components/EditFunc.vue"
  let moment = require("moment"); //要處理日期的
  export default {
    name: "List",
    components: {
      EditClient,
      EditFunc
    },
    data() {
      return {
        isDialogVisible: false, 
        isDialogfunc:false,
        clientId: 0,
        clientData: {}, //單一筆修改客戶資料
        funcData: {}, //單一筆修改客戶資料
        watch: {
          editDialog(val) {
            val || this.closeDelete();
          },
        },

        //路徑導覽列
        breadcrumbsItems: [
          {
            text: "首頁",
            disabled: false,
            href: "breadcrumbs_dashboard",
          },
          {
            text: "客戶列表",
            disabled: true,
            href: "breadcrumbs_link_1",
          },
        ],
        selectItems: {
          active: {
            select: "",
            items: [
              { text: "啟用", value: "Y" },
              { text: "不啟用", value: "N" }
            ]
          },
        frontend: {
          select: "",
          items: [
            { text: "開啟", value: "Y" },
            { text: "關閉", value: "N" },
          ],
        },
        overdue: {
          select: "",
          items: [
            { text: "未逾期", value: "N" },
            { text: "逾期", value: "Y" },
          ],
        },
        package: {
          select: "",
          items: []
        },
        dealer: {
          select: "",
          items: []
        },
        keyword:""
        },
        //select-多筆資料
        selectItems2: [
          {
            label: "選擇經銷商",
            items: [
              "雲翔資訊有限公司",
              "阿倫測試",
              "米格魯資訊股份有限公司",
              "詹芳昇",
              "東海藝術街群聚入口網",
              "新雙贏計畫的經銷商",
              "綠能行銷聯盟",
              "苗栗聚寶網",
              "台灣工藝之都",
              "米格魯測試商城",
              "台灣大裝修",
              "苗栗聚寶網",
              "everglory-泰文",
              "everglory-英文",
              "everglory-簡體",
            ],
          },
        ],
        //列表資料
        headers: [
          {
            id: "status",
            text: "刪/前/後/未逾期",
            value: "status",
            sortable: false,
          },
          {
            text: "GA",
            value: "ga_version",
            sortable: false,
          },
          {
            text: "名稱",
            value: "company",
            sortable: false,
          },
          {
            text: "帳號",
            value: "account",
            sortable: false,
          },
          {
            text: "後台",
            value: "backstage",
            sortable: false,
            width: 70,
          },
          {
            text: "資料",
            value: "info",
            sortable: false,
            width: 70,
          },
          {
            text: "功能",
            value: "func",
            sortable: false,
            width: 70,
          },
          {
            text: "起始日期與到期日",
            value: "date",
            sortable: true,
          },
          {
            text: "最後登入時間",
            value: "last_login_time",
            dataType: "Date",
          },
          {
            text: "最後存取時間",
            value: "last_access_time",
          },
          {
            text: "最後帳單價錢",
            value: "last_total_price",
          },
          {
            text: "最後帳單人次",
            value: "last_visists",
          },
          {
            text: "上月訂單總額",
            value: "last_order_amount",
          },
          {
            text: "上月訂單總數",
            value: "last_order_number",
          },
          {
            text: "米幣",
            value: "mi",
          },
          {
            text: "所屬經銷商",
            value: "dealer",
          },
          {
            text: "轉新雙贏",
            value: "smartweb",
          },
        ],
        clients: [],

        //功能選單資料
        funcmenu: [
          {
            title: "公司簡介",
            value: "2",
          },
          {
            title: "最新訊息	",
            value: "1",
          },
          {
            title: "產品型錄",
            value: "1",
          },
          {
            title: "問題解答",
            value: "2",
          },
          {
            title: "訪客留言",
            value: "1",
          },
          {
            title: "討論區",
            value: "0",
          },
          {
            title: "客服系統",
            value: "1",
          },
          {
            title: "相關連結",
            value: "0",
          },
          {
            title: "電子報",
            value: "0",
          },
          {
            title: "聯絡方法",
            value: "1",
          },
        ],
      };
    },
    computed: {},

    methods: {
      statusIcon(status) {
        if (status == "delete") return "mdi-delete";
        if (status) return "mdi-check-circle";
        else return "mdi-close-circle-outline";
      },
      showMsg() {
        this.$store.dispatch("snackbar/openSnackbar", {
          msg2: "測試MSG SHOW",
        });
      },
      getClientList() {
        //const list = this.$api.v1.clients.list();    
        let param = {}
        if (this.$route.query.type !== undefined){
          param['type'] = this.$route.query.type;
          param["package"] = 12;
        } else {
          param["package"] = this.selectItems['package'].select;  
        }
        param["active"] = this.selectItems['active'].select;
        param["frontend"] = this.selectItems['frontend'].select;
        param["overdue"] = this.selectItems['overdue'].select;
        
        param["dealer"] = this.selectItems['dealer'].select;
        param["keyword"] = this.selectItems['keyword']

        console.log(param);
      

        this.$api.v1.clients.list(param).then((response) => {
          const clients = [];
          if (Array.isArray(response.data)) {
            response.data.forEach(function(item) {
              (item.backstage = { icon: "mdi-pencil", link: item.backend_url }),
                (item.status = [
                  "delete",
                  item.backend_status,
                  item.fronted_status,
                  item.auto_close_status,
                ]);
              item.date = item.start_date + " / " + item.end_date;
              item.info = { icon: "mdi-cogs", id: item.cid };
              item.func = { icon: "mdi-playlist-edit", id: item.cid };
              //item.start_date = item.start_time;

              //  if (item.)
              //  ,
              //   { icon: "mdi-check-circle" },
              //   { icon: "mdi-check-circle" },
              //   { icon: "mdi-close-circle-outline" },
              if (item.last_login_time) {
                item.last_login_time = moment(item.last_login_time).format(
                  "YYYY-MM-DD HH:mm:ss"
                );
              } else {
                item.last_login_time = "0000-00-00 00:00:00";
              }
              if (item.last_access_time) {
                item.last_access_time = moment(item.last_access_time).format(
                  "YYYY-MM-DD HH:mm:ss"
                );
              } else {
                item.last_access_time = "0000-00-00 00:00:00";
              }
              clients.push(item);

              //this.desserts.push(item);
            });
            this.clients = clients;
            console.log("response", response.data);
          } else {
            console.log(response.data);
          }
        });
      },
      getClientConfigure(){
        this.$api.v1.clients.configure().then((response) => {
          //console.log(response.data.packages);
          let packages = [{text:"---",value:0}]
          if (Array.isArray(response.data.packages)) {
            response.data.packages.forEach(function(item) {
              item.text = item.name;
              item.value = item.id;
              packages.push(item)
            })
            this.selectItems.package['items'] = packages;
          }
          let dealers = [{text:"---",value:0}]
          if (Array.isArray(response.data.dealers)) {
            response.data.dealers.forEach(function(item) {
              item.text = item.company;
              item.value = item.cid;
              dealers.push(item)
            })
            this.selectItems.dealer['items'] = dealers;
          }

        })
      },
      onEditClientSaved(client) {
        console.log("client save");
        this.$api.v1.clients.detailUpdate(client).then((response) => {
          if (response.data.result === "0") {
            const findData = (element) => element.cid === response.data.cid;
            const savedDataIndex = this.clients.findIndex(findData);
            //this.clients[savedDataIndex] = client;
            console.log("saveDataIndex=" + savedDataIndex);
            let tmpClient = this.clients[savedDataIndex];
            console.log("tmpClient=", tmpClient);
            tmpClient.company = response.data.client.company;
            this.$set(this.clients, savedDataIndex, tmpClient);

            console.log(this.clients);
          }
          //console.log("response=", response);
        });

        this.isDialogVisible = false;
      },
      onEditClientCanceled() {
        this.isDialogVisible = false;
      },
      openProfile(id) {
        //const list = this.$api.v1.clients.list();
        console.log("開始取得" + id + "的資料");
        this.$api.v1.clients.detail(id).then((response) => {
          //console.log("clientData="+this.clientData);
          //console.log(response.data);
          this.clientData = response.data;
          this.isDialogVisible = true;
          //console.log(response.data);
        });

        // alert("要修改" + id + "的資料");
      },

      openFunc(id) {
        // alert("要修改" + id + "的功能");
           this.$api.v1.clients.detail(id).then((response) => {
          this.funcData = response.data;
          this.isDialogfunc = true;
        });
      },

      openDialog() {
        this.isDialogVisible = true;
        this.isDialogfunc= true;//
      },
      //關閉按鈕--還未串
      deleteItemConfirm() {
        this.closeDelete();
      },
    },

    mounted: function() {
      this.getClientList();
      this.getClientConfigure();
    },

    //判斷有沒有登入使用，有登入時執行動作--有錯誤
    // mounted: function(){
    //   console.log(this.$api.v1.users);
    //     this.$api.v1.users.detail();
    // }
  };
</script>
