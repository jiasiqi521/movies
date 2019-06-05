<template>
    <div id='shop_cart'>
        <div class="shopCart">
            <div class="cart" @click='show_shopCart'>
                <i class='iconfont'>&#xe607;</i>
                <b v-show="goods_count>0">{{goods_count}}</b>
            </div>
            <div class="price">¥{{total_price}}</div>
        </div>
        <div class="calculate">
            <button class='calculate_btn'>结算</button>
        </div>
        <div class="shopCart_list" v-show='show_cart'>
            <div class="mask" @click='hideCart' :style='{height:maskHB.h,bottom:maskHB.b}'></div>
            <div class="shopCart_list_tit">
                <div class="maipin">已选卖品</div>
                <div class='clearShopCart' @click='clear_cart'>清空购物车</div>
            </div>
            <div style='max-height:120px;overflow:auto;'>
                <div class="ShopCart_list_con" v-for="(item,index) in shop_cart_list">
                    <div class="goods_name">
                        {{item.title}}
                    </div>
                    <div class='goods_price'>¥{{item.count*item.price}}</div>
                    <div class="add_cart">
                    <InAndDe :shop_cart_list='shop_cart_list' :item='item' />
                    </div>             
                </div> 
            </div>          
        </div>
    </div>
</template>

<script>
    import InAndDe from './InAndDe.vue';
    export default {
        props:{
            shop_cart_list:{
                type:Array
            },
            show_cart:{
                type:Boolean
            },
            winH:{
                type:Number
            }
        },
        data (){
            return {
                
            }
        },
        methods:{            
            //清空购物车
            clear_cart (){
                this.$store.dispatch('clearCart');
            },
            show_shopCart (){
                this.$store.dispatch('show_cart');
            },
            hideCart (){
                this.$store.dispatch('show_cart');
            }
        },
        components:{
            InAndDe
        },
        computed:{
            //计算购物车商品总价
            total_price (){
                let sum = 0;
                this.shop_cart_list.forEach(function (item,index){
                    sum += (item.count * item.price)
                })
                return sum;
            },
            //计算购物车内容的总长度
            goods_count (){
                return this.shop_cart_list.length;
            },
            //计算遮罩mask的高度和bottom值
            maskHB (){
                let num = this.shop_cart_list.length > 3 ? 3 : this.shop_cart_list.length;
                let height = this.winH - 134 - num * 40 - 40 + 'px';
                let bottom = num * 40 + 40 + 'px';
                return {
                    h:height,
                    b:bottom
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    #shop_cart{
        height:45px;
        border-top:1px solid #ccc;
        border-bottom:1px solid #ccc;
        position:relative;
        display:flex;
    }
    #shop_cart .shopCart{
        flex-grow:2;
    }
    #shop_cart .shopCart .cart{
        width:45px;
        height:45px;
        background:#747a88;
        border-radius:50%;
        color:#fff;
        text-align:center;
        line-height:45px;
        position:relative;
        float:left;
        margin: -10px 10px 0 10px;
        z-index:2;
    }
    #shop_cart .shopCart .cart i{
        font-size:20px;
    }
    #shop_cart .shopCart .cart b{
        width:15px;
        height:15px;
        background:#ddab78;
        border-radius:50%;
        text-align:center;
        line-height:15px;
        position:absolute;
        right: -2px;
        top: -3px;
        font-size:12px;
    }
    #shop_cart .shopCart .price{
        color:#ddab78;
        font-size:25px;
        font-weight:bold;
        float: left;
        line-height: 45px;
    }
    #shop_cart .calculate{
        flex-grow:1;
    }
    #shop_cart .calculate .calculate_btn{
        width:100%;
        height:100%;
        background:#ddab78;
        color:#fff;
        text-align:center;
        font-size:18px;
        border:0;
    }
    #shop_cart .shopCart_list{
        position:absolute;
        bottom:47px;
        width:100%;
        background:#fff;
    }
    #shop_cart .shopCart_list .mask{
        position:absolute;
        width:100%;
        background:rgba(0,0,0,0.3);
    }
    #shop_cart .shopCart_list .shopCart_list_tit{
        height:40px;
        background:#e8eaf0;
        overflow:hidden;
        line-height:40px;
        color:#9a9999;
    }
    #shop_cart .shopCart_list .shopCart_list_tit .maipin{
        float:left;
        font-size:15px;
        margin-left:5px;
    }
    #shop_cart .shopCart_list .shopCart_list_tit .clearShopCart{
        float:right;
        font-size:12px;
        margin-right:5px;
    }
    #shop_cart .shopCart_list .ShopCart_list_con{
        display:flex;
        height:40px;
        line-height:40px;
    }
    #shop_cart .shopCart_list .ShopCart_list_con .goods_name{
        width:50vw;
        text-align:left;
        padding-left:5px;
    }
    #shop_cart .shopCart_list .ShopCart_list_con .goods_price{
        width:25vw;
    }
</style>