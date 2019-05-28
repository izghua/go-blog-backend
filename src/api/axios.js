import axios from 'axios';
import {Message} from 'iview'
import { getCookie,clearCookie} from '@/libs/cookie'
import router from '../router/index'


function CreateAxios(url='/console',time=10000) {
    const instance = axios.create();
    const baseURL = 'http://localhost:8080';   // dev环境下的proxy代理字段
    instance.defaults.baseURL = process.env.NODE_ENV === "development" ? baseURL : '';
    instance.defaults.timeout = time;   // 超时时间

    // request拦截器
    instance.interceptors.request.use(config => {
        // if (!config.params.limit) {
        //     console.log(config.params.limit,config.url);
        //     config.params['limit'] = 10;
        // }

        if (getCookie('token') ) {
            config.headers['x-auth-token'] = getCookie('token');
        }

        return config;
    }, error => {
        console.log(error,"woo"); // for debug
        Message.info(error);
        Promise.reject(error);
    });

// respone拦截器
    instance.interceptors.response.use(function (response) {
            // console.log('请求后',this.$route.params);

            // console.log(response.data);
            const code = response.data.code;
            if (code === 400001005) {
                clearCookie('token');
                // location.href = '/backend/login'
                router.push({path: "/backend/login"})
            }
            if (code !== 0 && code !== 200 && code !== 407000015) {
                Message.error(response.data.message);
            }
            return response;
        },
        // response => {
        //   const code = this.data.code;
        //   console.log('code=',code);
        // },
        /**
         * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
         * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
         */
            // checkStatus(response);
            // checkCode(response)
            // const code = response.data.code;
            // console.log("响应:",response.data)
            // 50014:Token 过期了 50012:其他客户端登录了 50008:非法的token
            // if (code === 50008 || code === 50014 || code === 50012) {
            //   Message({
            //     message: res.message,
            //     type: 'error',
            //     duration: 5 * 1000
            //   });
            //   // 登出
            //   store.dispatch('FedLogOut').then(() => {
            //     router.push({ path: '/login' })
            //   }),
            // } else {
            //   return response
            // }
        error => {
            console.log('err' + error);// for debug
            Message.error(error);
            return Promise.reject(error);
        }
    );



    return instance
}


export default CreateAxios
