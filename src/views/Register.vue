<template>
  <div class="container">
    <div class="btn">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <div class="form">
      <!-- <div class="form-user">
        <input type="text" v-model="form.username" placeholder="用户名/手机号" />
        <input type="password" v-model="form.password" placeholder="密码" />
      </div>
      <div class="form-btn">
        <button @click="handleClick">登录</button>
      </div>-->
      <van-form @submit="onSubmit" class="form">
        <van-field
          v-model="form.username"
          name="用户名/手机号"
          placeholder="用户名/手机号"
          :rules="[{ required: true, message: '请填写用户名/手机号' }]"
        />
        <van-field
          v-model="form.nickname"
          type="text"
          name="昵称"
          placeholder="昵称"
          :rules="[{ required: true, message: '请填写昵称' }]"
        />
        <van-field
          v-model="form.password"
          type="password"
          name="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">注册</van-button>
        </div>
      </van-form>
      <router-link to="/login">
          <van-button round block class="link-register" >登录</van-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        nickname: ""
      }
    };
  },
  methods: {
    onSubmit(values) {
      this.$axios({
        url: "/register",
        method: "POST",
        data: this.form
      }).then(res => {
        const { message } = res.data;
        this.$toast.success(message);
      });
    }
  }
};
</script>

<style lang='less' scoped>
.container {
  padding: 20 / 360 * 100vw;
  .btn span {
    font-size: 27 / 360 * 100vw;
    line-height: 1;
  }
  .logo {
    text-align: center;
    margin-top: 20 /360 * 100vw;
  }
  .logo span {
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }

  
  .form {
    .van-cell{
      padding: 10px 0;
      font-size: 16px;
      margin-bottom: 20/360*100vw;
    }
    .van-cell:not(:last-child)::after{
      left: 0;
      border-bottom: 1px solid #333;
    }
    .van-button--info{
    margin-top: 50/360*100vw;
    background: #d81e06;
    border: 1px solid #cc3300;
    }
  }
  .link-register{
    margin-top: 20/360*100vw;
  border: none;
  }
}
</style>