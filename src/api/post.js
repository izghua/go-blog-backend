import CreateAxios from './axios'
import ApiConf from './conf'
// import {ErrCodeMessage} from '../libs/tool'
const axios = CreateAxios();


// const imgUploadUrl =

// export function imgUploadUrl() {
//     return axios.baseURL + "/console/post";
// }

let config = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
}

export function getPostList(params){
    return axios.get(
         '/console/post',
        {
            params
        }
    )
}

export function PostCreate(params) {
    return axios.get(
        '/console/post/create',
        {
            params
        }
    )
}

export function PostEdit(id,params) {
    return axios.get(
        '/console/post/edit/' + id,
        {
            params
        }
    )
}


export function PostUpdate(id,title,category,tags,summary,content) {
    return axios.put(
        '/console/post/'+ id,
        {
            title: title,
            category: category,
            tags: tags,
            summary: summary,
            content: content
        },
        config
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
        },
        config
    )
}

export function PostDestory(id,params) {
    return axios.delete(
        '/console/post/' + id,
        {
            params
        }
    )
}

export function PostTrash(params) {
    return axios.get(
        '/console/post/trash',
        {
            params
        }
    )
}


export function PostUnTrash(id,params) {
    return axios.put(
        '/console/post/' + id + '/trash',
        {
            params
        }
    )
}

// export const getPostList = (page) => {
//     return axios.get({  // 这里返回的是一个Promise，request方法传入一个配置对象，配置项可参考axios
//         url: ApiConf.postList,
//         method: 'get',
//     })
// }
