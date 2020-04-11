<template>
  <div class="comment-floor">
    <!-- 自己调用自己 -->
    <commentFloor v-if="data.parent" :data="data.parent" @reply="handleReply" />
    <div class="floor-top">
      <div class="user">
        <!-- <span>1</span> -->
        <em>{{data.user.nickname}}</em>
        <span>{{moment(data.create_date).fromNow() }}</span>
      </div>
      <span class="reply" @click="handleReply(data)">回复</span>
    </div>
    <div class="content">{{data.content}}</div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  
  // name值可以在当前调用自己，组件调用自己
  name: "commentFloor",
  props: ["data"],
  data() {
    return {
      moment
    };
  },
  methods: {
    // 组件内部的回复的事件
    handleReply(data) {
      // 触发父组件传递过来的reply函数
      this.$emit("reply", data);
    }
  },

};
</script>

<style lang="less" scoped>
.comment-floor {
  margin-top: 10/360 * 100vw;
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
      margin: 10/360 * 100vw 0;
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
    // padding-left: 10/360 * 100vw;
    padding: 10/360 * 100vw 10/360 * 100vw;
  }
}
</style>