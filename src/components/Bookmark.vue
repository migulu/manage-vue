 <template>
      <div id="bookmark" class="d-flex align-center"> 
        <div class="bookmark-title">功能快捷列</div>
        <v-chip outlined v-for="item in bookmarkData" :to="item.to"  :key="item.text">{{ item.text }}</v-chip>
      </div>
</template>
 
      
<script>
 export default{
     data(){
         return{
bookmarkData:[
{
  text:"登入畫面",
  to:"/login",
},
{
  text:"首頁",
  to:"/",
},
{
  text:"公司資料列表",
  to:"/client/list",
},
{
  text:"有編輯器畫面",
  to:"/setting",
},
]
         }
     }
  }
</script>

<style lang="scss">
.bookmark-title{
  margin-right:8px;
}
</style>