<template>
  <div class="container">
    <div class="header">
      <div class="avatar">
        <img src="https://www.baidu.com/img/bd_logo1.png" alt />
      </div>
      <div class="proile">
        <div>
          <span class="iconfont iconxingbienan"></span>
          火星网友
        </div>
        <p>2020-03-27</p>
      </div>
      <span class="arrow iconfont iconjiantou1"></span>
    </div>
  <Listbar v-for="(item,index) in rows" :key="index" :label="item.label" :tips="item.tips" />
  </div>
</template>

<script>
//@代表是src这个文件夹
import Listbar from "@/components/Listbar.vue"
export default {
  data(){
    return {
      rows:[
        { label: "我的关注", tips: "关注的用户" },
				{ label: "我的跟帖", tips: "跟帖回复" },
				{ label: "我的收藏", tips: "文章视频" },
				{ label: "设置", tips: "" },
      ]
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
  }
}

</style>