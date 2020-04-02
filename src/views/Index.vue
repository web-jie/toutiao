<template>
  <div>
    <!-- 红色导航栏 -->
    <div class="header">
      <span class="iconfont iconnew"></span>
      <router-link to="#" class="search">
        <span class="iconfont iconsearch"></span>
        <i>搜索新闻</i>
      </router-link>
      <router-link to="/personal">
        <span class="iconfont iconwode"></span>
      </router-link>
    </div>
    <van-tabs v-model="active" sticky swipeable>
      <van-tab v-for="(item,index) in categories" :title="item.name" :key="index">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div v-for="(item, index) in list" :key="index">
            <!-- 只有单张图片的 -->
            <PostItem1 />
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import PostItem1 from "@/components/PostItem1";
import PostItem2 from "@/components/PostItem2";
import PostItem3 from "@/components/PostItem3";
export default {
  data() {
    return {
      // categories: [
      //   "关注",
      //   "娱乐",
      //   "体育",
      //   "汽车",
      //   "房产",
      //   "关注",
      //   "关注",
      //   "娱乐",
      //   "体育",
      //   "汽车",
      //   "房产",
      //   "关注",
      //   "∨"
      // ],
      categories: [],
      list: [1, 1, 1, 1, 1, 1],
      active: 0,
      loading: false,
      finished: false
    };
  },
  watch: {
    active() {
      if (this.active === this.categories.length - 1) {
        this.$router.push("/栏目管理");
      }
    }
  },
  components: {
    PostItem1,
    PostItem2,
    PostItem3
  },
  mounted() {
    //获取本地存储中是否有数据
    const categories = JSON.parse(localStorage.getItem("categories"));
    // 获取当前是否登录
    const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};

    if (categories) {
      if (categories[0] !== "关注" && token) {
        this.getCategories(token);
        return;
      }
      if (categories[0] === "关注" && !token) {
        this.getCategories();
        return;
      }
    } else {
      this.getCategories(token);
    }
  },
  methods: {
    getCategories(token) {
      const config = {
        url: "/category",
      };
      if (token) {
        config.headers = {Authorization: token}
      }

      this.$axios(config).then(res => {
        console.log(res);
        const { data } = res.data;
        data.push({
          name: "∨"
        });
        this.categories = data;
        // 把数据写入本地存储中
        localStorage.setItem("categories", JSON.stringify(data));
      });
    },
    onLoad() {
      console.log("已经拖动到了底部");
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(1);
        }
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 5000);
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  height: 50/360 * 100vw;
  background: #ff0000;
  display: flex;
  padding: 0 20/360 * 100vw;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  .iconnew {
    flex: 1;
    font-size: 50px;
    position: relative;
  }
  .search {
    flex: 1;
    height: 32/360 * 100vw;
    background: rgba(255, 255, 255, 0.5);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    vertical-align: middle;
    left: -50/360 * 100vw;
  }
  .iconwode {
    flex: 1;
  }
}
/deep/ .van-tabs__nav {
  background: #eee;
}
/deep/ .van-tab:nth-last-child(2) {
  background: #eee;
  width: 20px !important;
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: unset;
}
/deep/ .van-tab {
  flex-basis: 15% !important;
}
/deep/ .van-tabs__wrap {
  padding-right: 20px;
}
/deep/ .van-tabs__nav {
  position: static;
}
/deep/ .van-tabs__line {
  display: none;
}
/deep/ .van-tab--active {
  border-bottom: 1px #ff0000 solid;
}
</style>