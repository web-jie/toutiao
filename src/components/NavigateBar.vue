<template>
  <!-- 创建头部导航栏组件 -->
  <div class="navigate-bar">
    <span class="iconfont iconjiantou2" @click="$router.back()"></span>
    <strong>{{title}}</strong>
    <span class="iconfont iconshouye" @click="$router.push('/login')" v-if="showHome"></span>
    <span v-else class="iconfont iconshouye" style="opacity: 0"></span>
  </div>
</template>

<script>
export default {
  props: ['title','showHome']
};
</script>

<style lang="less" scoped>
.navigate-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 48 / 360 * 100vw;
  padding: 0 20 / 360 * 100vw;
  border-bottom: 1px #eee solid;
}
</style>