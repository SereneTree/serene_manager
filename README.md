# React+Antd 活动后台管理项目

## 简介
本项目为活动管理后台，包含登陆、活动列表、活动创建/编辑、消息中心等页面，使用技术包括react、redux、axios等。

## 核心功能
- 登陆与退出登陆：支持对接服务端，用post请求实现
- 活动创建/编辑：支持文本框输入、日期选择、多选、图片上传等，创建/编辑后请求调用服务端API接口
- 活动列表：用get请求服务端获取活动数据，支持调用服务端API接口修改活动状态、删除活动等
- 消息中心：支持消息展示，利用redux共享未读消息数据，在菜单栏中红点提示未读消息

## 如何启动
```
//项目启动
yarn start 

//启动json-sever搭建的服务端，需使用如下命令启动文档 db.json
json-server --port 5000 --watch db.json 
```
## 未来迭代功能点
- 活动列表增加筛选、分页功能等
- 消息通知支持对接服务端等
- ……

## 所需插件
```
redux         redux核心库
react-redux   react中集成redux的插件
redux-thunk   redux插件
axios         网络请求
antd          UI组件
```
