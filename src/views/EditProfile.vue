<template>
  <div>
      <NavigateBar title="编辑资料" :showHome="false" />
      <div class="avatar">
        <img src="../assets/logo.png" >
      </div>
      <Listbar label="账号" tips="火星网友" />
      <Listbar label="密码" tips="******" />
      <Listbar label="性别" tips="男" />
  </div>

</template>

<script>
//引入目录导航栏
import Listbar from "@/components/Listbar.vue"
// 引入头部导航栏插件
import NavigateBar from "@/components/NavigateBar.vue"
export default {
  components: {
    NavigateBar,
    Listbar,
  }
};
</script>

<style lang="less" scoped>
.avatar{
  display: flex;
  padding: 20/360*100vw;
  justify-content: center;
  align-items: center;
  border-bottom: 5px #eee solid;
  img{
    width: 100/360*100vw;
    height: 100/360*100vw;
    border-radius: 50%;
  }

}
</style>