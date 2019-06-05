<template>
    <div>
        <i class='iconfont' @click='decrement_goods(item.id)'>&#xe642;</i>
        <span>{{item.count}}</span>
        <i class='iconfont' @click='increment_goods(item.id)'>&#xe690;</i> 
    </div>
</template>

<script>
    export default {
        props:{
            shop_cart_list:{
                type:Array
            },
            item:{
                type:Object
            }
        },
        data (){
            return {

            }
        },
        methods:{
            //添加购物车商品数量
            increment_goods (id){
                this.$store.dispatch('increment',id);
            },
            //减少卖品个数
            decrement_goods (id){
                this.$store.dispatch('decrement',id);
            }
        }
    }
</script>

<style lang="less" scoped>
    i.iconfont{
        color:#ddab78;
        font-size:20px;
    }
    span{
        margin:0 8px;
    }
</style>