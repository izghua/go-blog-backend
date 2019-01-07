import axios from 'axios';

function CreateAxios(url='/app',time=10000) {
    const instance = axios.create()
    const baseURL = url;   // dev环境下的proxy代理字段
    instance.defaults.baseURL = process.env.NODE_ENV === "development" ? baseURL : '';
    instance.defaults.timeout = time   // 超时时间
    return instance
}

export default CreateAxios