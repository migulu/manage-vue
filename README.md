# manage 開發環境

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### 有用到的套件
```
axios:處理API 
vue:主要framework
vue-router:處理網址
vuetify:UI
vuex:狀態管理
vuex-persistedstate:狀態可以存到 localStorage

```

### 目錄及檔案架構
```
src/  原始碼
public/  網頁會用到的一些靜態檔案，例如圖檔、icon等等
dist/  編譯過後的檔案
.gitignore  不放入 git 的檔案或目錄
.browserslistrc   針對css轉譯的規則設定
.eslintrc.js  ESLint 的設定
package.json 安裝的npm套件設定檔
babel.config.js Babel 的設定(讓舊版瀏覽器可以用新版javascript)
vue.config.js Vue 的設定
```

### 原始碼目錄架構說明
```
src/apis  主要放 API 相關的程式
src/assets 程式中用到的靜態檔案
src/components 自行開發的 web component
src/components/_partial 更小的 web component
src/plugins 另外安裝的套件的使用(例如 vuetify、axios 等)
src/router Router 設定
src/store 跟狀態管理(vuex) 有關的程式
src/views 實際頁面
src/sass sass預設變數、函式等
```

###  原始碼檔案說明
```
App.vue 主要的component
main.js 整個專案的進入點
src/apis/auth.js  有關身份認證的 API
src/apis/https.js request 及 response 欄截處理、http 錯誤處理、API domain 設定
src/apis/utils.js 跟 API 有關的一些常用程式
src/apis/index.js API 整合程式
src/apis/v1 第一版的實際 API 程式 (以後主要新的API會放在這邊)
src/apis/v1/users.js 跟登入使用者有關的 api (測試版)
src/apis/v1/clients.js 跟客戶資料有關的 api (測試版)
src/apis/v1/index.js 整合 v1 裏面的 api 程式
src/store/index.js vuex 的主要程式, 可以依照需求分成不同 modules
```
