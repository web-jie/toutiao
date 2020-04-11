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
          <span class="reply" @click="handleReply(item)">回复</span>
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
        :autosize="!isFocus"
        type="textarea"
        :placeholder="reply.user ? `回复：@` + reply.user.nickname : `说点什么...`"
        class="textarea"
        :class="isFocus ? `ative` : ``"
        @focus="handleFocus"
        @blur="handleBlur"
        @keyup.enter="handleSubmit"
        ref="textarea"
      />
      <span class="submit" v-show="isFocus" @click="handleSubmit">发布</span>
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
      rows: 1,
      // 几率当前的输入框是否获得焦点
      isFocus: false,
      // 回复评论的对象
      reply: {}
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
    },
    // 评论输入框获得焦点时候触发的事件
    handleFocus() {
      // 修改评论输入框的高度
      this.isFocus = true;
    },
    // 评论输入框失去焦点时候触发
    handleBlur() {
      setTimeout(() => {
        this.isFocus = false;
        // 失去焦点时候如果输入框的值是空的，就把回复的人清空
        if (this.message.trim() === "") {
          this.reply = {};
        }
      }, 100);
    },
    handleSubmit() {
      console.log(111);
      // 内容不能为空
      if (this.message.trim() == "") {
        return;
      }
      // 如果能看到发布就是代表用户是登录状态
      const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};
      // 评论接口数据
    const data = {
      content: this.message
    }
    if(this.reply.id){
      data.parent_id = this.reply.id
    }

      // 发布评论请求
      this.$axios({
        url: "/post_comment/" + this.pid,
        method: "POST",
        headers: {
          Authorization: token
        },
        data
      }).then(res => {
        this.message = "";
        this.$toast.success("评论成功");
        this.list = []; //必须要清空，否则它保存的是之前的评论
        this.pageIndex = 1;
        this.getList();
        this.reply = {}
      });
    },
    // 点击回复按钮触发的事件
    handleReply(item) {
      // 因为点击时候失去焦点，已经触发了handleBlur事件
      setTimeout(() => {
        // 记录下来当前回复的评论信息,就是我们的评论在回复item
        this.reply = item;
        // 弹起输入框
        this.isFocus = true;
        // 输入框获得焦点
        this.$refs.textarea.focus();
      }, 200);
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
.publish {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  padding: 5/360 * 100vw 15/360 * 100vw;
  box-sizing: border-box;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .textarea {
    background: #eee;
    border-radius: 50px;
    padding: 5px 20px;
    padding: 5px 15px;
  }
  .ative {
    height: 82px !important;
    border-radius: 8px;
  }
  .submit {
    margin-left: 5px;
    padding: 3px 10px;
    color: #fff;
    background: red;
    border-radius: 50px;
    font-size: 12px;
    flex-shrink: 0;
  }
}
</style>