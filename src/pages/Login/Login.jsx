import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from 'antd';
import { Form, Input, Button, Checkbox, Card, message, Alert } from 'antd';
import logo from './treeLogo.png'
import { loginApi } from '../../services/auth'

export default function Login() {

  let navigate = useNavigate();

  const { Header } = Layout;

  //登陆提交成功
  const onFinish = (values) => {
    if (values) {
      loginApi({
        username: values.username,
        password: values.password,
      }).then(res => {
        message.success('登录成功')
        navigate("/admin")
      }).catch(err => {
        console.log('请求失败');
        navigate("/admin")
      }).finally()
    }
  };

  //登陆提交成功
  const onFinishFailed = (errorInfo) => {
    console.log('提交失败:', errorInfo);
  };

  return (
    <Layout>

      {/* 顶部 */}
      <Header className="header" style={{ backgroundColor: 'white', borderBottom: '1px solid #9ec7a8' }}>
        <div className="logo"  >
          <img src={logo} alt="tree" />
          <span style={{ fontWeight: '700', marginLeft: '10px' }}>
            小树活动管理
          </span>
        </div>
      </Header>

      <Card
        title="用户登录"
        style={{ marginLeft: "25%", width: '50%', marginTop: '60px' }}
      >
        <Alert
          // message="登陆提示"
          description="随意输入用户名和账号即可登陆哦～"
          type="info"
          closable
        />
        <Form
          className='login_form_style'
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 15 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{ marginTop: '60px' }}
        >

          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入你的用户名!' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 4, span: 16 }}>
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 10 }}>
            <Button type="primary" htmlType="submit">
              登陆
            </Button>
          </Form.Item>

        </Form>
      </Card>
    </Layout >
  )
}