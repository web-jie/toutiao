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
      <!-- 回复楼层 -->
                  <div class="comment-floor">
                <div class="floor-top">
                    <div class="user">
                        <!-- <span>1</span> -->
                        <em>火星网友</em>
                        <span>2小时前</span>
                    </div>
                    <span class="reply">回复</span>
                </div>
                <div class="content">
                    文章评论的回复
                </div>

                <!-- 第二级 -->
                <div class="comment-floor">
                    <div class="floor-top">
                        <div class="user">
                            <!-- <span>2</span> -->
                            <em>火星网友</em>
                            <span>2小时前</span>
                        </div>
                        <span class="reply">回复</span>
                    </div>
                    <div class="content">
                        文章评论的回复
                    </div>

                    <!-- 第3级 -->
                    <div class="comment-floor">
                        <div class="floor-top">
                            <div class="user">
                                <!-- <span>3</span> -->
                                <em>火星网友</em>
                                <span>2小时前</span>
                            </div>
                            <span class="reply">回复</span>
                        </div>
                        <div class="content">
                            文章评论的回复
                        </div>
                    </div>
                </div>
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
    padding: 15/360*100vw 0;
  }
  .comment-floor{
    padding: 0 2/360*100vw;
    // border: 1px solid #000;
    background: #e9e9e9;
    .floor-top{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 10/360*100vw;
      .user{
        padding-left: 10/360*100vw;
        span{
          color: #999;
          padding-left: 14/360*100vw;
        }
      }
      .reply{
        padding-right: 10/360*100vw;
      }
    }
    .content{
      padding-left: 10/360*100vw;
    }
  }
}
</style>