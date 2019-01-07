import Vue from 'vue'

// 事件总线
export const BUS = new Vue()

// 判断传入的表单值是否为空 -- input/select等表单元素是否为空
export function SearchExit(data) {
    if (Array.isArray(data)) {
        if (data.length === 0) {
            return false
        }else{
            if(data[0] === null || data[0] === undefined || data[0] === ""){
               return false
            }
        }
    } else {
        if (data === null || data === undefined || data === "") {
            return false
        }
    }
    return true
}

// 将file图片文件读为img
export const ImgReader = (file, callback) => {
    var reader = new FileReader();
    reader.onload = () => {
        callback(reader.result)
    }
    reader.readAsDataURL(file);
}

// 时间格式转换
export function Format(date, fmt = 'yyyy-MM-dd') {
    if (date instanceof Date) {
        // console.warn('Format方法需要传入时间对象')
    } else {
        return false
    }
    var o = {
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

// 返回formData格式
export function GetFd(params){
    const fd = new FormData()
    Object.keys(params).forEach(item => {
        if(typeof params[item] === 'object'){
            if(params[item] instanceof File){
                fd.append(item,params[item])
            }else{
                fd.append(item,JSON.stringify(params[item]))
            }
        }else{
            fd.append(item,params[item])
        }
    })
    return fd
}
// 错误码提示
export function ErrCodeMessage(error){
    if (error.response) {
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        switch(error.response.status){
            case 500:
            // Message.error('服务器异常！')
            // break;
            // case 404:
            // Message.error('网络异常！')
            // break;
            // default:
            // Message.error('服务器异常！')
        }
      } else {
        // Something happened in setting up the request that triggered an Error
        // Message.error('网络异常！')
      }
}
