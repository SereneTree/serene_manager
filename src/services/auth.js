import { post } from "../utils/request";

//用户登陆
export function loginApi(users) {
  // return post("http://localhost:5000/users", users);
  return post("https://www.fastmock.site/mock/617fcca36c8500fd124e113f6966bfd5/activity/users", users);
}