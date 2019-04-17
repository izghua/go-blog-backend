import CreateAxios from './axios'
const axios = CreateAxios();


let config = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
};

export function getCateList(params){
    return axios.get(
        '/console/cate',
        {
            params
        }
    )
}

export function CateEdit(id,params){
    return axios.get(
        '/console/cate/edit/' + id,
        {
            params
        }
    )
}

export function CateUpdate(id,name,displayName,seoDesc,parentId) {
    return axios.put(
        'console/cate/'+ id,
        {
            name: name,
            displayName: displayName,
            seoDesc: seoDesc,
            parentId: parentId
        },
        config
    )
}
