<template>
  <div>
    <mt-tabbar v-model="currentId">
      <mt-tab-item id="movie">
        <i class="iconfont">&#xe68b;</i>
        电影
      </mt-tab-item>
      <mt-tab-item id="goods">
        <i class="iconfont">&#xe653;</i>
        卖品
      </mt-tab-item>
      <mt-tab-item id="mine">
        <i class="iconfont">&#xe67a;</i>
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentId: window.location.href.split('#')[1].substr(1)
    };
  },
  watch: {
    // 实现路由跳转
    currentId: function(val, oldVal) {
      this.$router.push("/" + val);     
    }
  }
};
</script>

<style lang="less" scoped>
.iconfont {
  display: block;
  margin-bottom: 5px;
}
.mint-tab-item {
  color: #333;
}
.mint-tabbar > .mint-tab-item.is-selected {
  color: #f5b907;
}
</style>