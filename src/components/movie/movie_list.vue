<template>
  <div id="movie_list">
    <mt-header
      v-if="movies[0]"
      :title="cinemaName?cinemaName:movies[0].data.result.cinema_info.name"
    >
      <router-link to="/select_cinema" slot="right">
        <i class="iconfont">&#xe62a;</i>
      </router-link>
      <i class="iconfont" slot="left">&#xe64b;</i>
    </mt-header>
    <!-- 轮播图: -->
    <div class="carousel">
      <mt-swipe :auto="4000" class="mint-swipe">
        <mt-swipe-item>
          <img src="../../../public/image/W020190515497830468950.jpg" alt>
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../../../public/image/W020190515497586396316.jpg" alt>
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../../../public/image/W020190515497091069597.jpg" alt>
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../../../public/image/W020190515496383855778.jpg" alt>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 电影列表 -->
    <div :style="{overflow:'auto',height:(winH-187)+'px'}">
      <div v-if="movies[0]" class="movies_list">         
          <div v-for="(item,index) in movies[0].data.result.lists">
            <div class='movies_list_img'>
              <img :src="item.pic_url" alt>
            </div>
            <div class='movies_list_name'>
              <h6>片名:{{item.movieName}}</h6>
              <span>简介: {{item.broadcast[0].type}} {{item.broadcast[0].language}} -- ¥{{item.broadcast[0].price}}</span>
            </div>
            <div class='movies_list_time'>
              <p>{{item.broadcast[0].time}}</p>
              <mt-button size="small">购票</mt-button>
            </div>
          </div>
      </div>
    </div>

    <div>
      <router-view :cinema_list="movies[1]"></router-view>
    </div>
  </div>
</template>

<script charset="utf-8">
export default {
  props: {
    movies: {
      type: Array,
      default: []
    },
    cinemaName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      winH:0
    };
  },
  mounted (){
    this.winH = document.documentElement.clientHeight;
  },
  methods: {
    //获取url路径上的cityName参数值
    GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)+");
      var r = window.location.href.split("?")[1]
        ? window.location.href.split("?")[1].match(reg)
        : null;
      //decodeURIComponent函数编码的 URI 进行解码
      if (r != null) return decodeURIComponent(r[2]);
      return null;
    },
    setH() {
      //数据获取过后设置电影列表的高度,
      this.$refs.movie_list_dom.style.height =
        document.documentElement.clientHeight - 187 + "px";
    }
  },
  watch: {
    $route: function(old, NewVal) {
      //路由改变时改变电影院内容
      let cityName = this.GetQueryString("cinemaName");
      if (cityName) {
        this.$store.dispatch("change_cinemaName", cityName);
      }
    }
  }
};
</script>

<style lang="less" scoped>
#movie_list {
  display: flex;
  flex-direction: column;
}
.carousel {
  width: 100%;
  height: 100px;
}
.carousel img {
  width: 100%;
}
// .movies_list{
//   height:100%;
// }
.movies_list > div {
  display: flex;
  border-bottom: 1px solid #ccc;
  padding: 0 5px;
}
.movies_list > div > div {
  flex-grow: 1;
  text-align: left;
}
.movies_list .movies_list_img{
  text-align:center;
}
.movies_list > div img {
  width: 60px;
  margin: 10px;
}
.movies_list .movies_list_name{
  width:25vw;
}
.movies_list .movies_list_name h6{
  margin: 15px 0px;
  font-size:14px;
}
.movies_list .movies_list_name span{
  font-size:13px;
}
.movies_list > div p {
  margin-top: 15px;
  margin-bottom: 8px;
  text-indent: 5px;
}
.mint-button{
  border-radius:10px;
}
</style>