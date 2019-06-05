import { MOVIE_LIST, CITY_LIST, CHANGE_CINEMANAME, GOODS_LIST, INCREMENT, DECREMENT, CLEARCART, SHOWCART } from './mutation-type';

import axios from 'axios';
//actions用于发送commit指令 修改状态
export default {
        movie_list({ commit }) {
                //影院上映影片 接口地址:
                let movie_list = () => {
                        return axios.get('https://www.bestqingshan.top/movie/cinemasmovies.php')
                };
                //选择影院 接口地址:
                let movie_cinema = () => {
                        return axios.get('https://www.bestqingshan.top/movie/cinemas.php?page=0&pagesize=10');
                };
                //请求
                axios.all([movie_list(), movie_cinema()]).then((data) => {
                        commit(MOVIE_LIST, data);
                })
        },
        city_list({ commit }) {
                let city_list_url = 'https://www.bestqingshan.top/movie/citys.php';
                axios.get(city_list_url).then((data) => {
                        let res = data.data.citys;
                        commit(CITY_LIST, res);
                })
        },
        change_cinemaName({ commit }, data) {
                commit(CHANGE_CINEMANAME, data);
        },
        goods_list({ commit }) {
                //获取食物列表接口
                let goods_list_url = 'https://www.bestqingshan.top/movie/product.php';
                axios.get(goods_list_url).then((data) => {
                        let res = data.data.result;
                        commit(GOODS_LIST, res);
                })
        },
        increment({ commit }, id) {
                
                commit(INCREMENT, id);
        },
        decrement({ commit }, id) {
                commit(DECREMENT, id);
        },
        clearCart({ commit }) {
                commit(CLEARCART);
        },
        show_cart({ commit }){
                commit(SHOWCART);
        }
}