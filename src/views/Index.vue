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
    <van-tabs v-model="active" sticky swipeable @scroll="handelScroll">
      <van-tab v-for="(item,index) in categories" :title="item.name" :key="index">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <!-- immediate-check 这个属性可以阻止list组件默认就加载一次 -->
          <van-list
            immediate-check
            v-model="item.loading"
            :finished="item.finished"
            finished-text="我也是有底线的"
            @load="onLoad"
          >
            <div v-for="(subItem, subIndex) in item.list" :key="subIndex">
              <!-- 只有单张图片的 -->
              <PostItem1
                v-if="subItem.type === 1 &&
            subItem.cover.length < 3 &&
             subItem.cover.length > 0 "
                :data="subItem"
              />
              <PostItem2 v-if="subItem.type === 1 && subItem.cover.length >= 3" :data="subItem" />
              <PostItem3 v-if="subItem.type === 2" :data="subItem" />
            </div>
          </van-list>
        </van-pull-refresh>
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
      // 菜单的数据
      categories: [],
      // 记录当前tab栏的索引
      active: 0,
      // 是否在下拉加载
      refreshing: false,
      // list: [],
      token: ""
      // loading: false, // 是否正在加载中
      // finished: false, // 是否已经加载完毕
    };
  },
  // 监听属性
  watch: {
    // 监听tab栏的切换
    active() {
      if (this.active === this.categories.length - 1) {
        this.$router.push("/栏目管理");
        return;
      }
      //请求不同栏目的数据
      this.getList();
      setTimeout(()=>{
        window.scrollTo(0,this.categories[this.active].scrollY);
      }, 0)
    }
  },
  components: {
    PostItem1,
    PostItem2,
    PostItem3
  },
  mounted() {
    const categories = JSON.parse(localStorage.getItem("categories"));
    const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};
    this.token = token;
    if (categories) {
      if (
        (token && categories[0].name !== "关注") ||
        (!token && categories[0].name === "关注")
      ) {
        // 当token值没有数据或有数据，但是第一个不是‘关注’的话，就重新请求数据
        this.getCategories();
      } else {
        this.categories = categories;
        this.handleCategories();
      }
    } else {
      this.getCategories();
    }
    this.getList();
  },
  methods: {
    handleCategories() {
      this.categories = this.categories.map(v => {
        v.pageIndex = 1; //给每个栏目都添加了一个pageIndex属性
        v.list = []; //给每个栏目都拥有自己的文章列表
        v.loading = false;
        v.finished = false;
        v.scrollY = 0
        return v;
      });
    },
    getCategories() {
      const config = {
        url: "/category"
      };
      if (this.token) {
        config.headers = { Authorization: this.token };
      }
      this.$axios(config).then(res => {
        const { data } = res.data;
        data.push({
          name: "∨"
        });
        this.categories = data;
        localStorage.setItem("categories", JSON.stringify(data));
        this.handleCategories();
      });
    },
    getList() {
      const { pageIndex, id, name, finished } = this.categories[this.active];
      if (finished) return;
      const config = {
        url: "/post",
        params: {
          pageIndex,
          pageSize: 5,
          category: id
        }
      };
      if (name === "关注") {
        config.headers = {
          Authorization: this.token
        };
      }
      // 加载下一页的数据
      this.$axios(config).then(res => {
        const { data, total } = res.data;
        // 把文章数据合并在原来的文章列表中
        this.categories[this.active].list = [
          ...this.categories[this.active].list,
          ...data
        ];
        this.categories = [...this.categories];

        this.categories[this.active].loading = false;
        // 判断是否最后一页

        if (this.categories[this.active].list.length === total) {
          this.categories[this.active].finished = true;
        }
      });
    },
    onLoad() {
      // 当前栏目下的pageIndex加1
      this.categories[this.active].pageIndex += 1;
      this.getList();
    },
    handelScroll(data) {
      if(this.categories.length === 0)return;

      // scrollTop是滚动条的距离
      const { scrollTop } = data;
      this.categories[this.active].scrollY = scrollTop
    },
    onRefresh() {
      // 表示加载完毕
      this.refreshing = false;
      console.log("正在下拉刷新");
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