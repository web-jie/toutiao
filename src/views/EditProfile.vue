<template>
  <div>
    <NavigateBar title="编辑资料" :showHome="false" />
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + userInfo.head_img" />
      <van-uploader class="uploader" :after-read="afterRead" />
    </div>
    <Listbar label="昵称" :tips="userInfo.nickname" @click.native="show = true" />
    <!-- 点击账号弹出界面修改内容 -->
    <!-- @confirm是点击确定按钮时候的事件 -->
    <van-dialog v-model="show"
     title="昵称修改"
      show-cancel-button
       @confirm="handleChangeNickname">
      <van-field v-model="nickname"
       placeholder="请输入昵称" />
    </van-dialog>

    <Listbar label="密码" tips="******" @click.native="showPassword = true" />
    <van-dialog v-model="showPassword"
     title="密码修改"
      show-cancel-button
       @confirm="handleChangePassword">
      <van-field v-model="password" placeholder="请输入密码" type="password" />
    </van-dialog>

    <Listbar label="性别" :tips="['女','男'][userInfo.gender]" />
  </div>
</template>

<script>
//引入目录导航栏
import Listbar from "@/components/Listbar.vue";
// 引入头部导航栏插件
import NavigateBar from "@/components/NavigateBar.vue";
export default {
  data() {
    return {
      userInfo: {},
      //保存本地存储文件
      userJson: {},
      showPassword: false,
      show: false,
      nickname: '',
      password: '',
    };
  },
  components: {
    NavigateBar,
    Listbar
  },
  methods: {
    afterRead(file) {
      console.log(file);
      const formdata = new FormData();
      formdata.append("file", file.file);

      this.$axios({
        url: "/upload",
        method: "POST",
        headers: {
          Authorization: this.userJson.token
        },
        data: formdata
      }).then(res => {
        const { url } = res.data.data;
        this.userInfo.head_img = url;

        //图片上传成功就要修改内容
        this.handleEdit({
          head_img: url
        });
      });
    },
    //创建一个修改数据的函数，data传递的数据可以是对象
    handleEdit(data) {
      this.$axios({
        url: "/user_update/" + this.userInfo.id,
        method: "POST",
        headers: {
          Authorization: this.userJson.token
        },
        data
      }).then(res => {
        this.$toast.success("修改成功");
      });
    },
    handleChangeNickname(){
      this.handleEdit({
        nickname: this.nickname
      })
      this.userInfo.nickname = this.nickname
    },
    handleChangePassword(){
      this.handleEdit({
        password: this.password
      })
    }
  },
  mounted() {
    const userJson = JSON.parse(localStorage.getItem("userInfo"));
    this.userJson = userJson;
    this.$axios({
      url: "/user/" + userJson.user.id,
      //这个地方容易出错，建议直接复制，错误原因是header少写s
      headers: {
        Authorization: userJson.token
      }
    }).then(res => {
      const { data } = res.data;
      this.nickname = data.nickname;

      this.userInfo = data;
    });
  }
};
</script>

<style lang="less" scoped>
.avatar {
  display: flex;
  padding: 20/360 * 100vw;
  justify-content: center;
  align-items: center;
  border-bottom: 5px #eee solid;
  position: relative;
  img {
    width: 100/360 * 100vw;
    height: 100/360 * 100vw;
    border-radius: 50%;
  }
  .uploader {
    position: absolute;
    opacity: 0;
    width: 100/360 * 100vw;
    height: 100/360 * 100vw;
  }
}
</style>