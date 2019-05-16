import CreateAxios from './axios'
const axios = CreateAxios();

let config = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
};

export function LinkIndex(params){
    return axios.get(
        '/console/link',
        {
            params
        }
    )
}

export function LinkStore(name,link,order) {
    return axios.post(
        '/console/link',
        {
            name: name,
            link: link,
            order: order,
        },
        config
    )
}

export function LinkEdit(id,params){
    return axios.get(
        '/console/link/edit/' + id,
        {
            params
        }
    )
}

export function LinkUpdate(id,name,link,order) {
    return axios.put(
        '/console/link/'+ id,
        {
            name: name,
            link: link,
            order: order,
        },
        config
    )
}

export function LinkDestroy(id,params) {
    return axios.delete(
        '/console/link/' + id,
        {
            params
        }
    )
}
