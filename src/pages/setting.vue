<template>
  <v-container fluid>
    <v-breadcrumbs :items="breadcrumbsItems"></v-breadcrumbs>
    <!-- <div class="manage-title">米格魯資訊股份有限公司 的相關資料設定</div> -->
    <!-- 觸發按鈕  -->
    <v-btn color="red lighten-2" @click="dialog = true">
      按鈕放在dialog外面，用改狀態的方式觸發
    </v-btn>
    <v-dialog v-model="dialog" max-width="1340">
      <v-card>
        <v-card-title class="manage-title">
          米格魯資訊股份有限公司 的相關資料設定
        </v-card-title>
        <!-- 內文開始 -->
        <v-card-text>
          <v-row>
            <v-col cols="12" md="10">
              <v-form class="setting-block">
                <v-row>
                  <v-col><h3 class="setting-block__header">登入資料</h3></v-col>
                </v-row>

                <!-- 第一列-radio-1  -->
                <v-row class="align-center">
                  <v-col cols="3">米格魯會員</v-col>
                  <v-col cols="9">
                    <v-radio-group row class="mt-0" hide-details>
                      <v-radio label="是" value="Y" name="migulu_staff"></v-radio>
                      <v-radio label="否" value="N" name="migulu_staff"></v-radio> </v-radio-group
                  ></v-col>
                </v-row>
                <!-- 第二列-radio-v-radio-group有預設高度，清除mt和底部註解  -->
                <v-row class="align-center">
                  <v-col cols="3">內定網址</v-col>
                  <v-col cols="9">
                    <v-radio-group row class="mt-0" hide-details>
                      <a href="https://migulu.smartweb.tw" target="_blank"
                        >migulu.smartweb.tw</a
                      >
                      <v-radio
                        label="取消主要轉址"
                        value="Y"
                        class="ml-3"
                      ></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
                <!-- 第3-6列-inpunt+radio  -->
                <v-row
                  class="align-center"
                  v-for="item in urlSetting"
                  :key="item.title"
                >
                  <v-col cols="3">{{ item.title }}</v-col>
                  <v-col cols="9">
                    <v-row class="align-center">
                      <v-col>
                        <v-text-field
                          label="請輸入網址"
                          :value="item.value"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-radio
                          label="設定此網址為主要轉址"
                          value="Y"
                        ></v-radio
                      ></v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <!-- 第7列-SSL設定textareas  -->
                <v-row class="align-center">
                  <v-col cols="3">SSL網址設定</v-col>
                  <v-col cols="9">
                    <v-textarea
                      outlined
                      name="ssl_domain"
                      label="SSL網址設定"
                      rows="3"
                      value=""
                      hint=" 網址:開始日期:載止日期，例如:
                  allan.smartweb.tw:20130910:20140910
                  www.allan.com.tw:20130920:20140920"
                      persistent-hint
                    ></v-textarea>
                  </v-col>
                </v-row>
                <!-- 第8列-ip認證網址  -->
                <setting-text title="ip認證網址" text=" "> </setting-text>
                <!-- 第9列-開運產品轉址  -->
                <v-row class="align-center">
                  <v-col cols="3">開運產品轉址</v-col>
                  <v-col cols="9">
                    <v-text-field
                      outlined
                      name="ssl_domain"
                      value=""
                      hint="此轉址的功能將這裏設定的網址轉到 http://2020.smartweb.tw"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!-- 第10列-客戶編號  -->
                <setting-text title="客戶編號" text=" S004045"></setting-text>
                <!-- 第11列-客戶帳號  -->
                <setting-text title="帳號" text="2020"></setting-text>

                <!-- 第12列-客戶密碼  -->
                <v-row class="align-center">
                  <v-col cols="3">密碼</v-col>
                  <v-col cols="9">
                    <v-row class="align-center">
                      <v-col cols="auto">20201688</v-col>
                      <v-col cols="auto">
                        <v-text-field
                          label="重新設定密碼"
                          outlined
                          dense
                          hide-details
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <!-- 第13列-空間  -->
                <v-row class="align-center">
                  <v-col cols="3">空間</v-col>
                  <v-col cols="9">
                    <v-text-field
                      value="1124"
                      suffix="MB"
                      outlined
                      dense
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!-- 第14列-日期  -->
                <setting-text title="開啟日期" text="2020-11-30"></setting-text>

                <!-- 第15列-到期日  -->
                <v-row class="align-center">
                  <v-col cols="3">到期日</v-col>
                  <v-col cols="9">
                    <v-text-field
                      value="2021-01-01"
                      prepend-icon="mdi-calendar"
                      outlined
                      dense
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!-- 第16列-所選用的產品  -->
                <setting-text
                  title="所選用的產品"
                  text="新雙贏計畫（2010-02-28）(月繳型)"
                ></setting-text>
                <!-- 第17列-繳費類型  -->
                <v-row class="align-center">
                  <v-col cols="3">繳費類型</v-col>
                  <v-col cols="9">
                    <v-select
                      :items="seletItems"
                      label="繳費類型"
                      outlined
                      dense
                      hide-details
                    ></v-select>
                  </v-col>
                </v-row>
                <!-- 第18列-所屬經銷商  -->
                <v-row class="align-center">
                  <v-col cols="3">所屬經銷商</v-col>
                  <v-col cols="9">
                    <v-select
                      :items="seletItems"
                      label="所屬經銷商"
                      outlined
                      dense
                      hint="沒有經銷商請不要選擇"
                      persistent-hint
                    ></v-select>
                  </v-col>
                </v-row>
                <!-- 第19列-出現在web123首頁  -->
                <v-row class="align-center">
                  <v-col cols="3">出現在web123首頁</v-col>
                  <v-col cols="9">
                    <v-select
                      :items="seletItems"
                      label="出現在web123首頁"
                      outlined
                      dense
                      hide-details
                    ></v-select>
                  </v-col>
                </v-row>
                <!-- 第20列-轉到別的網址  -->
                <v-row class="align-center">
                  <v-col cols="3">轉到別的網址</v-col>
                  <v-col cols="9">
                    <v-text-field
                      value=" "
                      outlined
                      dense
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!-- 第21列-新雙贏客戶繳費機制  -->
                <v-row class="align-center">
                  <v-col cols="3">新雙贏客戶繳費機制</v-col>
                  <v-col cols="9">
                    <v-radio-group row class="mt-0" hide-details>
                      <v-radio label="是" value="Y"></v-radio>
                      <v-radio label="自己月繳" value="4045"></v-radio>
                      <v-radio label="米格魯代繳" value="150"> </v-radio>
                      <v-select
                        :items="seletItems"
                        label="代繳次數"
                        outlined
                        dense
                        hide-details
                      ></v-select>
                    </v-radio-group>
                  </v-col>
                </v-row>
                <!-- 第22列-新雙贏客戶繳費機制  -->
                <v-row class="align-center">
                  <v-col cols="3">帳單是否為含稅價</v-col>
                  <v-col cols="9">
                    <v-radio-group row class="mt-0" hide-details>
                      <v-radio label="是" value="Y"></v-radio>
                      <v-radio label="否" value="N"></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
                <!-- 第23列-新雙贏客戶繳費機制  -->
                <v-row class="align-center">
                  <v-col cols="3">前台自動關閉</v-col>
                  <v-col cols="9">
                    <v-btn color="primary">取消帳單逾期設定</v-btn>
                  </v-col>
                </v-row>
                <!-- 第2大區塊  -->
                <v-row>
                  <v-col><h3 class="setting-block__header">基本資料</h3></v-col>
                </v-row>
                <!-- 列-到期日  -->
                <v-row class="align-center">
                  <v-col cols="3">公司名稱</v-col>
                  <v-col cols="9">
                    <v-text-field
                      value="米格魯資訊"
                      outlined
                      dense
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="align-center">
                  <v-col cols="3">公司項目</v-col>
                  <v-col cols="9">
                    <v-text-field outlined dense hide-details></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="align-center">
                  <v-col cols="3">公司電話...</v-col>
                  <v-col cols="9">
                    <v-text-field outlined dense hide-details></v-text-field>
                  </v-col>
                </v-row>
                <!-- 第3大區塊  -->
                <v-row>
                  <v-col
                    ><h3 class="setting-block__header">收費功能設定</h3></v-col
                  >
                </v-row>
                <v-row class="align-center">
                  <v-col cols="3">功能跟特定網站一樣</v-col>
                  <v-col cols="9">
                    <v-text-field
                      label="請填寫smartweb帳號"
                      outlined
                      dense
                      hide-details
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!-- 第3大區塊-次標  -->
                <v-row>
                  <v-col
                    ><h4 class="setting-block__sub" id="collapseBlock03-sub-a">
                      商城相關機制
                    </h4></v-col
                  >
                </v-row>
                <v-row
                  class="align-center"
                  v-for="item in mallSetting"
                  :key="item.title"
                >
                  <v-col cols="3">{{ item.title }}</v-col>
                  <v-col cols="9">
                    <v-radio-group
                      v-model="item.value"
                      row
                      class="mt-0"
                      :hint="item.note"
                      :hide-details="item.noteHide"
                      :persistent-hint="item.noteShow"
                    >
                      <v-radio label="是" value="Y"></v-radio>
                      <v-radio label="否" value="N"></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
                <!-- 第3大區塊-次標  -->
                <v-row>
                  <v-col
                    ><h4 class="setting-block__sub" id="collapseBlock03-sub-a">
                      與站內銷售產品有關的機制
                    </h4></v-col
                  >
                </v-row>
                <v-row class="align-center">
                  <v-col cols="3">可使用購物車</v-col>
                  <v-col cols="9">
                    <v-radio-group row class="mt-0" hide-details>
                      <v-radio label="是" value="Y"></v-radio>
                      <v-radio label="否" value="N"></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>

                <v-row class="align-center">
                  <v-col cols="3">不同運送方式設定不一樣的免運金額</v-col>
                  <v-col cols="9">
                    <v-radio-group row class="mt-0" hide-details>
                      <v-radio label="是" value="Y"></v-radio>
                      <v-radio label="否" value="N"></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>

                <v-row class="align-center">
                  <v-col cols="3">限時限量商品活動頁面</v-col>
                  <v-col cols="9">
                    <v-radio-group
                      row
                      class="mt-0"
                      v-model="radioActive"
                      persistent-hint
                      hint="此功能需搭配「限制商品購買數量」"
                    >
                      <v-radio label="是" value="Y"></v-radio>
                      <v-radio label="否" value="N"></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
                <!--  示意假資料行數 -->
                <setting-text title="標題..." text="內容...."></setting-text>
                <!-- 第3大區塊-次標  -->
                <v-row>
                  <v-col
                    ><h4 class="setting-block__sub" id="collapseBlock03-sub-a">
                      金流相關機制
                    </h4></v-col
                  >
                </v-row>
                <!--  示意假資料行數 -->
                <setting-text title="標題..." text="內容...."></setting-text>
                <v-row class="align-center">
                  <v-col cols="3">可取得「商品已送達」的物流狀態</v-col>
                  <v-col cols="9">
                    <v-text-field
                      outlined
                      dense
                      hide-details
                      persistent-hint
                      hint=" hct:新竹物流,pelican:大嘴鳥宅配通,ktj:嘉里大榮物流,ke:嘉里快遞(只需要填寫前面的英文代號，如果多組請用半型逗號隔開)"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!--  示意假資料行數 -->
                <setting-text title="標題..." text="內容...."></setting-text>
                <!-- 區塊04-SEO與優化 -->
                <v-row>
                  <v-col>
                    <h3 class="setting-block__header">SEO與優化</h3>
                  </v-col>
                </v-row>
                <v-row class="align-center">
                  <v-col cols="3">自行設定關鍵字(客戶)</v-col>
                  <v-col cols="9">
                    <v-radio-group
                      row
                      class="mt-0"
                      v-model="radioActive"
                      hide-details
                    >
                      <v-radio label="是" value="Y"></v-radio>
                      <v-radio label="否" value="N"></v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
   
                <!--  示意假資料行數 -->
                <setting-text title="標題..."  text="內容...." ></setting-text> 
                <setting-text title="標題..."  text="內容...." ></setting-text> 
              <!-- 區塊05-特殊設定 -->
                <v-row>
                  <v-col>
                    <h3 class="setting-block__header">特殊設定</h3>
                  </v-col>
                </v-row>
             <!--  示意假資料行數 -->
                <setting-text title="目前的米幣數" text="12345"></setting-text>
                <setting-text title="標題..."  text="內容...." ></setting-text> 
                <setting-text title="標題..."  text="內容...." ></setting-text> 
                <setting-text title="標題..."  text="內容...." ></setting-text> 
                <setting-text title="標題..."  text="內容...." ></setting-text> 
          <!-- 區塊06-特殊設定 -->
                <v-row>
                  <v-col>
                    <h3 class="setting-block__header">DNS相關設定</h3>
                  </v-col>
                </v-row>
             <!--  示意假資料行數 -->
                <setting-text title="標題..."  text="內容...." ></setting-text> 
                <setting-text title="標題..."  text="內容...." ></setting-text> 
                <setting-text title="標題..."  text="內容...." ></setting-text> 
                <setting-text title="標題..."  text="內容...." ></setting-text> 

                </v-form></v-col>
            <v-col cols="12" md="2" class="d-none d-block scrollspy">
              <!-- 側邊選單  floating 是無邊框的意思-->
              <v-navigation-drawer permanent floating>
                <v-list dense nav>
                  <v-list-item v-for="a in 10" :key="a">
                    <v-list-item-content>
                      <v-list-item-title>標題{{ a }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-navigation-drawer>
            </v-col>
          </v-row>
          <!--  修改button -->
          <v-row class="fixed-nav">
            <v-col class="d-flex justify-end">
              <v-btn color="primary">資料修改</v-btn></v-col
            >
          </v-row>
        </v-card-text>
      </v-card></v-dialog
    >
  </v-container>
</template>

<script>
import SettingText from "./component/setting-text";
export default {
  data() {
    return {
      dialog: false,
      //路徑導覽列
      breadcrumbsItems: [
        {
          text: "首頁",
          disabled: false,
          href: "#",
        },
        {
          text: "客戶列表",
          disabled: false,
          href: "#",
        },
        {
          text: "修改 米格魯資訊股份有限公司 設定",
          disabled: true,
          href: "#",
        },
      ],
      //重複的網址列-假資料
      urlSetting: [
        {
          title: "網址1",
          value: "http://migu.smartweb.tw",
        },
        {
          title: "網址2",
          value: "http://www.migulu.com",
        },
        {
          title: "網址3",
          value: " ",
        },
        {
          title: "網址4",
          value: " ",
        },
      ],
      //radio單列假資料
      radioActive: "Y",
      //商城相關資料-假資料
      mallSetting: [
        {
          title: "商城型的產品型錄",
          value: "Y",
          note: "",
          noteHide: true,
          noteShow: false,
        },
        {
          title: "出貨管理",
          value: "Y",
          note: "",
          noteHide: true,
          noteShow: false,
        },
        {
          title: "商城型首頁",
          value: "Y",
          note:
            "如果非商城客戶的首頁要使用商城首頁功能，可以只開這個開關，不要開「商城型的產品型錄」",
          noteHide: false,
          noteShow: true,
        },
        {
          title: "退貨系統",
          value: "Y",
          note: "",
          noteHide: true,
          noteShow: false,
        },
        {
          title: "電子優惠券",
          value: "Y",
          note: "",
          noteHide: true,
          noteShow: false,
        },
        {
          title: "電子優惠券-活動優惠券",
          value: "N",
          note: "",
          noteHide: true,
          noteShow: false,
        },
        {
          title: "測試項目...",
          value: "N",
          note: "",
          noteHide: true,
          noteShow: false,
        },
      ],

      //下拉選單假資料
      seletItems: ["假資料選項A", "假資料選項B", "假資料選項C", "假資料選項D"],
    };
  },
  components: {
    SettingText,
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

/*購物列表客戶太多時限制則數*/
// .show-all {
//   li:nth-child(1n + 10) {
//     display: block;
//   }
// }
// .show-10 {
//   li:nth-child(1n + 10) {
//     display: none;
//   }
// }
</style>