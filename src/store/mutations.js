import { MOVIE_LIST, CITY_LIST, CHANGE_CINEMANAME, GOODS_LIST, INCREMENT, DECREMENT, CLEARCART, SHOWCART } from './mutation-type'
import { Indicator } from 'mint-ui';
//mutations用于接收指令 操作state中的数据
export default {
    //获取影院上映的影片信息
    [MOVIE_LIST](state, data) {
        state.movies = data;
        Indicator.close();
    },
    //城市列表信息
    [CITY_LIST](state, data) {
        let result = handleCity(data);
        state.city_list = result;
        Indicator.close();
    },
    //更改当前所选择的影院信息
    [CHANGE_CINEMANAME](state, data) {
        state.cinemaName = data;
    },
    //卖品列表信息
    [GOODS_LIST](state,data){
        state.goods_list = data;       
        Indicator.close();
    },
    //添加卖品到购物车
    [INCREMENT] (state,id){
        goods_increment(state,id);
    },
    [DECREMENT] (state,id){
        goods_decrement(state,id);
    },
    [CLEARCART] (state){
        state.shop_cart_list.forEach(function (item,index){
            item.count = 0;
        });
        state.shop_cart_list = [];
        if( state.shop_cart_list.length == 0 ){
            state.showShopCart = false;
        }
    },
    [SHOWCART] (state){
        if( state.shop_cart_list.length > 0 ){
            state.showShopCart = !state.showShopCart;
        }       
    }
}
//处理获取来的城市数据
function handleCity(data) {
    let result = {};
    let city_pre = [];
    let city_pre_list = [];
    //将城市的首字母提出来,所有城市名称提出来。
    for (var i = 0; i < data.length; i++) {
        city_pre.push(data[i]['city_pre'].toUpperCase());
        //city_pre_list.push(data[i]['city_name']);
    }
    //数组去重并排序
    city_pre = uniq(city_pre).sort();
    city_pre_list = (function () {
        let json = {};
        city_pre.forEach(function (item, index) {

            json[item] = [];
            data.forEach(function (item_j) {
                if (item_j.city_pre.toUpperCase() == item) {
                    json[item].push(item_j['city_name']);
                }
            })
        })
        return json;
    })()
    result['first'] = city_pre;
    result['list'] = city_pre_list;
    return result;

}
//去重
function uniq(array) {
    var temp = []; //一个新的临时数组
    for (var i = 0; i < array.length; i++) {
        if (temp.indexOf(array[i]) == -1) {
            temp.push(array[i]);
        }
    }
    return temp;
}
//处理用户加入购物车后更改goods_list的数据的count属性值
function goods_increment(state,id){ 
    let flag = true;
    state.goods_list.forEach(function (item,index){
        item.data.forEach(function (item_n){
            if( item_n.id == id ){
                item_n.count += 1;
                state.shop_cart_list.forEach(function (item_cart,index){
                    if( item_cart.id == id ){
                        flag = false;
                    }
                })
                if( flag ){
                   state.shop_cart_list.push(item_n); 
                }       
            }
        })
    })
}
//处理用户点击减少卖品个数
function goods_decrement(state,id){
    state.shop_cart_list.forEach(function (item,index){
        if( item.id == id&&item.count>0 ){
            item.count -= 1;
        }
        if( item.count == 0 ){
            state.shop_cart_list.splice(index,1);
        }
    });
    if( state.shop_cart_list.length == 0 ){
        state.showShopCart = false;
    }
}