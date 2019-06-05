//1.定义（路由）组件。
//电影列表
import Movie_list from './components/movie/movie_list.vue';
//电影详情 购票
import Movie_detail from './components/movie/movie_detail.vue';
//选择影院
import Select_cinema from './components/movie/select_cinema.vue';
//选择城市
import Select_city from './components/movie/select_city.vue';
//商品
import Goods from './components/goods/goods.vue';
//我的
import Mine from './components/mine/mine.vue';
//订单
import Bill from './components/mine/bill.vue';

//2.定义路由
export default [
    {
        path: '/movie',
        component: Movie_list,
        children: [
            { path: '/movie_detail/:id', component: Movie_detail },
            {
                path: '/select_cinema',
                component: Select_cinema,
                children: [
                    { path: '/select_city', component: Select_city }
                ]
            }
        ]
    },
    {
        path: '/goods',
        component: Goods
    },
    {
        path: '/mine',
        component: Mine,
        children: [
            { path: '/bill', component: Bill }
        ]
    },
    {
        path: '/',
        redirect: '/movie'
    }
]