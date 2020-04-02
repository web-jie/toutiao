<template>
  <div>
    <div class="imgText">
      <div class="imgText-left">
        <h4>{{data.title}}</h4>
        <p>{{data.user.nickname}} {{data.comment_length}}跟帖</p>
      </div>
      <img :src="$axios.defaults.baseURL + data.cover[0].url" alt />
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"]
};
</script>

<style lang="less" scoped>
.imgText {
  padding: 0 20/360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  .imgText-left {
    h4 {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-weight: normal;
      font-size: 14px;
    }
    p {
      margin-top: 12px;
      color: #999;
    }
  }
  img {
    display: block;
    width: 110/360 * 100vw;
    height: 75/360 * 100vw;
    object-fit: cover;
    margin-left: 10/360 * 100vw;
    flex-shrink: 0; // 防止图片在flex布局下被挤压
  }
}
</style>