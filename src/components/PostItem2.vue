<template>
  <div class="imgList">
     <h4>{{data.title}}</h4>
     <div class="images">
       <img v-for="(item, index) in data.cover" :key="index" :src="$axios.defaults.baseURL + item.url" alt="">
     </div>
     <p>{{data.user.nickname}} {{data.comment_length}}跟帖</p>
  </div>
</template>

<script>
export default {
props:['data']
}
</script>

<style lang="less" scoped>
.imgList{
  padding: 0 20/360*100vw;
  border-bottom: 1px solid #999;
  margin: 10px 0;
  .images{
    display: flex;
    margin-top: 10/360*100vw;
    img{
      width: 33%;
    }
  }
  p{
    margin: 10/360*100vw 0;
  }
}
</style>