import axios from 'axios';


// let config = {
//     headers: {
//         'Content-Type': 'multipart/form-data',
//         "Access-Control-Allow-Origin": "*"
//     }
// };

function CreateAxios(url='/console',time=10000) {
    const instance = axios.create();
    const baseURL = 'http://localhost:8080';   // dev环境下的proxy代理字段
    instance.defaults.baseURL = process.env.NODE_ENV === "development" ? baseURL : '';
    instance.defaults.timeout = time;   // 超时时间
    // instance.headers = {"Access-Control-Allow-Origin": "*"};
    // instance.headers["Access-Control-Allow-Origin"] = "all";
    // instance.setRequestHeader("Access-Control-Allow-Origin","*");
    // instance.setHeaderValue()
    // instance.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    return instance
}

export default CreateAxios
