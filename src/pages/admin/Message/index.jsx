import React from 'react';
import { connect } from 'react-redux'
import { Button, List } from 'antd';
import { Card } from 'antd';
import { isReadAction } from '../../../redux/actions/isreadAction'

//UI组件设置
function Message(props) {

  //初始化信息数据
  const data = [
    'Racing car sprays burning fuel into crowd.',
  ];

  //调用信息已读函数
  const isRead = () => props.isRead(true)

  return (
    <div>
      <Card className='card_style' title="通知中心" extra={<Button type="primary" onClick={isRead}> 全部已读 </Button>}>
        <List
          footer={<div>共 {data.length} 条信息</div>}
          bordered
          dataSource={data}
          renderItem={item => (
            <List.Item style={{ display: 'flex', justifyContent: 'space-between' }}>
              {item}
              {!props.result.read &&
                <Button size="small" onClick={isRead} >标记为已读</Button>
              }
            </List.Item>
          )}
        />
      </Card>

    </div>
  );
}

//容器组件设置

//mapStateToProps函数返回的是一个对象，用于传递状态
//返回的对象中的key就作为传递给UI组件props的key,value就作为传递给UI组件props的value

function mapStateToProps(state) {
  return { result: state }
}

//mapDispatchToProps函数返回的是一个对象，用于传递操作状态的方法
//返回的对象中的key就作为传递给UI组件props的key,value就作为传递给UI组件props的value

function mapDispatchToProps(dispatch) {
  return {
    isRead: () => dispatch(isReadAction())
  }
}

//使用connect()()创建并暴露一个Count的容器组件
export default connect(mapStateToProps, mapDispatchToProps)(Message)

