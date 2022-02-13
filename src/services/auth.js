import { post } from "../utils/request";

//用户登陆
export function loginApi(users) {
  return post("http://localhost:5000/users", users);
}