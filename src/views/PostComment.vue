<template>
  <div class="container">
    <!-- 头部导航组件 -->
    <NavigateBar title="精彩跟帖" />

    <!-- v-model：是否正在加载中
    finished：数据是否加载完成
    @load：滚动到底部时候触发的事件-->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="已经到底了"
      :immediate-check="false"
      @load="onLoad"
    >
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

    <!-- 发布评论的底部 -->
    <div class="publish">
      <!-- 输入框，点击和没点击时候显示的效果是不一样的 -->
      <van-field
        v-model="message"
        :rows="rows"
        autosize
        type="textarea"
        placeholder="说点什么..."
        class="textarea"
      />
    </div>
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
      // 请求页数
      pageIndex: 1,
      // 请求条数
      pageSize: 5,
      message: "",
      rows: 1
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
        url: `/post_comment/${this.pid}`,
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      }).then(res => {
        const { data } = res.data;
        // this.list = data;
        this.list = [...this.list, ...data];
        // 请求完毕后，页数加一。
        this.pageIndex += 1;
        // 并初始化 相关的值
        this.loading = false;
        // 数据加载完毕
        if (data.length < this.pageSize) {
          this.finished = true;
        }
      });
    },
    onLoad() {
      // console.log(123);
      this.getList();
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  padding-bottom: 60/360 * 100vw;
}
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
.publish{
    position: fixed;
    width: 100%;
    left:0;
    bottom:0;
    padding: 5/360*100vw 15/360*100vw;
    box-sizing: border-box;
    background: #fff;
    .textarea{
        background: #eee;
        border-radius: 50px;
        padding: 5px 20px;
    }
}
</style>