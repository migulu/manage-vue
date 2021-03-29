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
                <v-col cols="12" lg="auto" v-for="(item, index) in selectItems" :key="index">
                  <v-select :items="selectItems[index].items" name="select" item-text="name" :label="item.label"
                    outlined dense></v-select>

                </v-col>

                <v-col cols="12" lg="auto">
                  <v-text-field label="關鍵字" outlined dense></v-text-field>
                </v-col>
                <v-col cols="12" lg="auto">
                  <v-btn depressed color="primary">
                    搜尋
                  </v-btn>
                </v-col>
              </v-row>
            </v-form> 
            <!-- 客戶列表 --> 
            <template>
              <v-data-table :headers="headers" :items="desserts" :items-per-page="10" >
                <!-- 狀態欄位 -->
              
                  <template v-slot:[`item.status`]="{ item }">
                  <v-icon dense v-for="(statusItem, index) in item.status " :key="index">{{ statusItem.icon }}</v-icon>
                </template>

              <!-- 進入後台欄位 -->
              <template v-slot:[`item.backstage`]="{  item  }">
               <v-btn
               text
               icon 
               :href="item.backstage.link"><v-icon dense>{{ item.backstage.icon }}</v-icon></v-btn>
              </template>
   
               <template v-slot:[`item.info`]="{  item  }">
                <v-btn
                text
                icon ><v-icon dense>{{ item.info}}</v-icon></v-btn>
               </template>
     <!-- 功能設定(跳出視窗)-這種寫法會變成一次開30個 -->
 <template v-slot:[`item.func`]="{  item  }"> 
  <div class="text-center">
    <v-dialog
      v-model="editDialog"
      width="400"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          icon 
          v-bind="attrs"
          v-on="on"
        >
         <v-icon dense @click="editDialog(item)" >{{ item.func}}</v-icon></v-btn>
      </template>

      <v-card>
        <v-card-title class="headline lighten-2">
          客戶功能設定
          
        </v-card-title>
        <v-card-text>
         <v-row  v-for="(item, index) in funcmenu" :key="index">
           <v-col  cols="12"
        sm="4">{{ item.title }}</v-col>
           <v-col  cols="12"
        sm="8"><v-text-field dense outlined :value="item.value"></v-text-field></v-col>
         </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="editDialog = false"
          >
            關閉
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
 </v-data-table>
            </template>     
     <!-- <v-btn @click="showMsg()">秀MSG</v-btn> -->
    </v-container>
</template>

<script>

export default {
  name: 'About',

  data() {
    return{
       editDialog: false,//跳出dialog先預設 false .現在這樣寫會變成全域--會當掉，應該另外做個component
       watch: {
      editDialog (val) {
        val || this.closeDelete()
      },
      },
       methods: {
      editDialog () {
        this.editDialog = true;
      },
      //關閉按鈕--還未串
         deleteItemConfirm () {
        this.closeDelete()
      },
       },
       
        //路徑導覽列
          breadcrumbsItems: [{
              text: '首頁',
              disabled: false,
              href: 'breadcrumbs_dashboard',
            },
            {
              text: '客戶列表',
              disabled: true,
              href: 'breadcrumbs_link_1',
            },
          ],
          //select-多筆資料
          selectItems: [{
              label: "啟用狀態",
              items: [ //items是固定寫法
                '啟用',
                '未啟用',
              ],
            },
            {
              label: "前台狀態",
              items: [
                '開',
                '關',
              ],
            },
            {
              label: "逾期狀態",
              items: [
                '未逾期',
                '逾期',
              ],
            },
            {
              label: "選擇產品",
              items: [
                'model-A',
                '新雙贏計畫（2010-02-28）',
                '社群A-苗栗綠能生活網專用',
                '社群B-苗栗綠能生活網專用',
                '藝術街形象商圈開運產品',
                '千店達人 - 開運1 - 無後臺：功能種類無限',
                '千店達人 - 開運2 - 有後臺，鎖功能：（最新消息，產品型錄，相關連結，聯絡我們，公司簡介）',
                '千店達人 - 開運3 - 有後臺，鎖功能：（公司簡介，產品型錄，聯絡方法，客服系統，訪客留言）',
              ],
            },
            {
              label: "選擇經銷商",
              items: [
                '雲翔資訊有限公司',
                '阿倫測試',
                '米格魯資訊股份有限公司',
                '詹芳昇',
                '東海藝術街群聚入口網',
                '新雙贏計畫的經銷商',
                '綠能行銷聯盟',
                '苗栗聚寶網',
                '台灣工藝之都',
                '米格魯測試商城',
                '台灣大裝修',
                '苗栗聚寶網',
                'everglory-泰文',
                'everglory-英文',
                'everglory-簡體',
              ],
            },
          ],
            //列表資料
          headers: [{
              text: '刪/前/後/未逾期',
              value: 'status',
              sortable: false
            },
            {
              text: 'GA',
              value: 'ga',
              sortable: false
            },
            {
              text: '名稱',
              value: 'company',
              sortable: false
            },
            {
              text: '帳號',
              value: 'account',
              sortable: false
            },
            {
              text: '後台',
              value: 'backstage',
              sortable: false,
              width: 70
            },
            {
              text: '資料',
              value: 'info',
              sortable: false,
              width: 70
            },
            {
              text: '功能',
              value: 'func',
              sortable: false,
              width: 70
            },
            {
              text: '起始日期與到期日',
              value: 'date',
              sortable: false
            },
            {
              text: '最後登入時間',
              value: 'loginTime'
            },
            {
              text: '最後存取時間',
              value: 'modifyTime'
            },
            {
              text: '最後帳單價錢',
              value: 'salary'
            },
            {
              text: '每月人次',
              value: 'person'
            },
            {
              text: '上月訂單總額',
              value: 'totalMoney'
            },
            {
              text: '上月訂單總數',
              value: 'totalList'
            },
            {
              text: '米幣',
              value: 'mi'
            },
            {
              text: '所屬經銷商',
              value: 'dealer'
            },
            {
              text: '轉新雙贏',
              value: 'smartweb'
            },
          ],
          desserts: [
  {
"status":[ {"icon":"mdi-close-circle-outline"},{"icon":"mdi-check-circle"} ,{"icon":"mdi-check-circle"},{"icon":"mdi-close-circle-outline"}] ,
"ga": "新版V2",
"company": "米格魯資訊股份有限公司",
"account": "Corporana",
"backstage":{"icon":"mdi-pencil","link":"#a123"},
"info":"mdi-cogs",
"func": "mdi-playlist-edit",
"date": [
  "2019-04-07",
  "2015-04-02"
],
"loginTime": " 2017-05-18  03:48:44",
"modifyTime": " 2020-10-2111:03:32",
"salary": 5185,
"person": 3613,
"totalMoney": 5972,
"totalList": 684,
"mi": 400,
"dealer": "一般客戶",
"smartweb": "新雙贏計畫（2010-02-28）"
},
{
"status":[ {"icon":"mdi-close-circle-outline"},{"icon":"mdi-check-circle"} ,{"icon":"mdi-check-circle"},{"icon":"mdi-close-circle-outline"}] ,
"ga": "新版V2",
"company": "Netplax",
"account": "Extragen",
"backstage":{"icon":"mdi-pencil","link":"#a123"},
"info":"mdi-cogs",
"func": "mdi-playlist-edit",
"date": [
  "2018-05-06",
  "2017-10-13"
],
"loginTime": " 2019-06-13  12:31:18",
"modifyTime": " 2019-12-1501:17:59",
"salary": 8801,
"person": 5362,
"totalMoney": 8526,
"totalList": 197,
"mi": 815,
"dealer": "一般客戶",
"smartweb": "新雙贏計畫（2010-02-28）"
},
{
"status":[ {"icon":"mdi-close-circle-outline"},{"icon":"mdi-check-circle"} ,{"icon":"mdi-check-circle"},{"icon":"mdi-close-circle-outline"}] ,
"ga": "新版V2",
"company": "Sustenza",
"account": "Deminimum",
"backstage":{"icon":"mdi-pencil","link":"#a123"},
"info":"mdi-cogs",
"func": "mdi-playlist-edit",
"date": [
  "2015-01-05",
  "2015-02-04"
],
"loginTime": " 2019-12-15  06:44:52",
"modifyTime": " 2017-04-0811:58:13",
"salary": 3445,
"person": 9896,
"totalMoney": 7336,
"totalList": 827,
"mi": 579,
"dealer": "一般客戶",
"smartweb": "新雙贏計畫（2010-02-28）"
},
{
"status":[ {"icon":"mdi-close-circle-outline"},{"icon":"mdi-check-circle"} ,{"icon":"mdi-check-circle"},{"icon":"mdi-close-circle-outline"}] ,
"ga": "新版V2",
"company": "Aquasseur",
"account": "Exoplode",
"backstage":{"icon":"mdi-pencil","link":"#a123"},
"info":"mdi-cogs",
"func": "mdi-playlist-edit",
"date": [
  "2011-05-11",
  "2013-05-24"
],
"loginTime": " 2018-07-27  11:00:25",
"modifyTime": " 2020-05-0302:24:31",
"salary": 5011,
"person": 8200,
"totalMoney": 5863,
"totalList": 162,
"mi": 734,
"dealer": "一般客戶",
"smartweb": "新雙贏計畫（2010-02-28）"
},
{
"status":[ {"icon":"mdi-close-circle-outline"},{"icon":"mdi-check-circle"} ,{"icon":"mdi-check-circle"},{"icon":"mdi-close-circle-outline"}] ,
"ga": "新版V2",
"company": "Ezent",
"account": "Puria",
"backstage":{"icon":"mdi-pencil","link":"#a123"},
"info":"mdi-cogs",
"func": "mdi-playlist-edit",
"date": [
  "2014-02-13",
  "2019-12-05"
],
"loginTime": " 2017-07-10  04:03:55",
"modifyTime": " 2017-11-1403:04:49",
"salary": 9755,
"person": 9814,
"totalMoney": 8633,
"totalList": 904,
"mi": 362,
"dealer": "一般客戶",
"smartweb": "新雙贏計畫（2010-02-28）"
},
{
"status":[ {"icon":"mdi-close-circle-outline"},{"icon":"mdi-check-circle"} ,{"icon":"mdi-check-circle"},{"icon":"mdi-close-circle-outline"}] ,
"ga": "新版V2",
"company": "Datagene",
"account": "Keengen",
"backstage":{"icon":"mdi-pencil","link":"#a123"},
"info":"mdi-cogs",
"func": "mdi-playlist-edit",
"date": [
  "2014-07-14",
  "2012-03-02"
],
"loginTime": " 2018-10-13  03:38:45",
"modifyTime": " 2018-01-0202:50:09",
"salary": 5500,
"person": 5120,
"totalMoney": 3969,
"totalList": 942,
"mi": 928,
"dealer": "一般客戶",
"smartweb": "新雙贏計畫（2010-02-28）"
},
{
"status":[ {"icon":"mdi-close-circle-outline"},{"icon":"mdi-check-circle"} ,{"icon":"mdi-check-circle"},{"icon":"mdi-close-circle-outline"}] ,
"ga": "新版V2",
"company": "Netility",
"account": "Earbang",
"backstage":{"icon":"mdi-pencil","link":"#a123"},
"info":"mdi-cogs",
"func": "mdi-playlist-edit",
"date": [
  "2011-03-02",
  "2020-10-22"
],
"loginTime": " 2017-11-22  08:01:51",
"modifyTime": " 2018-05-0401:44:24",
"salary": 7144,
"person": 9631,
"totalMoney": 8191,
"totalList": 551,
"mi": 690,
"dealer": "一般客戶",
"smartweb": "新雙贏計畫（2010-02-28）"
},
{
"status":[ {"icon":"mdi-close-circle-outline"},{"icon":"mdi-check-circle"} ,{"icon":"mdi-check-circle"},{"icon":"mdi-close-circle-outline"}] ,
"ga": "新版V2",
"company": "Lyrichord",
"account": "Conferia",
"backstage":{"icon":"mdi-pencil","link":"#a123"},
"info":"mdi-cogs",
"func": "mdi-playlist-edit",
"date": [
  "2012-09-20",
  "2016-03-02"
],
"loginTime": " 2020-07-07  07:21:38",
"modifyTime": " 2019-10-1408:08:49",
"salary": 6775,
"person": 5621,
"totalMoney": 9010,
"totalList": 496,
"mi": 991,
"dealer": "一般客戶",
"smartweb": "新雙贏計畫（2010-02-28）"
},
{
"status":[ {"icon":"mdi-close-circle-outline"},{"icon":"mdi-check-circle"} ,{"icon":"mdi-check-circle"},{"icon":"mdi-close-circle-outline"}] ,
"ga": "新版V2",
"company": "Kineticut",
"account": "Comfirm",
"backstage":{"icon":"mdi-pencil","link":"#a123"},
"info":"mdi-cogs",
"func": "mdi-playlist-edit",
"date": [
  "2017-11-06",
  "2019-09-24"
],
"loginTime": " 2017-12-17  05:15:14",
"modifyTime": " 2018-12-3109:54:59",
"salary": 4822,
"person": 3835,
"totalMoney": 5626,
"totalList": 880,
"mi": 910,
"dealer": "一般客戶",
"smartweb": "新雙贏計畫（2010-02-28）"
},
{
"status":[ {"icon":"mdi-close-circle-outline"},{"icon":"mdi-check-circle"} ,{"icon":"mdi-check-circle"},{"icon":"mdi-close-circle-outline"}] ,
"ga": "新版V2",
"company": "Entality",
"account": "Enersave",
"backstage":{"icon":"mdi-pencil","link":"#a123"},
"info":"mdi-cogs",
"func": "mdi-playlist-edit",
"date": [
  "2018-02-26",
  "2018-07-31"
],
"loginTime": " 2017-02-14  05:30:41",
"modifyTime": " 2020-05-2407:11:07",
"salary": 5087,
"person": 8068,
"totalMoney": 8340,
"totalList": 793,
"mi": 944,
"dealer": "一般客戶",
"smartweb": "新雙贏計畫（2010-02-28）"
},
{
"status":[ {"icon":"mdi-close-circle-outline"},{"icon":"mdi-check-circle"} ,{"icon":"mdi-check-circle"},{"icon":"mdi-close-circle-outline"}] ,
"ga": "新版V2",
"company": "Mantrix",
"account": "Mobildata",
"backstage":{"icon":"mdi-pencil","link":"#a123"},
"info":"mdi-cogs",
"func": "mdi-playlist-edit",
"date": [
  "2014-10-20",
  "2016-08-04"
],
"loginTime": " 2017-06-17  10:46:55",
"modifyTime": " 2017-09-1507:55:16",
"salary": 6704,
"person": 6660,
"totalMoney": 6137,
"totalList": 295,
"mi": 375,
"dealer": "一般客戶",
"smartweb": "新雙贏計畫（2010-02-28）"
},
{
"status":[ {"icon":"mdi-close-circle-outline"},{"icon":"mdi-check-circle"} ,{"icon":"mdi-check-circle"},{"icon":"mdi-close-circle-outline"}] ,
"ga": "新版V2",
"company": "Besto",
"account": "Imaginart",
"backstage":{"icon":"mdi-pencil","link":"#a123"},
"info":"mdi-cogs",
"func": "mdi-playlist-edit",
"date": [
  "2015-07-10",
  "2016-11-29"
],
"loginTime": " 2017-06-24  01:27:59",
"modifyTime": " 2018-04-1606:48:14",
"salary": 9314,
"person": 9886,
"totalMoney": 7709,
"totalList": 361,
"mi": 750,
"dealer": "一般客戶",
"smartweb": "新雙贏計畫（2010-02-28）"
},
{
"status":[ {"icon":"mdi-close-circle-outline"},{"icon":"mdi-check-circle"} ,{"icon":"mdi-check-circle"},{"icon":"mdi-close-circle-outline"}] ,
"ga": "新版V2",
"company": "Namebox",
"account": "Ozean",
"backstage":{"icon":"mdi-pencil","link":"#a123"},
"info":"mdi-cogs",
"func": "mdi-playlist-edit",
"date": [
  "2015-08-14",
  "2017-06-29"
],
"loginTime": " 2020-08-27  05:11:59",
"modifyTime": " 2018-06-0901:10:57",
"salary": 7395,
"person": 6696,
"totalMoney": 8434,
"totalList": 310,
"mi": 892,
"dealer": "一般客戶",
"smartweb": "新雙贏計畫（2010-02-28）"
},
{
"status":[ {"icon":"mdi-close-circle-outline"},{"icon":"mdi-check-circle"} ,{"icon":"mdi-check-circle"},{"icon":"mdi-close-circle-outline"}] ,
"ga": "新版V2",
"company": "Tribalog",
"account": "Buzzworks",
"backstage":{"icon":"mdi-pencil","link":"#a123"},
"info":"mdi-cogs",
"func": "mdi-playlist-edit",
"date": [
  "2019-01-02",
  "2014-08-25"
],
"loginTime": " 2018-06-22  04:26:32",
"modifyTime": " 2019-05-2808:30:10",
"salary": 7240,
"person": 9569,
"totalMoney": 5211,
"totalList": 803,
"mi": 964,
"dealer": "一般客戶",
"smartweb": "新雙贏計畫（2010-02-28）"
},
{
"status":[ {"icon":"mdi-close-circle-outline"},{"icon":"mdi-check-circle"} ,{"icon":"mdi-check-circle"},{"icon":"mdi-close-circle-outline"}] ,
"ga": "新版V2",
"company": "Ronelon",
"account": "Jamnation",
"backstage":{"icon":"mdi-pencil","link":"#a123"},
"info":"mdi-cogs",
"func": "mdi-playlist-edit",
"date": [
  "2012-04-14",
  "2013-06-29"
],
"loginTime": " 2019-12-21  10:00:06",
"modifyTime": " 2020-09-0907:11:41",
"salary": 6693,
"person": 5762,
"totalMoney": 9790,
"totalList": 379,
"mi": 495,
"dealer": "一般客戶",
"smartweb": "新雙贏計畫（2010-02-28）"
},
{
"status":[ {"icon":"mdi-close-circle-outline"},{"icon":"mdi-check-circle"} ,{"icon":"mdi-check-circle"},{"icon":"mdi-close-circle-outline"}] ,
"ga": "新版V2",
"company": "Combot",
"account": "Urbanshee",
"backstage":{"icon":"mdi-pencil","link":"#a123"},
"info":"mdi-cogs",
"func": "mdi-playlist-edit",
"date": [
  "2019-10-16",
  "2017-11-25"
],
"loginTime": " 2018-02-06  12:16:43",
"modifyTime": " 2020-09-1810:06:22",
"salary": 3643,
"person": 3897,
"totalMoney": 6739,
"totalList": 772,
"mi": 498,
"dealer": "一般客戶",
"smartweb": "新雙贏計畫（2010-02-28）"
},
{
"status":[ {"icon":"mdi-close-circle-outline"},{"icon":"mdi-check-circle"} ,{"icon":"mdi-check-circle"},{"icon":"mdi-close-circle-outline"}] ,
"ga": "新版V2",
"company": "Opticall",
"account": "Knowlysis",
"backstage":{"icon":"mdi-pencil","link":"#a123"},
"info":"mdi-cogs",
"func": "mdi-playlist-edit",
"date": [
  "2017-08-26",
  "2013-03-27"
],
"loginTime": " 2019-08-20  02:24:32",
"modifyTime": " 2017-07-2711:51:15",
"salary": 6118,
"person": 5466,
"totalMoney": 7359,
"totalList": 560,
"mi": 510,
"dealer": "一般客戶",
"smartweb": "新雙贏計畫（2010-02-28）"
},
{
"status":[ {"icon":"mdi-close-circle-outline"},{"icon":"mdi-check-circle"} ,{"icon":"mdi-check-circle"},{"icon":"mdi-close-circle-outline"}] ,
"ga": "新版V2",
"company": "Springbee",
"account": "Zidox",
"backstage":{"icon":"mdi-pencil","link":"#a123"},
"info":"mdi-cogs",
"func": "mdi-playlist-edit",
"date": [
  "2010-12-26",
  "2014-01-24"
],
"loginTime": " 2017-09-19  11:09:28",
"modifyTime": " 2020-09-2203:43:27",
"salary": 9457,
"person": 9796,
"totalMoney": 4452,
"totalList": 648,
"mi": 739,
"dealer": "一般客戶",
"smartweb": "新雙贏計畫（2010-02-28）"
},
{
"status":[ {"icon":"mdi-close-circle-outline"},{"icon":"mdi-check-circle"} ,{"icon":"mdi-check-circle"},{"icon":"mdi-close-circle-outline"}] ,
"ga": "新版V2",
"company": "Skybold",
"account": "Bulljuice",
"backstage":{"icon":"mdi-pencil","link":"#a123"},
"info":"mdi-cogs",
"func": "mdi-playlist-edit",
"date": [
  "2018-10-16",
  "2019-12-22"
],
"loginTime": " 2017-05-29  06:07:08",
"modifyTime": " 2019-02-1703:24:29",
"salary": 4463,
"person": 7959,
"totalMoney": 3539,
"totalList": 691,
"mi": 306,
"dealer": "一般客戶",
"smartweb": "新雙贏計畫（2010-02-28）"
},
{
"status":[ {"icon":"mdi-close-circle-outline"},{"icon":"mdi-check-circle"} ,{"icon":"mdi-check-circle"},{"icon":"mdi-close-circle-outline"}] ,
"ga": "新版V2",
"company": "Dogtown",
"account": "Recritube",
"backstage":{"icon":"mdi-pencil","link":"#a123"},
"info":"mdi-cogs",
"func": "mdi-playlist-edit",
"date": [
  "2017-02-13",
  "2012-04-22"
],
"loginTime": " 2018-04-28  03:21:40",
"modifyTime": " 2020-01-0605:50:20",
"salary": 5020,
"person": 9659,
"totalMoney": 5674,
"totalList": 724,
"mi": 708,
"dealer": "一般客戶",
"smartweb": "新雙贏計畫（2010-02-28）"
},
{
"status":[ {"icon":"mdi-close-circle-outline"},{"icon":"mdi-check-circle"} ,{"icon":"mdi-check-circle"},{"icon":"mdi-close-circle-outline"}] ,
"ga": "新版V2",
"company": "Helixo",
"account": "Geekfarm",
"backstage":{"icon":"mdi-pencil","link":"#a123"},
"info":"mdi-cogs",
"func": "mdi-playlist-edit",
"date": [
  "2019-03-16",
  "2019-01-02"
],
"loginTime": " 2017-06-08  08:27:16",
"modifyTime": " 2018-10-0606:18:15",
"salary": 9472,
"person": 7836,
"totalMoney": 5484,
"totalList": 851,
"mi": 770,
"dealer": "一般客戶",
"smartweb": "新雙贏計畫（2010-02-28）"
},
{
"status":[ {"icon":"mdi-close-circle-outline"},{"icon":"mdi-check-circle"} ,{"icon":"mdi-check-circle"},{"icon":"mdi-close-circle-outline"}] ,
"ga": "新版V2",
"company": "Spacewax",
"account": "Slofast",
"backstage":{"icon":"mdi-pencil","link":"#a123"},
"info":"mdi-cogs",
"func": "mdi-playlist-edit",
"date": [
  "2016-08-27",
  "2015-10-08"
],
"loginTime": " 2018-10-22  04:10:44",
"modifyTime": " 2020-10-0804:08:19",
"salary": 8436,
"person": 4739,
"totalMoney": 5249,
"totalList": 208,
"mi": 934,
"dealer": "一般客戶",
"smartweb": "新雙贏計畫（2010-02-28）"
},
{
"status":[ {"icon":"mdi-close-circle-outline"},{"icon":"mdi-check-circle"} ,{"icon":"mdi-check-circle"},{"icon":"mdi-close-circle-outline"}] ,
"ga": "新版V2",
"company": "Netplode",
"account": "Lexicondo",
"backstage":{"icon":"mdi-pencil","link":"#a123"},
"info":"mdi-cogs",
"func": "mdi-playlist-edit",
"date": [
  "2019-06-03",
  "2016-08-30"
],
"loginTime": " 2020-07-09  05:05:38",
"modifyTime": " 2017-06-0912:09:59",
"salary": 6108,
"person": 3501,
"totalMoney": 5692,
"totalList": 126,
"mi": 828,
"dealer": "一般客戶",
"smartweb": "新雙贏計畫（2010-02-28）"
},
{
"status":[ {"icon":"mdi-close-circle-outline"},{"icon":"mdi-check-circle"} ,{"icon":"mdi-check-circle"},{"icon":"mdi-close-circle-outline"}] ,
"ga": "新版V2",
"company": "Hopeli",
"account": "Uniworld",
"backstage":{"icon":"mdi-pencil","link":"#a123"},
"info":"mdi-cogs",
"func": "mdi-playlist-edit",
"date": [
  "2015-06-17",
  "2014-02-12"
],
"loginTime": " 2019-02-11  02:54:22",
"modifyTime": " 2018-06-1711:56:55",
"salary": 8007,
"person": 6379,
"totalMoney": 7237,
"totalList": 294,
"mi": 477,
"dealer": "一般客戶",
"smartweb": "新雙贏計畫（2010-02-28）"
},
{
"status":[ {"icon":"mdi-close-circle-outline"},{"icon":"mdi-check-circle"} ,{"icon":"mdi-check-circle"},{"icon":"mdi-close-circle-outline"}] ,
"ga": "新版V2",
"company": "Sultrax",
"account": "Pulze",
"backstage":{"icon":"mdi-pencil","link":"#a123"},
"info":"mdi-cogs",
"func": "mdi-playlist-edit",
"date": [
  "2015-12-27",
  "2012-05-11"
],
"loginTime": " 2017-10-05  12:18:23",
"modifyTime": " 2020-07-1206:41:19",
"salary": 5551,
"person": 7702,
"totalMoney": 3825,
"totalList": 928,
"mi": 459,
"dealer": "一般客戶",
"smartweb": "新雙贏計畫（2010-02-28）"
},
{
"status":[ {"icon":"mdi-close-circle-outline"},{"icon":"mdi-check-circle"} ,{"icon":"mdi-check-circle"},{"icon":"mdi-close-circle-outline"}] ,
"ga": "新版V2",
"company": "Geoform",
"account": "Deviltoe",
"backstage":{"icon":"mdi-pencil","link":"#a123"},
"info":"mdi-cogs",
"func": "mdi-playlist-edit",
"date": [
  "2020-04-28",
  "2018-05-23"
],
"loginTime": " 2020-05-30  08:45:49",
"modifyTime": " 2017-04-1410:06:30",
"salary": 5760,
"person": 5892,
"totalMoney": 8269,
"totalList": 285,
"mi": 790,
"dealer": "一般客戶",
"smartweb": "新雙贏計畫（2010-02-28）"
},
{
"status":[ {"icon":"mdi-close-circle-outline"},{"icon":"mdi-check-circle"} ,{"icon":"mdi-check-circle"},{"icon":"mdi-close-circle-outline"}] ,
"ga": "新版V2",
"company": "Quarx",
"account": "Pigzart",
"backstage":{"icon":"mdi-pencil","link":"#a123"},
"info":"mdi-cogs",
"func": "mdi-playlist-edit",
"date": [
  "2016-01-25",
  "2016-10-04"
],
"loginTime": " 2019-03-15  10:28:52",
"modifyTime": " 2017-03-2611:43:55",
"salary": 4233,
"person": 5988,
"totalMoney": 6097,
"totalList": 381,
"mi": 731,
"dealer": "一般客戶",
"smartweb": "新雙贏計畫（2010-02-28）"
},
{
"status":[ {"icon":"mdi-close-circle-outline"},{"icon":"mdi-check-circle"} ,{"icon":"mdi-check-circle"},{"icon":"mdi-close-circle-outline"}] ,
"ga": "新版V2",
"company": "Accuprint",
"account": "Atomica",
"backstage":{"icon":"mdi-pencil","link":"#a123"},
"info":"mdi-cogs",
"func": "mdi-playlist-edit",
"date": [
  "2015-10-22",
  "2016-09-21"
],
"loginTime": " 2018-10-23  08:47:43",
"modifyTime": " 2020-07-3008:00:34",
"salary": 9044,
"person": 3219,
"totalMoney": 5817,
"totalList": 799,
"mi": 519,
"dealer": "一般客戶",
"smartweb": "新雙贏計畫（2010-02-28）"
},
{
"status":[ {"icon":"mdi-close-circle-outline"},{"icon":"mdi-check-circle"} ,{"icon":"mdi-check-circle"},{"icon":"mdi-close-circle-outline"}] ,
"ga": "新版V2",
"company": "Zeam",
"account": "Menbrain",
"backstage":{"icon":"mdi-pencil","link":"#a123"},
"info":"mdi-cogs",
"func": "mdi-playlist-edit",
"date": [
  "2018-03-23",
  "2020-03-01"
],
"loginTime": " 2017-05-17  10:22:18",
"modifyTime": " 2017-02-1806:26:46",
"salary": 7830,
"person": 7252,
"totalMoney": 4801,
"totalList": 507,
"mi": 718,
"dealer": "一般客戶",
"smartweb": "新雙贏計畫（2010-02-28）"
},
{
"status":[ {"icon":"mdi-close-circle-outline"},{"icon":"mdi-check-circle"} ,{"icon":"mdi-check-circle"},{"icon":"mdi-close-circle-outline"}] ,
"ga": "新版V2",
"company": "Aclima",
"account": "Roughies",
"backstage":{"icon":"mdi-pencil","link":"#a123"},
"info":"mdi-cogs",
"func": "mdi-playlist-edit",
"date": [
  "2013-12-08",
  "2012-11-08"
],
"loginTime": " 2017-09-27  09:11:31",
"modifyTime": " 2018-01-2001:21:52",
"salary": 8974,
"person": 9280,
"totalMoney": 7332,
"totalList": 388,
"mi": 332,
"dealer": "一般客戶",
"smartweb": "新雙贏計畫（2010-02-28）"
}
  ],

     //功能選單資料
         funcmenu: [{
              title: '公司簡介',
              value: '2'
            },
            {
             title: '最新訊息	',
             value: '1'
            },
            {
              title: '產品型錄',
              value: '1'
            },
            {
              title: '問題解答',
              value: '2'
            },
            {
              title: '訪客留言',
              value: '1'
            },
            {
              title: '討論區',
              value: '0'
            },
            {
              title: '客服系統',
              value: '1'
            },
            {
              title: '相關連結',
              value: '0'
            },
            {
              title: '電子報',
              value: '0'
            },
            {
              title: '聯絡方法',
              value: '1'
            },
          ],
    }
  },

  methods: {
    showMsg() {
      this.$store.dispatch('snackbar/openSnackbar', {
        "msg2": "測試MSG SHOW"
      });
    },
  },

  //判斷有沒有登入使用，有登入時執行動作--有錯誤
  // mounted: function(){
  //   console.log(this.$api.v1.users);
  //     this.$api.v1.users.detail();
  // }
}
</script>
