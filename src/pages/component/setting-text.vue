<template>
<v-row class="align-center" >
  <v-col cols="3">{{title}}</v-col>
  <v-col cols="9">{{text}}</v-col>
</v-row>
</template>

<script>
export default {
    props:["title","text"],
  data:function(){
    return{
  
     }
  },    
}
</script>