import CreateAxios from './axios'
import ApiConf from './conf'
// import {ErrCodeMessage} from '../libs/tool'
const axios = CreateAxios();


export function getPostList(page){
    return axios.get(
        '/post',
        {
            page:1,
            limit:2,
            headers: {"Access-Control-Allow-Origin": "*"}
        }
    )
}


// export const getPostList = (page) => {
//     return axios.get({  // 这里返回的是一个Promise，request方法传入一个配置对象，配置项可参考axios
//         url: ApiConf.postList,
//         method: 'get',
//     })
// }
