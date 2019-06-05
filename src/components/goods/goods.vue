<template>
  <div id="goods">
    <mt-header
      v-if="movies[0]"
      :title="cinemaName?cinemaName:movies[0].data.result.cinema_info.name"
    >
      <router-link to="/select_cinema" slot="right">
        <i class="iconfont">&#xe62a;</i>
      </router-link>
      <i class="iconfont" slot="left">&#xe64b;</i>
    </mt-header>
    <div class='goods_list' v-if='goods_list' :style="{overflow:'auto',height:(winH-134)+'px'}">
      <div class='goods_list_nav' >
        <h6 v-for="(item,index) in goods_list" :class='{"active":idx==index}' @click='changeIdx(index,item.id)'>{{item.title}}</h6>
      </div>
      <div class='goods_list_con'>
        <div>
          <h6>{{item_list.title}}</h6>
          <div class='list' v-for='(item,index) in item_list.data'>
            <dl>
              <dt>
                <img :src="item.img" alt="">
              </dt>
              <dd class='goods_list_des'>
                <strong>{{item.title}}</strong>
                <span>{{item.des}}</span>
                <i>¥{{item.price}}</i>
              </dd>
              <dd class='goods_list_add_shopcart'>
                <InAndDe :shop_cart_list='shop_cart_list' :item='item' />
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
    <!-- 购物车组件 -->
    <ShopCart :shop_cart_list='shop_cart_list' :show_cart='showShopCart' :winH='winH' />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ShopCart from './shop_cart.vue';
import InAndDe from './InAndDe.vue';
export default {
  props: {
    movies: {
      type: Array,
      default:[]
    },
    cinemaName:{
        type:String,
        default:''
    }
  },
  data() {
    return {
      winH:0,
      idx:0,
      item_list:[]
    };
  },
  beforeMount() {
    this.$Indicator.open('加载中...');
    //发送指令获取商品列表数据
    this.$store.dispatch("goods_list");   
  },
  mounted (){
    this.winH = document.documentElement.clientHeight; 
  },
  methods:{
    //切换选中商品的idx值
    changeIdx (ind,id){
      let _this = this;
      this.idx = ind;
      this.get_item_list(id);
    },
    get_item_list (id){
      //点击侧边商品列表更改商品数据
      let res = this.goods_list.filter((item,index)=>{
        return item.id == id;
      });
      this.item_list = res[0];
      
    }
  },
  computed:{
    //映射状态到本组件
    ...mapState(["goods_list","shop_cart_list","showShopCart"])
  },
  components:{
    ShopCart,
    InAndDe
  },
  watch:{
    goods_list (){//初始化时显示默认的商品为第一个
      //监听商品列表数据改变设置默认item_list
      this.item_list = this.goods_list[0];  
    }
  }
};
</script>

<style lang="less" scoped>
  .goods_list{
    display:flex;
    background:#fff url(../../../public/image/goods_bg.jpg) top left repeat-x;
    background-size:auto 30px;
  }
  .goods_list_nav{
    flex-grow:1;
    height:100%;
    overflow:auto;
    background:#fdfbee url(../../../public/image/goods_bg.jpg) top left repeat-x;
    background-size:auto 30px;
    width:90px;
  }
  .goods_list_nav h6{
    margin:0;
    line-height:36px;
    border-bottom: 1px solid #ccc;
  }
  .goods_list h6:nth-child(1){
    margin-top: 30px;
  }
  .goods_list_nav h6.active{
    background:#fff; 
  }
  .goods_list_con{
    flex-grow:4;
    height:100%;
    overflow:auto;
    width:calc( 100% - 90px );
  }
  .goods_list_con .list{
    border-top:1px solid #ccc;
  }
  .goods_list_con h6{
    margin-bottom: 0;
    height: 36px;
    background:url(../../../public/image/goods_bg2.jpg) top center no-repeat;
    background-size:auto 36px;
    line-height:36px;
  }
  .goods_list_con dl{
    display:flex;
    text-align:left;
  }
  .goods_list_con dl dt{
    width:70px;
  }
  .goods_list_con dl dt img{
    width:60px;
    margin:5px;
    margin-top:0;
  }
  .goods_list_con dl dd{
     margin-left:0
  }
  .goods_list_con .goods_list_des{
    width:calc( 100% - 106px );
  }
  .goods_list_con .goods_list_des *{
    display:block;
    margin-bottom:3px;
  }
  .goods_list_con .goods_list_des span{
    font-size:12px;
  }
  .goods_list_con .goods_list_des i{
    color:#e0b17d;
    font-weight:700;
  }
  .goods_list_con .goods_list_add_shopcart{
    padding-top:30px;
    padding-right: 10px;
  }
</style>