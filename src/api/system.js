import CreateAxios from './axios'
const axios = CreateAxios();

let config = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
};

export function SystemIndex(params){
    return axios.get(
        '/console/system',
        {
            params
        }
    )
}

export function SystemUpdate(id,title,keywords,description,recordNum,theme) {
    return axios.put(
        '/console/system/'+ id,
        {
            title: title,
            keywords: keywords,
            description: description,
            recordNumber: recordNum,
            theme: theme,
        },
        config
    )
}


export function HomeIndex(params){
    return axios.get(
        '/console/home/',
        {
            params
        }
    )
}
