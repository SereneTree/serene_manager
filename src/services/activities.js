import { get, post, put, del } from "../utils/request";

//获取活动
export function listApi(page = 1) {
    return get("http://localhost:5000/activities", { page, per: 10 });
}

//创建活动
export function createApi(data) {
    console.log(data);
    return post("http://localhost:5000/activities", data);
}

//根据id获取活动数据
export function getOneById(id) {
    return get(`http://localhost:5000/activities/${id}`);
}

//修改活动
export function modifyOne(id, data) {
    return put(`http://localhost:5000/activities/${id}`, data);
}

//删除活动
export function delOne(id) {
    return del(`http://localhost:5000/activities/${id}`);
}
