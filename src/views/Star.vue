<template>
  <div>
    <NavigateBar title="我的收藏"/>
    <div v-for="(item, index) in starText" :key="index">
    <div class=" imgText" v-if="item.cover.length < 3 && item.cover.length > 0">
      <div class="imgText-left">
        <h4>
          {{item.title}}
        </h4>
        <p>
          {{item.user.nickname}}    {{item.comments.length}}跟帖
        </p>
      </div>
      <img :src="$axios.defaults.baseURL + item.cover[0].url" >
    </div>
    <!-- <div class="imgList">
      <h4> 林志玲穿透视黑纱裙米兰看秀
          腹部微隆显孕味</h4>
      <div class="imgages">
        <img src="../assets/logo.png" alt="">
        <img src="../assets/logo.png" alt="">
        <img src="../assets/logo.png" alt="">
      </div>
    </div> -->
    </div>
  </div>
</template>

<script>
// 引入头部导航栏插件
import NavigateBar from "@/components/NavigateBar.vue"
export default {
  data(){
    return{
      starText: [],
    }
  },
  components: {
      NavigateBar,

  },
  mounted(){
    const tokens = JSON.parse(localStorage.getItem('userInfo'))
    this.$axios({
      url: '/user_star',
      headers: {
        Authorization: tokens.token
      }
    }).then(res=>{
      // console.log(res)
      const {data} = res.data
      this.starText = data
    })
  }
};
</script>

<style lang="less" scoped>
.imgText{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20/360*100vw ;
  border-bottom: 1px solid #eee;
  .imgText-left{
    h4{
          // 文字超出两行出现省略号
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            font-weight: normal;
    }
    p{
      color: #999;
      margin-top: 5px;
    }
  }


  img{
    display: block;
    width: 110/360*100vw;
    height: 75/360*100vw;
    object-fit: cover;
    flex-shrink: 0;
    margin-left: 10/360*100vw;
  }
}
.imgList{
  padding: 20/360*100vw;
  border-bottom: 1px solid #eee;
  h4{
    // 文字超出两行出现省略号
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            font-weight: normal;
  }
  .imgages{
    margin: 10/360*100vw 0;
    display: flex;
    justify-content: space-between;
    img{
      width: 33%;
      height: 75/360*100vw;
      object-fit: cover;
    }
  }
}
</style>