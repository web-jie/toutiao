<template>
  <div class="container">
    <div class="btn">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <div class="form">
      <div class="form-user">
        <input type="text" v-model="form.username" placeholder="用户名/手机号" />
        <input type="password" v-model="form.password" placeholder="密码" />
      </div>
      <div class="form-btn">
        <button @click="handleClick">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      form: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    handleClick(){
      this.$axios({
        url: "http://127.0.0.1:3000/login",
        method: "POST",
        data: this.form

      }).then(res=>{
        const {message} = res.data;
        this.$toast.success(message)
      })
    }
  }
};
</script>

<style lang='less'>
.container{
  padding: 20 / 360 * 100vw;
  .btn span{
    font-size: 27 / 360 * 100vw;
    line-height: 1;
  }
  .logo {
    text-align: center;
    margin-top: 20 /360 * 100vw;
  }
  .logo span{
    font-size: 126 / 360 *100vw;
    color: #d81e06;
  }
  .form-user input {
    width: 100%;
    height: 40 / 360 *100vw;
    line-height: 40 / 360 *100vw;
    outline: none;
    border: none;
    font-size: 18px;
    margin-top: 20 /360 * 100vw;
    border-bottom: 1px #999 solid;
  }
  .form-btn button{
    width: 100%;
    height: 48 /360 *100vw;
    margin-top: 50 / 360 *100vw;
    outline: none;
    background: #d81e06;
    color: #fff;
    font-size: 18px;
    border-radius: 25px;
    border: none;
  }
}
</style>