import CreateAxios from './axios'
const axios = CreateAxios();


let config = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
};

export function GetTagList(params){
    return axios.get(
        '/console/tag/',
        {
            params
        }
    )
}

export function TagEdit(id,params){
    return axios.get(
        '/console/tag/edit/' + id,
        {
            params
        }
    )
}

export function TagUpdate(id,name,displayName,seoDesc) {
    return axios.put(
        '/console/tag/'+ id,
        {
            name: name,
            displayName: displayName,
            seoDesc: seoDesc,
        },
        config
    )
}

export function TagCreate(name,displayName,seoDesc) {
    return axios.post(
        '/console/tag/',
        {
            name: name,
            displayName: displayName,
            seoDesc: seoDesc,
        },
        config
    )
}

export function TagDestory(id,params) {
    return axios.delete(
        '/console/tag/' + id,
        {
            params
        }
    )
}
