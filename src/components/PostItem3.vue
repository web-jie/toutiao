<template>
  <router-link :to="`/video/${data.id}`">
    <div class="video">
      <h4>{{data.title}}</h4>
      <div class="cover">
        <img :src="$axios.defaults.baseURL + data.cover[0].url" alt />
        <!-- 图片中的播放文件 -->
        <div class="layer">
          <span class="iconfont iconshipin"></span>
        </div>
      </div>
      <p>{{data.user.nickname}} {{data.comment_length}}跟帖</p>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ["data"]
};
</script>

<style lang="less" scoped>
.video {
  padding: 0 20/360 * 100vw;
  border-bottom: 1px solid #999;
  h4 {
    margin: 10px 0;
  }
  .cover {
    margin-bottom: 10px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .layer {
      position: absolute;
      left: 50%;
      top: 50%;
      display: block;
      width: 56/360 * 100vw;
      height: 56/360 * 100vw;
      background: rgba(0, 0, 0, 0.5);
      transform: translate(-28/360 * 100vw, -28/360 * 100vw);
      border-radius: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        font-size: 32px;
        color: #fff;
      }
    }
  }
}
</style>