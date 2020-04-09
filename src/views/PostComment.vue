<template>
  <div>
    <!-- 头部导航组件 -->
    <NavigateBar title="精彩跟帖" />

    <!-- 跟帖评论列表 -->
    <div class="comment">
      <div class="comment-top">
        <div class="user">
          <img
            src="https://img12.360buyimg.com/img/s100x100_jfs/t2770/142/2313361897/493911/1e5ea1db/575fd5f7N1cfc4411.jpg!cc_100x100.webp"
            alt
          />
          <div class="user-info">
            <p>火星网友</p>
            <span>2小时前</span>
          </div>
        </div>
        <span class="reply">回复</span>
      </div>
      <div class="content">文章说的很有道理！</div>
    </div>
  </div>
</template>

<script>
import NavigateBar from '@/components/NavigateBar'
export default {
  data() {
    return {
    };
  },
  components: {
    NavigateBar
  }
};
</script>

<style lang="less" scoped>
.comment{
  padding: 0 20/360*100vw;
      border-bottom: 1px solid #999;
  .comment-top{
    margin-top: 30/360*100vw;
    display: flex;
    justify-content: space-between;
    .user{
      display: flex;
      align-items: center;
      img{
        width: 35/360*100vw;
        height: 35/360*100vw;
        border-radius: 50%;
      }
      .user-info{
        padding-left: 10/360*100vw;
        line-height: 1.6;
      }
    }
  }
  .content{
    margin: 15/360*100vw 0;
  }
}
</style>