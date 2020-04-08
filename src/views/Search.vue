<template>
  <div class="hand">
    <!-- 红色的头部 -->
    <div class="header">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <div class="search-wrapper">
        <span class="iconfont iconsearch"></span>
        <input placeholder="请输入搜索关键字" autofocus v-model="value" @keyup.enter="handleSearch" />
      </div>
      <span @click="handleSearch">搜索</span>
    </div>
    <!-- 历史记录 -->
    <div class="record">
      <div class="title">
        <strong>历史记录</strong>
        <span class="iconfont iconicon-test" @click="handelDel"></span>
      </div>
      <div class="record_list">
        <span
          class="record-item"
          v-for="(item,index) in history"
          :key="index"
          @click="handleRecord(item)"
        >{{item}}</span>
      </div>
    </div>
    <!-- 结果的浮层 -->
    <div class="result-layer" v-if="showLayer">
      <div v-for="(item,index) in list" :key="index">
        <!-- 只有单张图片的 -->
        <PostItem1
          v-if="item.type === 1 &&
            item.cover.length < 3 &&
             item.cover.length > 0 "
          :data="item"
        />
        <PostItem2 v-if="item.type === 1 && item.cover.length >= 3" :data="item" />
        <PostItem3 v-if="item.type === 2" :data="item" />
      </div>
      <div class="empty" v-if="list.length === 0">没有你想要的内容</div>
    </div>
  </div>
</template>

<script>
import PostItem1 from "@/components/PostItem1";
import PostItem2 from "@/components/PostItem2";
import PostItem3 from "@/components/PostItem3";
export default {
  data() {
    return {
      value: "",

      history: JSON.parse(localStorage.getItem("history")) || [],
      list: [],
      showLayer: false
    };
  },
  components: {
    PostItem1,
    PostItem2,
    PostItem3
  },
  watch:{
    value(){
      if(this.value === ''){
        this.list = []
        this.showLayer = false
      }
    }
  },
  methods: {
    getlist() {
      this.$axios({
        url: "/post_search",
        params: {
          keyword: this.value
        }
      }).then(res => {
        this.showLayer = true;
        const { data } = res.data;
        this.list = data;
              console.log(this.list)
      });
    },
    handleRecord(item) {
      // console.log(item)+
      this.value = item;
      this.getlist();
    },
    handleSearch() {
      if (this.value == "") return;
      this.history.unshift(this.value);
      // 数组去重
      this.history = [...new Set(this.history)];
      // 把关键字添加到本地
      localStorage.setItem("history", JSON.stringify(this.history));
      this.value = "";
      this.getlist()

    },
    handelDel() {
      this.history = [];
      localStorage.removeItem("history");
    }
  }
};
</script>

<style lang="less" scoped>
.hand {
  padding: 0 20/360 * 100vw;
  overflow: hidden;
  height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40/360 * 100vw;
    .search-wrapper {
      display: flex;
      border: 1px solid #000;
      width: 200/360 * 100vw;
      height: 30/360 * 100vw;
      border-radius: 20px;
      align-items: center;
      .iconsearch {
        padding: 0 8/360 * 100vw;
        align-items: center;
      }
      input {
        outline: none;
        border: none;
      }
    }
  }
  .record {
    .title {
      display: flex;
      margin-top: 10/360 * 100vw;
      justify-content: space-between;
      align-items: center;
    }
    .record_list {
      display: block;
      margin-top: 10/360 * 100vw;
      .record-item {
        display: inline-block;
        font-size: 14px;
        padding: 10/360 * 100vw;
        border: 1px solid #999;
        background: #eee;
        margin: 5/360 * 100vw;
      }
    }
  }
  .result-layer {
    position: absolute;
    top: 40/360 * 100vw;
    bottom: 0;
    left: 0;
    padding: 0 10/360 * 100vw;
    width: 100%;
    overflow-y: auto;
    background: #fff;
    box-sizing: border-box;

    .result-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eee;
      margin: 10/360 * 100vw 0;
      p {
        flex: 8;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      span {
        flex: 1;
        color: #999;
      }
    }
  }
  .empty {
    color: #999;
    font-size: 14px;
    text-align: center;
  }
}
</style>