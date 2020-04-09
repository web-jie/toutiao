<template>
  <!-- 公共的底部 -->
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
</template>

<script>
export default {
  props:['post'],

  methods:{
            // 收藏
    handleStar() {
      const {token} = JSON.parse(localStorage.getItem('userInfo'))||{} 
      this.$axios({
        url: "/post_star/" + this.post.id,
        headers: {
          Authorization: token
        }
      }).then(res=>{
        this.post.has_star = !this.post.has_star

        this.$toast.success(res.data.message)
      })
    }
  }
};
</script>

<style lang="less" scoped>
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