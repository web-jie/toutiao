<template>
  <div>
    <!-- 头部导航组件 -->
    <NavigateBar title="精彩跟帖" />

    <!-- v-model：是否正在加载中
    finished：数据是否加载完成
    @load：滚动到底部时候触发的事件-->
    <van-list v-model="loading" 
    :finished="finished" 
    finished-text="已经到底了" 
    :immediate-check="false"
    @load="onLoad">
      <!-- 跟帖评论列表 -->
      <div class="comment" v-for="(item,index) in list" :key="index">
        <div class="comment-top">
          <div class="user">
            <img :src="$axios.defaults.baseURL + item.user.head_img" alt />
            <div class="user-info">
              <p>{{item.user.nickname}}</p>
              <span>{{moment(item.create_date).fromNow()}}</span>
            </div>
          </div>
          <span class="reply">回复</span>
        </div>
        <!-- 回复楼层 -->

        <CommentFloor v-if="item.parent" :data="item.parent" />

        <div class="content">{{item.content}}</div>
      </div>
    </van-list>
  </div>
</template>

<script>
// 引入头部导航栏
import NavigateBar from "@/components/NavigateBar";
// 引入评论楼层插件
import CommentFloor from "@/components/CommentFloor";
// 插入时间插件
import moment from "moment";
// 改变时间插件的文字
moment.locale("zh-CN");
export default {
  data() {
    return {
      // 文章id
      pid: "",
      // 评论列表
      list: [],
      moment,
      // 是否在加载
      loading: false,
      // 是否加载完毕
      finished: false,

    };
  },
  components: {
    NavigateBar,
    CommentFloor
  },
  mounted() {
    const { id } = this.$route.params;
    // 保存id
    this.pid = id;
    this.getList();
  },
  methods: {
    // 请求评论数据
    getList() {
      this.$axios({
        url: `/post_comment/${this.pid}`
      }).then(res => {
        const { data } = res.data;
        this.list = data;
      });
    },
    onLoad(){
      console.log(123)
    }
  }
};
</script>

<style lang="less" scoped>
.comment {
  padding: 0 20/360 * 100vw;
  border-bottom: 1px solid #999;
  .comment-top {
    margin-top: 30/360 * 100vw;
    display: flex;
    justify-content: space-between;
    .user {
      display: flex;
      align-items: center;
      img {
        width: 35/360 * 100vw;
        height: 35/360 * 100vw;
        border-radius: 50%;
      }
      .user-info {
        padding-left: 10/360 * 100vw;
        line-height: 1.6;
      }
    }
  }
  .content {
    padding: 15/360 * 100vw 0;
  }
}
</style>