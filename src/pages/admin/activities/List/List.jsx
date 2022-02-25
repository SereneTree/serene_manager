import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, Card, Table, Space, Tag, message, Popconfirm } from 'antd';
import './List.less'
import { delOne, listApi, modifyOne } from '../../../../services/activities';

export default function List() {

  const [taskList, setTaskList] = useState([])
  const navigate = useNavigate();

  //表格基本设置
  const columns = [
    {
      title: '活动ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '活动名称',
      dataIndex: 'activityName',
      key: 'activityName',
    },
    {
      title: '上线日期',
      dataIndex: 'activityDate',
      key: 'activityDate',
    },
    {
      title: '封面图',
      dataIndex: 'coverPic',
      key: 'coverPic',
    },
    {
      title: '所属品类',
      key: 'type',
      dataIndex: 'type',
      render: type => (
        <>
          {type.map(typeItem => {
            let color = 'green';
            if (typeItem === '音乐') { color = 'blue'; }
            if (typeItem === '三农') { color = 'volcano'; }
            if (typeItem === '动漫') { color = 'pink'; }
            if (typeItem === '游戏') { color = 'purple'; }
            return (
              <Tag color={color} key={typeItem}>
                {typeItem}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '操作',
      key: 'onlineState',
      dataIndex: 'onlineState',
      render: (onlineState, record) => {
        // console.log('online record', record);

        //活动上下线
        const pushOnline = () => {
          // console.log('pushOnline record', record);
          modifyOne(record.id, { ...record, onlineState: !record.onlineState }).then(res => {
            fetchTaskList()
            message.success(`活动${onlineState ? "下线" : "上线"}成功`)
          }).catch(err => {
            message.error(`操作失败`);
          })
        }

        //修改活动跳转
        const editActivity = () => {
          navigate(`edit?id=${record.id}`)
        }

        //删除活动
        const deleteActivity = () => {
          console.log('deleteActivity record', record);
          delOne(record.id).then(res => {
            fetchTaskList()
            message.success('已删除该活动')
          }).catch(err => {
            message.error('操作失败')
          })
        }
        return (
          <Space size="middle">
            <Button type='link' onClick={pushOnline}>{onlineState ? "下线" : "上线"}</Button>
            <Button type='link' onClick={editActivity}>编辑</Button>
            <Popconfirm
              title="确认删除该活动吗"
              onConfirm={() => {
                deleteActivity()
              }}
              onCancel={() => message.error('已取消')}
              okText="确认"
              cancelText="取消"
            >
              <Button type='link'>删除</Button>
            </Popconfirm>
          </Space>
        )
      },
    },
  ];

  const fetchTaskList = () => {
    listApi().then(res => {
      setTaskList(res.map((dataObj, index) => {
        return {
          key: dataObj.id,
          id: dataObj.id,
          activityName: dataObj.activityName,
          activityDate: dataObj.activityDate.slice(0, 10),
          coverPic: <img src="https://p6-sign.bdxiguaimg.com/top-static-files-outer/79a4689b-5262-4f0f-a6cf-d1bc5b685813~noop.image?x-expires=1959847299&x-signature=iO1JnDKDd8TobvNWAmrYB11I4rY%3D" alt={dataObj.activityName} width='150px'></img>,
          type: dataObj.type,
          onlineState: dataObj.onlineState
        }
      }))
    }).catch(() => {
      message.error("获取数据失败");
    })
  }

  //页面初始化时拉取活动列表数据
  useEffect(() => {
    fetchTaskList()
  }, []);

  console.log('活动列表页渲染');

  return (
    <div className='container_style'>
      <Card className='card_style' title="活动列表" extra={<Button type="primary" onClick={() => navigate("/admin/activities/edit")}>创建活动</Button>}>
        <Table className='table_style' columns={columns} dataSource={taskList} />
      </Card>
    </div>
  );
}
