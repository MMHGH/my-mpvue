<template>
  <div style="margin:20rpx;">
    支持富文本v-html渲染：
    <p class="card" v-html="text"></p>
  </div>
</template>

<script>
export default {
  props: ['text'],
  mounted() {
  },
}
</script>

<style>
.card {
  padding: 10px;
}
</style>
