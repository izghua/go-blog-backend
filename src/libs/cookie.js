

export function setCookie(name, value, Days) {
    if (Days == null || Days === '') {
        Days = 1;
    }
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 1 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + "; path=/;expires=" + exp.toGMTString();
    //document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

export function getCookie(name) {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    arr = document.cookie.match(reg);
    if (arr)
        return unescape(arr[2]);
    else
        return null;
}


export function getAllCookie(){
    return document.cookie;
}


export function clearCookie(name){
    setCookie(name, '', -1);
}


export function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + "; path=/;expires=" + exp.toGMTString();
}

