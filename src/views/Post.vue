<template>
  <div class="container">
    <div class="main">
      <!-- 头部 -->
      <div class="header">
        <div class="left">
          <span class="iconfont iconjiantou2" @click="$router.back()"></span>
          <span class="iconfont iconnew"></span>
        </div>
        <span
          class="follow"
          @click="handleFollow"
          :class="post.has_follow ? '':'active'"
        >{{post.has_follow ? '已关注': '关注'}}</span>
      </div>
      <h2 class="title">{{post.title}}</h2>
      <p
        class="author"
      >{{post.user.nickname}} {{moment(post.create_date).format(`YYYY-MM-DD hh:mm:ss`)}}</p>
      <div class="content" v-html="post.content"></div>
      <!-- 按键列表 -->
      <div class="actions">
        <div class="actions-item">
          <!-- 点赞 -->
          <span class="iconfont icondianzan" @click="handleLike"></span>
          <i>{{post.like_length}}</i>
        </div>
        <div class="actions-item">
          <span class="iconfont iconweixin"></span>
          <i>微信</i>
        </div>
      </div>
    </div>
    <!-- 固定底部的 -->
    <!-- 固定底部的 -->
    <PostFooter :post="post" />
  </div>
</template>

<script>
// 时间转换工具库
import moment from "moment";
// 底部栏
import PostFooter from "@/components/PostFooter";
export default {
  components: {
    PostFooter
  },
  data() {
    return {
      post: {
        // 因为模板需要访问post.user.nickname
        user: {}
      },
      moment,
      token: ""
    };
  },
  mounted() {
    const { id } = this.$route.params;
    const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};
    this.token = token;
    const config = {
      url: "/post/" + id
    };
    if (token) {
      config.headers = {
        Authorization: token
      };
    }
    this.$axios(config).then(res => {
      const { data } = res.data;
      this.post = data;
    });
  },
  methods: {
    // 关注和取消关注
    handleFollow() {
      let url = "";
      if (this.post.has_follow) {
        url = "/user_unfollow/" + this.post.user.id;
      } else {
        url = "/user_follows/" + this.post.user.id;
      }
      const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};
      this.$axios({
        url,
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        // 关注之后修改关注状态
        this.post.has_follow = !this.post.has_follow;
        this.$toast.success(this.post.has_follow ? "关注成功" : "取消关注");
      });
    },
    // 取消点赞或确定点赞
    handleLike() {
      this.$axios({
        url: "/post_like/" + this.post.id,
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        // 修改点赞状态
        this.post.has_like = !this.post.has_like;

        if (this.post.has_like) {
          this.post.like_length += 1;
        } else {
          this.post.like_length -= 1;
        }
        this.$toast.success(res.data.message);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 0 20/360 * 100vw;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10/360 * 100vw 0;
    .left {
      font-size: 16px;
      display: block;
      .iconnew {
        display: inline-block;
        transform: scale(3);
        margin-left: 20/360 * 100vw;
      }
    }
    .follow {
      display: inline-block;
      border: 1px solid #eee;
      padding: 0 6/360 * 100vw;
      border-radius: 14px;
      background: #e9e9e9;
    }
    .active {
      background: red;
      color: #fff;
    }
  }
  .title {
    font-size: 18px;
  }
  .author {
    color: #999;
    margin: 5/360 * 100vw;
  }
  .content {
    margin-top: 15/360 * 100vw;
    color: #333333;
    line-height: 1.8;
    /deep/ img {
      max-width: 100%;
    }
  }
  .actions {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 30/360 * 100vw;
    margin-bottom: 80/360 * 100vw;
    .actions-item {
      display: flex;
      align-items: center;
      border: 1px solid #999;
      padding: 4/360 * 100vw 9/360 * 100vw;
      border-radius: 14px;
    }
    span {
      margin-right: 8px;
    }
    .iconweixin {
      color: #00c800;
    }
  }
}
</style>