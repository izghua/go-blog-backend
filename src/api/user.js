import CreateAxios from './axios'
// import {ErrCodeMessage} from '../libs/tool'
const axios = CreateAxios()

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
}, function (error) {
  // 对响应错误做点什么
  // ErrCodeMessage(err)
  return Promise.reject(error);
});

// 如果是form-data格式
let config = {
  headers: {
     'Content-Type': 'multipart/form-data'
  }
};

// 获取列表数据
export function GetUserList(params){
  // return axios.get('/user/list',{params})
}


// 新建用户--form-data
export function BuildUser(params){
  // return axios.post('/user/build',params,config)
}
