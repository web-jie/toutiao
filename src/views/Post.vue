<template>
  <div class="container">
    <div class="main">
      <!-- 头部 -->
      <div class="header">
        <div class="left">
          <span class="iconfont iconjiantou2" @click="$router.back()"></span>
          <span class="iconfont iconnew"></span>
        </div>
        <span class="follow " :class="post.has_follow ? '':'active'">{{post.has_follow ? '已关注': '关注'}}</span>
      </div>
      <h2 class="title">{{post.title}}</h2>
      <p class="author">{{post.user.nickname}} {{moment(post.create_date).format(`YYYY-MM-DD hh:mm:ss`)}}</p>
      <div
        class="content"
        v-html="post.content"
      ></div>
      <!-- 按键列表 -->
      <div class="actions">
        <div class="actions-item">
          <span class="iconfont icondianzan"></span>
          <i>{{Number(post.has_like)}}</i>
        </div>
        <div class="actions-item">
          <span class="iconfont iconweixin"></span>
          <i>微信</i>
        </div>
      </div>
    </div>
    <!-- 固定底部的 -->
    <div class="footer">
      <div class="comment-input">发布评论</div>
      <div class="icons">
        <sapn class="iconfont iconpinglun-"></sapn>
        <i>{{post.comment_length > 100 ? '99+' : post.comment_length }}</i>
      </div>
      <div class="icons" :class="post.has_star ? 'active':''">
        <span class="iconfont iconshoucang active"></span>
      </div>
      <div class="icons">
        <span class="iconfont iconfenxiang" ></span>
      </div>
    </div>
  </div>
</template>

<script>
// 时间转换工具库
import moment from "moment";
export default {
  data(){
    return{
      post: {
        // 因为模板需要访问post.user.nickname
        user:{}
      },
      moment,
    }
  },
  mounted(){
    const {id} = this.$route.params
    this.$axios({
      url: "/post/" + id
    }).then(res =>{
      const {data} = res.data;
      console.log(data)
      this.post = data
    })
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
      padding: 0 6/360 * 100vw ;
      border-radius: 14px;
      background: #e9e9e9;
    }
    .active{
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
    /deep/ img{
            max-width: 100%;
        }
  }
  .actions {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 30/360 * 100vw;
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
  .footer{
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    padding: 15/360*100vw 20/360*100vw;
    background: #fff;
    border-top: 1px solid #999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    .comment-input{
      flex: 1;
      background: #eee;
      color: #999;
      line-height: 30/360*100vw;
      border-radius: 12px;
      padding-left: 12/360*100vw;
    }
    .icons{
      margin: 0 10/360*100vw;
      position: relative;
      i{
        position: absolute;
        background: red;
        padding: 0 6/360*100vw;
        top: -12px;
        left: 12px;
        border-radius: 5px;
        color: #fff;
      }
      .active{
        color: red;
      }
    }
  }
}
</style>