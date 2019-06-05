<template>
    <div id='mine'>
        <div class="mine_header">
            <i class='iconfont'>&#xe606;</i>
            <span @click='login'>去登陆&gt;</span>
        </div>
        <div class="mine_content">
            <div  @click='showbill("暂无订单噢-")'>
                <mt-cell title="影票订单" class='bill'>
                    <span><i class='iconfont'>&#xe62a;</i></span>
                    <i class='iconfont tit' slot="icon">&#xe603;</i>
                </mt-cell>
            </div>
            <div @click='showbill("暂无商品噢-")'>
               <mt-cell title="卖品订单" class='bill'>
                    <span><i class='iconfont'>&#xe62a;</i></span>
                    <i class='iconfont tit' slot="icon">&#xe618;</i>
                </mt-cell> 
            </div>
            <div @click='showbill("暂无影单噢-")'>
               <mt-cell title="我的影单" class='bill'>
                    <span><i class='iconfont'>&#xe62a;</i></span>
                    <i class='iconfont tit' slot="icon">&#xe68b;</i>
                </mt-cell> 
            </div>
            <div @click='showbill("暂无充值噢-")'>
                <mt-cell title="我的钱包" class='bill'>
                    <span><i class='iconfont'>&#xe62a;</i></span>
                    <i class='iconfont tit' slot="icon">&#xe63f;</i>
                </mt-cell>
            </div>          
        </div>
        <transition name='fade'>
            <div class="login" v-show='show_login'>
                <mt-header title="请登陆">
                    <router-link to='/mine' slot="left">
                        <mt-button icon="back" @click='back'>返回</mt-button>
                    </router-link>
                </mt-header>
                <mt-field label="手机号" @input='test_location($event)' placeholder="请输入手机号" type="tel" v-model="phone">
                    <span class='location_home'>{{location_home}}</span>
                </mt-field>
                <mt-field label="验证码" @input="jianting($event)" v-model="captcha" placeholder="请输入验证码">
                    <mt-button type="default" :disabled='test_cap' @click='test_captcha'>{{test_cap_con}}</mt-button>
                </mt-field>
                <mt-button class='verify' type="primary" @click='haha' :disabled='dis'>验证</mt-button>
            </div>
        </transition>
        
        <div>
            <!-- 订单组件跳转 -->
            <router-view></router-view>
        </div>      
    </div>
</template>

<script>
    export default {
        data (){
            return {
                show_login:false,
                phone:'',
                captcha:'',
                dis:true,
                test_cap:false,
                test_cap_con:'获取验证码',
                location_home:'',
                timer:null
            }
        },
        methods:{
            //跳转订单组件
            showbill (con){
                this.$router.push({path:"/bill",query:{con:con}});
            },
            //显示登陆块
            login (){
                this.show_login = true;               
            },
            //隐藏登陆块
            back (){
                this.show_login = false;
            },
            jianting (v){
                if( v.length >= 6 ){
                    this.dis = false;
                }
            },
            haha (){
                this.$Toast('测试短信验证码哦,不能真的登陆');
                this.dis = true;
                this.phone = '';
                this.captcha = '';
                clearInterval(this.timer);
                this.test_cap_con = '获取验证码';

            },
            test_location (v){
                if( v.length == 11 ){
                   let _this = this;
                    let location_url = 'http://apis.juhe.cn/mobile/get?phone='+this.phone+'&key=f426ea535a15ca34ad69de80c2afdf05';//验证手机号归属地接口
                    $.ajax({
                        type:'get',
                        url:location_url,
                        dataType: 'jsonp',
                        success:function (res){
                            _this.location_home = res.result.city+res.result.company;
                        }
                    }); 
                }else{
                   this.location_home = '';
                }
                
            },
            //发送验证码
            test_captcha (){
                let _this = this;
                let result = this.isPoneAvailable(this.phone);
                if( result ){
                    
                    let code_url = 'http://v.juhe.cn/sms/send?mobile='+this.phone+'&tpl_id=159959&tpl_value=%23code%23%3d431515&dtype=json&key=9224c0f358a9a6efbca99b415e8f80dc%20';//发送验证码接口
                    
                    $.ajax({
                        type:'get',
                        url:code_url,
                        dataType:'jsonp',
                        success:function (res){
                            console.log(res);
                        }
                    })
                    this.test_cap = true;                   
                    let num = 60;
                    this.test_cap_con = num+'秒后重新获取';
                    this.timer = setInterval(function (){
                        num--;
                        _this.test_cap_con = num+'秒后重新获取';
                        if( num <= 0 ){
                            clearInterval(_this.timer);
                            _this.test_cap = false;
                            _this.test_cap_con = '获取验证码';
                        }
                    },1000);
                    
                }else{
                    this.$Toast('请输入正确11位手机号');
                }
                
            },
            //验证手机号正则
            isPoneAvailable (phone) {
                var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
                if (!myreg.test(phone)) {
                    return false;
                } else {
                    return true;
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    #mine{
        background:#f3f4f6;
    }
    .mine_header{
        height:30vh;
        background:#dbb177 url(../../../public/image/S90605-08101009.jpg) bottom center no-repeat;
        background-size:100% auto;
        color:#fff;
    }
    .mine_header i{
        float: left;
        font-size: 60px;
        margin: 9vh 2vw 0 4vw;
    }
    .mine_header span{
        float: left;
        font-weight: 700;
        margin: 12vh 0 0 2vw;
    }
    .mine_content{
        margin-top: 10px;
    }
    .mine_content .tit{
        font-weight:bold;
        color:#dbb177;
        margin-right:5px;
    }
    .bill{
        text-align:left;
    }
    .login{
        width:100vw;
        height:100vh;
        position:fixed;
        top:0;
        background:#fff;
        z-index: 99;
    }
    .verify{
        width: 90%;
        margin-top: 20px;
    }
    .location_home{
        font-size: 12px;
        color: #565656;
    }
    .fade-enter-active, .fade-leave-active{
        -webkit-transition: all 0.5s ease ;
        transition: all 0.5s ease ;
    }    
    .fade-enter, .fade-leave-active{
        opacity: 0;
        -webkit-transform:translate3d(100%,0,0);
        transform:translate3d(100%,0,0);
    }
   
</style>