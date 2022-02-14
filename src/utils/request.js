import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 5000
});

//  全局请求拦截，发送请求之前执行.
instance.interceptors.request.use(function (config) {
    // console.log("请求拦截:请求发出成功");
    config.headers['authorization'] = 'Bearer '
    return config;
}, function (error) {
    // console.log("请求拦截:请求发出失败");
    return Promise.reject(error);
});

//  请求返回之后执行
instance.interceptors.response.use(function (response) {
    // console.log("请求拦截:请求收到成功");
    console.log(response.data);
    return response.data;
}, function (error) {
    // console.log("请求拦截:请求收到失败");
    return Promise.reject(error);
});


export function get(url, params) {
    return instance.get(url, {params});
}

export function post(url, data) {
    return instance.post(url, data);
}

export function put(url, data) {
    return instance.put(url, data);
}

export function del(url) {
    return instance.delete(url);
}