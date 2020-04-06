<template>
  <div>
    <NavigateBar title="栏目管理" />
    <div class="content">
      <p>点击就删除</p>
      <div class="list">
        <span
          class="item"
          v-for="(item,index) in arrUp"
          :key="index"
          :class="['关注','头条'].includes(item.name) ? 'active': ''"
          @click="handDel(item,index)"
        >{{item.name}}</span>
      </div>
      <p>点击就填加</p>
      <div class="list">
        <span
          class="item"
          v-for="(item,index) in arrDown"
          :key="index"
          @click="handAdd(item,index)"
        >{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
// 引入头部导航栏插件
import NavigateBar from "@/components/NavigateBar.vue";
export default {
  data() {
    return {
      categories: [],
      arrUp: [],
      arrDown: []
    };
  },
  components: {
    NavigateBar
  },
  mounted() {
    this.categories = JSON.parse(localStorage.getItem("categories"));
    this.arrUp = this.categories.filter(v => {
      return v.is_top === 1;
    });
    this.arrDown = this.categories.filter(v => {
      return v.is_top === 0;
    });
  },
  // destroyed页面销毁时触发此事件
  destroyed() {
    this.categories = [
      ...this.arrUp,
      ...this.arrDown,
      this.categories[this.categories.length - 1]
    ];
    const str = JSON.stringify(this.categories);
    localStorage.setItem("categories", str);
  },
  methods: {
    handDel(item, index) {
      if (item === "关注" || item === "头条") return;
      this.arrUp.splice(index, 1);
      item.is_top = 0;
      this.arrDown.push(item);
    },
    handAdd(item, index) {
      this.arrDown.splice(index, 1);

      item.is_top = 1;

      this.arrUp.push(item);
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  p {
    color: #000;
    font-size: 12px;
  }
  .list {
    display: block;
    margin-top: 20/360 * 100vw;
    span {
      display: inline-block;
      margin: 10/360 * 100vw 18/360 * 100vw;
      padding: 5/360 * 100vw;
      background: #eee;
      border: 1px solid #999;
    }
  }
}
.active {
  border-color: #ddd;
  color: #999;
}
</style>