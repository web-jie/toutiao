<template>
  <div>
    <NavigateBar title="栏目管理" />
    <div class="content">
      <p>点击就删除</p>
      <div class="list">
<span class="item" v-for="(item,index) in arrUp" :key="index" :class="['关注','头条'].includes(item.name) ? 'active': ''">{{item.name}}</span>
      </div>
      <p>点击就填加</p>
      <div class="list" >
        <span class="item" v-for="(item,index) in arrDown" :key="index" :class="['关注','头条'].includes(item.name) ? 'active': ''">{{item.name}}</span>

      </div>
    </div>
  </div>
</template>

<script>
// 引入头部导航栏插件
import NavigateBar from "@/components/NavigateBar.vue";
export default {
  data(){
    return{
      categories: [],
      arrUp: [],
      arrDown: []
    }
  },
  components: {
    NavigateBar
  },
  mounted(){
    this.categories = JSON.parse(localStorage.getItem('categories'))
    this.arrUp = this.categories.filter(v=>{
      return v.is_top === 1;
    })
    this.arrDown = this.categories.filter(v=>{
      return v.is_top === 0;
    })
  }
};
</script>

<style lang="less" scoped>
  .content{
    p{
      color: #000;
      font-size: 12px;
    }
    .list{
      display: block;
      margin-top: 20/360*100vw;
      span{
        display: inline-block;
        margin: 10/360*100vw 18/360*100vw;
        padding: 5/360*100vw;
        background: #eee;
        border: 1px solid #999;
      }
    }
  }
  .active{
    border-color: #ddd;
            color:#999;
  }

</style>