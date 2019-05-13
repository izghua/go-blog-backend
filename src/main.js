// import Vue from 'vue';
// import VueRouter from 'vue-router';
// import App from './App.vue';
// import Routers from './router/index'
// import store from './store/index';
// import iView from 'iview';
// import 'iview/dist/styles/iview.css';
// import '../dist/iview.css';
//
//
// // Vue.use(VueRouter);
// Vue.use(iView);
//
// // The routing configuration
// const RouterConfig = {
//     routes: Routers
// };
// const router = new VueRouter(RouterConfig);
//
// new Vue({
//     router,
//     store,
//     render: h => h(App)
// }).$mount('#app');
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import 'iview-editor/dist/iview-editor.css';

import iEditor from 'iview-editor';


Vue.use(iView);
Vue.use(iEditor);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

