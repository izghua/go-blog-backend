import CreateAxios from './axios'
const axios = CreateAxios();


let config = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
};


export function Register(params){
    return axios.get(
        '/console/register',
        {
            params
        }
    )
}

export function AuthRegister(userName,email,password) {
    return axios.post(
        '/console/register/',
        {
            userName: userName,
            email: email,
            password: password,
        },
        config
    )
}

export function Login(params){
    return axios.get(
        '/console/login',
        {
            params
        }
    )
}

export function AuthLogin(captchaKey,email,password,captcha) {
    return axios.post(
        '/console/login',
        {
            captchaKey: captchaKey,
            email: email,
            password: password,
            captcha: captcha
        },
        config
    )
}

export function AuthLogout(params){
    return axios.delete(
        '/console/logout',
        {
            params
        }
    )
}

export function AuthClearCache(params){
    return axios.delete(
        '/console/cache',
        {
            params
        }
    )
}

