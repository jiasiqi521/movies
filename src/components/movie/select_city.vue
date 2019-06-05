<template>
  <div id="select_city">
    <mt-header title="当前城市:北京">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <mt-index-list v-if='city_list'>
      <mt-index-section v-for="(item,index) in city_list['first']" :index="item" >
        <mt-cell v-for="(con,idx) in city_list['list'][item]" :title="con" onClick="alert('暂时不支持城市切换哦')"></mt-cell>
      </mt-index-section>
    </mt-index-list>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
        
    };
  },
  beforeMount (){
      this.$Indicator.open('加载中...');
      this.$store.dispatch("city_list"); 
  }, 
  computed: {
    //映射状态到本组件
    ...mapState(["city_list"])
  }
};
</script>

<style lang="less" scoped>
#select_city {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  background: #ffffff;
  width: 100%;
  height: 100%;
  text-align:left;
}

</style>