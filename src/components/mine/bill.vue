<template>
    <div id='bill'>
        <mt-header title="">
            <router-link to="/mine" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <p>{{con}}</p>
    </div>
</template>

<script>
    export default {
        data (){
            return {
                con:''
            }  
        },
        methods:{
            //获取url路径上的cityName参数值
            GetQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)+");
                var r = window.location.href.split("?")[1]
                    ? window.location.href.split("?")[1].match(reg)
                    : null;
                //decodeURIComponent函数编码的 URI 进行解码
                if (r != null) return decodeURIComponent(r[2]);
                return null;
            }
        },
        mounted (){
            this.con = this.GetQueryString('con');
        }
    }
</script>

<style lang="less" scoped>
    #bill{
        width:100vw;
        height:100vh;
        position:fixed;
        left:0;
        top:0;
        background: #fff url(../../../public/image/S90605-08253303.jpg) center 10vh no-repeat;
        background-size: 45% auto;
        z-index: 99;
    }
    #bill p{
        text-align:center;
        margin-top:30vh;
        font-size:13px;
    }
</style>