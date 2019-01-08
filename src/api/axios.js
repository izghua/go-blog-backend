import axios from 'axios';

function CreateAxios(url='/console',time=10000) {
    const instance = axios.create()
    const baseURL = 'http://localhost:8081'+url;   // dev环境下的proxy代理字段
    instance.defaults.baseURL = process.env.NODE_ENV === "development" ? baseURL : '';
    instance.defaults.timeout = time   // 超时时间
    return instance
}

export default CreateAxios