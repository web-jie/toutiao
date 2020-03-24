<template>
  <div class="total">
    <div class="title"></div>
    <div class="body">
      <span class="iconfont iconicon-test"></span>
      <span class="iconfont iconnew"></span>
      <input type="text" placeholder="用户名/手机号码">
      <input type="password" placeholder="密码">
      <button class="btn">登录</button>
    </div>
    <div class="base"></div>
  </div>
  
</template>

<script>
export default {

}
</script>

<style lang='less'>
.total{
  
  width: 360px;
  height: 540px;
  margin: 100px 100px;
  background: #f3f2f3;
  .title{
    width: 100%;
    height: 16px;
    background: #747374;
  }
  .body{
    width: 100%;
    height: 480px;
    position: relative;
    span{
      display: block;
    }
    .iconicon-test{
      font-size: 22px;
      position: absolute;
      top: 10px;
      left: 12px;
    }
    .iconnew{
      font-size: 120px;
      text-align: center; 
      color: #e63100;
      padding-top: 100px;     
    }
    input{
      display: block;
      width: 230px;
      height: 40px;
      margin: 8px auto;
      outline: none;
      border: none;
      border-bottom: 1px solid #747374;
      background: #f3f2f3;
    }
    .btn{
      display: block;
      width: 250px;
      height: 40px;
      margin: 30px auto;
      outline: none;
      border: none;
      border-radius: 20px;
      background: #d93f00;
      color: #fff;
    }

  }
  .base{
    width: 100%;
    height: 50px;
    background: #010001;
  }
}

</style>