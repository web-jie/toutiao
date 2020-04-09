<template>
  <div>
    <!-- 头部导航组件 -->
    <NavigateBar title="精彩跟帖" />

    <!-- 跟帖评论列表 -->
    <div class="comment" v-for="(item,index) in list" :key="index" >
      <div class="comment-top">
        <div class="user">
          <img
            :src="$axios.defaults.baseURL + item.user.head_img"
            alt
          />
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
  </div>
</template>

<script>
// 引入头部导航栏
import NavigateBar from '@/components/NavigateBar'
// 引入评论楼层插件
import CommentFloor from '@/components/CommentFloor'
// 插入时间插件
import moment from 'moment'
// 改变时间插件的文字
moment.locale('zh-CN')
export default {
  data() {
    return {
      // 文章id
      pid: '',
      // 评论列表
      list: [],
      moment,
    };
  },
  components: {
    NavigateBar,
    CommentFloor
  },
  mounted(){
    const {id} = this.$route.params;
    // 保存id
    this.pid = id;
    this.getList()
  },
  methods: {
    // 请求评论数据
    getList(){
      this.$axios({
        url: `/post_comment/${this.pid}`
      }).then(res => {
        const {data} = res.data
        this.list = data
      })
    }
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
  
}
</style>