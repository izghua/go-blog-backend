import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "./components/Home";
import PostList from "./components/post/list"

Vue.use(VueRouter);

const routers = [
    {
        path: '/',
        component: Home,
        name: '首页',
        meta: {
            requireAuth: true,
        }
    },
    {
        path: '/post/list',
        component: PostList,
        name: '帖子首页',
    }
];


export default routers;
