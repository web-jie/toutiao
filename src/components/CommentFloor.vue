<template>
  <div class="comment-floor">
    <div class="floor-top">
      <div class="user">
        <!-- <span>1</span> -->
        <em>火星网友</em>
        <span>2小时前</span>
      </div>
      <span class="reply">回复</span>
    </div>
    <div class="content">文章评论的回复</div>
  </div>
</template>

<script>
export default {
  // name值可以在当前调用自己，组件调用自己
  name: "commentFloor"
  // props: ['post']
};
</script>

<style lang="less" scoped>
.comment-floor {
  padding: 0 2/360 * 100vw;
  // border: 1px solid #000;
  background: #e9e9e9;
  .floor-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10/360 * 100vw;
    .user {
      padding-left: 10/360 * 100vw;
      span {
        color: #999;
        padding-left: 14/360 * 100vw;
      }
    }
    .reply {
      padding-right: 10/360 * 100vw;
    }
  }
  .content {
    padding-left: 10/360 * 100vw;
  }
}
</style>