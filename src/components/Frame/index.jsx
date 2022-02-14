import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout, Menu, Avatar, Image, Dropdown, message, Badge } from 'antd';
import { DownOutlined, MessageOutlined, UnorderedListOutlined } from '@ant-design/icons';
import logo from './treeLogo.png'
import './index.css';

const { Header, Content, Sider } = Layout;

function Frame(props) {

  //navigate函数需使用useNavigate钩子函数
  let navigate = useNavigate();

  //点击个人中心菜单可进入“通知中心”或退出登陆
  const onClick = ({ key }) => {
    switch (key) {
      case '3':
        return navigate("/login")
      case '1':
        return navigate("/admin/message")
      default:
        message.info('功能尚未开放');
        break;
    }
  };

  //个人中心菜单
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">通知中心</Menu.Item>
      <Menu.Item key="2">设置中心</Menu.Item>
      <Menu.Item key="3">退出</Menu.Item>
    </Menu>
  );

  console.log('frame渲染次数');

  return (
    <Layout>
      {/* 顶部 */}
      <Header className="header" style={{ backgroundColor: 'white', borderBottom: '1px solid #9ec7a8' }}>
        <div className="logo"  >

          {/* 左上角为logo和标题，点击可进入活动管理主页 */}
          <Link to="/admin" style={{ color: 'black' }}>
            <img src={logo} alt="tree" />
            <span style={{ fontWeight: '700', marginLeft: '10px' }}>
              小树活动管理</span>
          </Link>

          {/* 右上角为个人中心 */}
          <span className='user_container_style'>
            <Avatar src={<Image src="https://joeschmoe.io/api/v1/random" style={{ width: 32 }} />} />
            <Dropdown overlay={menu} >
              <span style={{ marginLeft: '10px' }} className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                个人中心 <DownOutlined />
              </span>
            </Dropdown>
          </span>
        </div>
      </Header>
      <Layout>

        {/* 左侧菜单 */}
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            style={{ height: '100%' }}
            onClick={e => navigate(`${e.key}`)}
          >
            <Menu.Item key="/admin/activities" icon={<UnorderedListOutlined />}>活动列表</Menu.Item>
            <Menu.Item key="/admin/message" icon={<MessageOutlined />}>通知中心
              {!props.result.read && <Badge dot='true'></Badge>}
            </Menu.Item>
          </Menu>
        </Sider>

        {/* 右侧主体内容 */}
        <Layout style={{ padding: '14px 14px 14px' }} >
          <Content
            className="site-layout-background"
            style={{ padding: 24, margin: 0, minHeight: 280}}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout >
  )
}

//mapStateToProps函数返回的是一个对象，用于传递状态
//返回的对象中的key就作为传递给UI组件props的key,value就作为传递给UI组件props的value
function mapStateToProps(state) {
  return { result: state }
}

//使用connect()()创建并暴露容器组件
export default connect(mapStateToProps)(Frame)

