<template>
  <div id="select_cinema">
      <!-- 头部返回 -->
    <mt-header title="北京">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <!-- 选择更多城市 -->
        <router-link to='/select_city' class='iconfont' slot="right">&#xe62a;</router-link>     
    </mt-header>
    <!-- 电影院列表 -->
    <div class="cinema_list">
      <div v-for="(item,index) in cinema_list.data.data" @click='select_cinema(item.cinemaName)'>
        <mt-cell-swipe :title="item.cinemaName" :id="item.id"></mt-cell-swipe>
        <p>{{item.address}}</p>
      </div>
    </div>
    <div>
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cinema_list: {
      type: Object,
      default:{}
    }
  },
  data() {
    return {};
  },
  mounted() {
    //获取到的电影院数据
    //console.log(this.cinema_list);
  },
  methods:{
    select_cinema (name){
      this.$router.push({path:"/",query:{cinemaName:name}});
    }
  }
};
</script>

<style lang="less" scoped>
#select_cinema {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  background: #ffffff;
  width: 100%;
  height: 100%;
}
.title {
  height: 40px;
  line-height: 40px;
  background: #ccc;
  text-align: left;
  padding: 0 5px;
}
.mint-cell {
  text-align: left;
}
.cinema_list p {
  text-align: left;
  margin: 0;
  padding: 3px 10px;
  font-size: 13px;
}
</style>