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

export function AuthRegister(captchaKey,email,password,captcha) {
    return axios.post(
        '/console/register/',
        {
            captchaKey: captchaKey,
            email: email,
            password: password,
            captcha: captcha
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
