<template>
  <div>
    <NavigateBar title="我的关注" :showHome="false"/>

  </div>
</template>

<script>
// 引入头部导航栏插件
import NavigateBar from "@/components/NavigateBar.vue"
export default {
  components: {
    NavigateBar,
  }
}
</script>

<style>

</style>