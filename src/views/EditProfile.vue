<template>
  <div>
      <NavigateBar title="编辑资料" :showHome="false" />
      <div class="avatar">
        <img :src="$axios.defaults.baseURL + userInfo.head_img" >
      </div>
      <Listbar label="账号" :tips="userInfo.nickname" />
      <Listbar label="密码" tips="******" />
      <Listbar label="性别" :tips="['女','男'][userInfo.gender]" />
  </div>

</template>

<script>
//引入目录导航栏
import Listbar from "@/components/Listbar.vue"
// 引入头部导航栏插件
import NavigateBar from "@/components/NavigateBar.vue"
export default {
  data(){
    return {
      userInfo: {},
    }
  },
  components: {
    NavigateBar,
    Listbar,
  },
  mounted(){
    const userJson = JSON.parse(localStorage.getItem('userInfo'));
    console.log(userJson)
    this.$axios({
      url: "/user/" + userJson.user.id,
      //这个地方容易出错，建议直接复制，错误原因是header少写s
      headers: {
        Authorization: userJson.token
      }
    }).then(res=>{

      const {data} = res.data;
      this.userInfo = data;
    })
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