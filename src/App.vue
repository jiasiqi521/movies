<template>
  <div id="app">
    <keep-alive>
      <router-view :movies='movies' :cinemaName='cinemaName'></router-view>
    </keep-alive>
    <!-- 底部导航 -->
    <TabBar />
  </div>
</template>

<script>
import { mapState } from "vuex";

import TabBar from './components/tabBar';

export default {
  name: 'app',
  data (){
    return {
      
    }
  },
  beforeMount() {
    this.$Indicator.open('加载中...');
    this.$store.dispatch("movie_list");   
  },
  computed: {
    //映射状态到本组件
    ...mapState(["movies","cinemaName"])
  },
  components:{
    TabBar
  }
}
</script>

<style lang='less'>
@color:#333;
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color:@color;
}
a{
  text-decoration: none;
}
.mint-indicator-wrapper{
  z-index:999999;
}
button{
  outline:none;
}
</style>
