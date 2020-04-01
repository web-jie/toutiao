<template>
  <div>
    <!-- 红色导航栏 -->
    <div class="header">
      <span class="iconfont iconnew"></span>
      <router-link to="#" class="search">
        <span class="iconfont iconsearch"></span>
        <i>搜索新闻</i>
      </router-link>
      <router-link to="/personal">
        <span class="iconfont iconwode"></span>
      </router-link>
    </div>
    <van-tabs v-model="active" scrollspy sticky>
  <van-tab v-for="(item,index) in categories" :title="item" :key="index">
     {{ item  }}
  </van-tab>
</van-tabs>
  </div>
</template>

<script>
export default {
  data(){
    return{
      categories: ['关注','娱乐','体育','汽车','房产','关注',
            '关注','娱乐','体育','汽车','房产','关注', "∨"],
      active: 0,
    }
  },
  watch: {
    active(){
      if(this.active === this.categories.length-1){
        this.$router.push('/栏目管理')
      }
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  height: 50/360 * 100vw;
  background: #ff0000;
  display: flex;
  padding: 0 20/360 * 100vw;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  .iconnew {
    flex: 1;
    font-size: 50px;
    position: relative;
  }
  .search {
    flex: 1;
    height: 32/360*100vw;
    background:  rgba(255,255,255,0.5);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    vertical-align: middle;
    left: -50/360*100vw;
  }
  .iconwode {
    flex: 1;
  }
}
/deep/ .van-tabs__nav{
    background: #eee;
}
/deep/ .van-tab:nth-last-child(2){
    background: #eee;
    width: 20px!important;
    position: absolute;
    right:0; 
    top: 0;
    box-sizing:unset;
}
/deep/ .van-tab{
    flex-basis: 15%!important;
}
/deep/ .van-tabs__wrap{
    padding-right: 20px;
}
/deep/ .van-tabs__nav{
    position: static;
}
/deep/ .van-tabs__line{
    display: none;
}
/deep/ .van-tab--active{
    border-bottom: 1px #ff0000 solid;
}
</style>