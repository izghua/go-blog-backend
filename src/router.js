import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "./components/Home";

Vue.use(VueRouter);

const routers = [
    {
        path: '/',
        component: Home,
        name: '首页',
        meta: {
            requireAuth: true,
        }
    }
];


export default routers;
