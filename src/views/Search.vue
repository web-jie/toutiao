<template>
  <div class="hand">
    <!-- 红色的头部 -->
    <div class="header">
      <span class="iconfont iconjiantou2"></span>
      <div class="search-wrapper">
        <span class="iconfont iconsearch"></span>
        <input placeholder="请输入搜索关键字" />
      </div>
      <span>搜索</span>
    </div>
    <!-- 历史记录 -->
    <div class="record">
      <div class="title">
        <strong>历史记录</strong>
        <span class="iconfont iconicon_test"></span>
      </div>
      <div class="record_list">
        <span class="record-item">美女</span>
        <span class="record-item">美女</span>
        <span class="record-item">美女</span>
        <span class="record-item">美女</span>
        <span class="record-item">美女</span>
        <span class="record-item">美女</span>
        <span class="record-item">美女</span>
        <span class="record-item">美女</span>
        <span class="record-item">美女</span>
        <span class="record-item">美女</span>
        <span class="record-item">美女</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.hand {
  padding: 0 20/360 * 100vw;
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
    .record_list {
      display: block;
      margin-top: 10/360 * 100vw;
      .record-item {
        display: inline-block;
        margin: 10/360 * 100vw;
      }
    }
  }
}
</style>