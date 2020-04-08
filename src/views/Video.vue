<template>
  <div>
    <video
      :src="$axios.defaults.baseURL + post.content"
      :poster="$axios.defaults.baseURL + post.cover[0].url"
      controls="controls"
      class="video"
    >您的浏览器不支持 video 标签。</video>
    <div class="main">
      <div class="author">
        <div class="userinfo">
          <img
            src="http://t12.baidu.com/it/u=2782147580,2038604057&fm=171&app=20&f=JPEG?w=700&h=395&s=1A15A14C147287DC065FA51A0300B09B"
            alt
          />
          <span>火星网友</span>
        </div>
        <!-- 如果关注是false，就加上active这个class，显示一个红色按钮 -->
        <span
          class="follow"
          @click="handleFollow"
          :class="post.has_follow ? '' : 'active'"
        >{{ post.has_follow ? '已关注' : '关注' }}</span>
      </div>

      <!-- 文章标题 -->
      <h2 class="title">如果关注是false，就加上active这个class</h2>
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
      <!-- 固定底部的 -->
      <div class="footer">
        <div class="comment-input">发布评论</div>
        <div class="icons">
          <span class="iconfont iconpinglun-"></span>
          <i>{{post.comment_length > 100 ? '99+' : post.comment_length }}</i>
        </div>
        <div class="icons" @click="handleStar">
          <span class="iconfont iconshoucang" :class="post.has_star ? 'active':''"></span>
        </div>
        <div class="icons">
          <span class="iconfont iconfenxiang"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 文章的详情
      post: {
        user: {},
        cover: [{}]
      }
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
      console.log(data);
      this.post = data;
    });
  },
  methods: {
    // 关注或取消关注
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
        // console.log(res)
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
    },
        // 收藏
    handleStar() {
      this.$axios({
        url: "/post_star/" + this.post.has_star,
        headers: {
          Authorization: this.token
        }
      }).then(res=>{
        this.post.has_star = !this.post.has_star

        this.$toast.success(res.data.message)
      })
    }
  }
};
</script>

<style scoped lang="less">
.video {
  width: 100%;
  display: block;
}
.main {
  padding: 10/360 * 100vw 20/360 * 100vw;
}
.author {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .userinfo {
    display: flex;
    align-items: center;
    img {
      width: 25/360 * 100vw;
      height: 25/360 * 100vw;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 5px;
    }
  }
}
.follow {
  padding: 3px 10px;
  border: 1px #999 solid;
  border-radius: 50px;
  font-size: 12px;
}
.active {
  background: red;
  border-color: red;
  color: #fff;
}
.title {
  font-weight: normal;
  font-size: 16px;
  margin: 10/360 * 100vw 0;
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
.footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  padding: 15/360 * 100vw 20/360 * 100vw;
  background: #fff;
  border-top: 1px solid #999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  .comment-input {
    flex: 1;
    background: #eee;
    color: #999;
    line-height: 30/360 * 100vw;
    border-radius: 12px;
    padding-left: 12/360 * 100vw;
  }
  .icons {
    margin: 0 10/360 * 100vw;
    position: relative;
    i {
      position: absolute;
      background: red;
      padding: 0 6/360 * 100vw;
      top: -12px;
      left: 12px;
      border-radius: 5px;
      color: #fff;
    }
    .active {
      color: red;
    }
  }
}
</style>