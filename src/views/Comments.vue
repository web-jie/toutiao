<template>
  <div>
    <NavigateBar title="我的跟帖" />

    <!-- 要循环的内容 -->
    <div class="comment-item" v-for="(item, index) in comments" :key="index">
      <div class="date">{{moment(item.create_date).format('YYYY-MM-DD hh:mm')}}</div>
      <!-- 有回复的评论需要展示的，就是我回复了谁 -->
      <div class="parent" v-if="item.parent">
        <div class="parent-user">回复：{{ item.parent.user.nickname }}</div>
        <div class="parent-content">{{ item.parent.content }}</div>
      </div>
      <!-- 自己发布的内容 -->
      <div class="comment-content">{{item.content}}</div>
      <router-link to="#" class="link-post">
        <div>原文：{{ item.post.title }}</div>
        <span class="iconfont iconjiantou1"></span>
      </router-link>
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
      moment,
      comments: []
    };
  },
  components: {
    NavigateBar
  },
  //数据加载完后执行
  mounted() {
    const solseToken = JSON.parse(localStorage.getItem("userInfo"));
    this.$axios({
      url: "/user_comments",
      headers: {
        Authorization: solseToken.token
      }
    }).then(res => {
      const { data } = res.data;
      this.comments = data;
    });
  }
};
</script>

<style lang="less" scoped>
.comment-item {
  padding: 20/360 * 100vw;
  border-bottom: 1px solid #eee;
  .date {
    color: #999;
  }
  .parent {
    margin: 10px 0;
    padding: 10px 1px;
    background: #999;
  }
  .comment-content {
    margin: 10/360 * 100vw 0;
  }
  .link-post {
    color: #999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div{
      flex: 1;
      // 文字超出出现省略号一定是块元素才有作用
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
    }
  }
}
</style>