<template>
  <div>
    <!-- 头部导航栏引用 -->
    <NavigateBar title="我的关注" :showHome="false" />
    <!-- 循环输出 -->
    <div class="user-item" v-for="(item,index) in follows" :key="index">
      <img :src="$axios.defaults.baseURL + item.head_img" />
      <div class="user-info">
        <div>{{ item.nickname }}</div>
        <p>{{ moment(item.create_date).format("YYY-MM-DD hh:mm:ss") }}</p>
      </div>
      <span class="cancel" @click="handl(item.id, index)">取消关注</span>
    </div>
  </div>
</template>

<script>
// 引入头部导航栏插件
import NavigateBar from "@/components/NavigateBar.vue";
// 引入第三方时间插件包
import moment from "moment";
export default {
  data() {
    return {
      follows: [],
      moment,
      localUser: {}
    };
  },
  components: {
    NavigateBar
  },
  mounted() {
    const localUser = JSON.parse(localStorage.getItem("userInfo"));
  this.localUser = localUser;
    this.$axios({
      url: "/user_follows",
      headers: {
        Authorization: localUser.token
      }
    }).then(res => {
      const { data } = res.data;
      this.follows = data;
    });
  },
  methods: {
    handl(id,index){
      this.$dialog.confirm({
        title: '提示',
        message: '确定取消关注吗？'
      }).then(()=>{
    this.$axios({
      url: '/user_unfollow/'+ id,
      headers: {
        Authorization: this.localUser.token
      }
    }).then(res => {
      this.$toast.success('取消关注成功')

      this.follows.splice(index,1)
    })
      })
    }

  }
};
</script>

<style lang="less" scoped>
.user-item {
  padding: 20/360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  img {
    width: 40/360 * 100vw;
    height: 40/360 * 100vw;
    display: block;
    margin-right: 20/360 * 100vw;
    border-radius: 50%;
    object-fit: cover;
  }
  .user-info {
    flex: 1;
    margin-right: 20/360 * 100vw;
    font-size: 14px;
    p {
      font-size: 12px;
      color: #999;
    }
  }
  .cancel {
    padding: 5px 15px;
    font-size: 12px;
    background: #eee;
    border-radius: 50px;
  }
}
</style>