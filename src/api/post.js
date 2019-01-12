import CreateAxios from './axios'
import ApiConf from './conf'
// import {ErrCodeMessage} from '../libs/tool'
const axios = CreateAxios();


// const imgUploadUrl =

// export function imgUploadUrl() {
//     return axios.baseURL + "/console/post";
// }

export function getPostList(page){
    return axios.get(
        '/console/post',
        {
            page:1,
            limit:2,
            // headers: {"Access-Control-Allow-Origin": "*"}
        }
    )
}

export function PostCreate() {
    return axios.get(
        'console/post/create'
    )
}



export function PostStore(title,category,tags,summary,content) {
    return axios.post(
        '/console/post',
        {
            title: title,
            category: category,
            tags: tags,
            summary: summary,
            content: content
        }
    )
}

// export const getPostList = (page) => {
//     return axios.get({  // 这里返回的是一个Promise，request方法传入一个配置对象，配置项可参考axios
//         url: ApiConf.postList,
//         method: 'get',
//     })
// }
