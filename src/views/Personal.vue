<template>
  <div class="container">
    <div class="header">
      <div class="avatar">
        <img :src="$axios.defaults.baseURL + userInfo.head_img" alt />
      </div>
      <div class="proile">
        <div>
          <span class="iconfont iconxingbienan" v-if="userInfo.gender === 1"></span>
          <span class="iconfont iconxingbienv" v-if="userInfo.gender === 0"></span>
          {{userInfo.nickname}}
        </div>
        <p>{{ moment(userInfo.create_date).format('YYYY-MM-DD') }}</p>
      </div>
      <span class="arrow iconfont iconjiantou1"></span>
    </div>
  <Listbar v-for="(item,index) in rows" :key="index" :label="item.label" :tips="item.tips" />
  </div>
</template>

<script>
//@代表是src这个文件夹
import Listbar from "@/components/Listbar.vue"
// 引入第三方时间插件包
import moment from "moment"
export default {
  data(){
    return {
      rows:[
        { label: "我的关注", tips: "关注的用户" },
				{ label: "我的跟帖", tips: "跟帖回复" },
				{ label: "我的收藏", tips: "文章视频" },
				{ label: "设置", tips: "" },
      ],
      userInfo: {},

      moment,
    }
  },
  components: {
    Listbar,
  },
  mounted(){
    const jsonStr = localStorage.getItem("userInfo");
    const userJson = JSON.parse(jsonStr);
    this.$axios({
      url: '/user/' + userJson.user.id,
      headers: {
        Authorization: userJson.token
      }
    }).then(res=>{
      console.log(res);
      const {data} = res.data;
      this.userInfo = data
    })
  }
};
</script>

<style lang="less" scoped>
.header {
  padding: 20/360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #eee solid ;
  .avatar {
    img {
      display: block;
      width: 70/360 * 100vw;
      height: 70/360 * 100vw;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  .proile {
    flex: 1;
    padding-left: 20 / 360 * 100vw;
    line-height: 1.5;
    p {
      color: #999;
    }
    .iconxingbienan{
      color: blue;
      background: #fff;
    }
  }
}

</style>