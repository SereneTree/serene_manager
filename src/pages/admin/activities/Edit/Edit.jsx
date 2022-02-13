import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Input, Card, Form, Row, Checkbox, Col, Upload, Button, message, DatePicker, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { createApi, getOneById, modifyOne } from '../../../../services/activities'
import './Edit.less'

export default function Edit() {

  //获取url参数
  let params = new URLSearchParams(window.location.search);
  const editKey = params.get("id");

  //如果url有key指，则需回显活动数据
  const [form] = Form.useForm();
  useEffect(() => {
    if (editKey) {
      getOneById(editKey).then(res => {
        console.log(res);
        form.setFieldsValue({ activityName: res.activityName, type: res.type, activityDate: moment(res.activityDate) });
      })
    }
  }, []);

  //活动名称改变时打印
  function nameOnChange(event) {
    console.log('活动名称', event.target.value);
  }

  //所属品类改变时打印
  function typeOnChange(checkedValues) {
    console.log('所属品类', checkedValues);
  }

  //活动上线时间日期改变时打印
  function dateOnChange(date, dateString) {
    console.log('活动上线日期date', date);
    console.log('活动上线日期dateString', dateString);
  }

  //上传图片反馈和打印
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file.response.url);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 图片上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 图片上传失败`);
      }
    },
  };
  const normFile = (event) => {
    console.log('Upload event:', event.file.response);
    if (Array.isArray(event)) {
      return event;
    }
    return event && event.fileList;
  };

  const navigate = useNavigate();

   //活动提交成功
  const onFinish = (values) => {
    console.log('提交成功', values);
    if (values) {
      console.log('提交成功', values);
      if (editKey) {
        // 修改活动调用modifyOne函数
        modifyOne(editKey, { ...values }).then(res => {
          console.log('修改活动', res)
          navigate("/admin/activities")
        })
          .catch(err => {
            console.log(err)
          })
      } else {
        // 新建活动调用createApi函数
        createApi({ ...values, onlineState: false }).then(res => {
          console.log('新建活动', res)
          navigate('/admin/activities')
        }).catch(err => {
          console.log(err)
        })
      }
    }
  };

  //活动提交成功失败
  const onFinishFailed = (errorInfo) => {
    console.log('提交失败', errorInfo);
    message.error('请输入正确的内容')

  };

  return (
    <div className='container_style'>
      <Card className='card_style' title={editKey ? "编辑活动" : '创建活动'}  >
        <div className='form_container_style'>
          <Form className='form_style'
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
            autoComplete="off"
          >
            <Form.Item
              name='activityName'
              label="活动名称"
              rules={[{ required: true, message: '请输入活动名称!' }]}
            >
              <Input placeholder="请输入活动名称" onChange={nameOnChange} />
            </Form.Item>

            <Form.Item
              name='activityDate'
              label="上线日期"
              rules={[{ required: true, message: '请选择活动上线日期' }]}
            >
              <DatePicker placeholder="请选择活动上线日期" onChange={dateOnChange} />
            </Form.Item>

            <Form.Item name='type' label="所属品类" rules={[{ required: true, message: '请选择活动所属品类' }]}>
              <Checkbox.Group onChange={typeOnChange}>
                <Row className='row_style'>
                  <Col span={5}><Checkbox value="动漫">动漫</Checkbox></Col>
                  <Col span={5}><Checkbox value="游戏">游戏</Checkbox></Col>
                  <Col span={5}><Checkbox value="生活">生活</Checkbox></Col>
                  <Col span={5}><Checkbox value="三农">三农</Checkbox></Col>
                  <Col span={5}><Checkbox value="音乐">音乐</Checkbox></Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item
              label="封面图片"
              name="coverPic"
              action="http://localhost:5000/activities"
              valuePropName="fileList"
              // 如果没有下面这一句会报错
              getValueFromEvent={normFile}
            >
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>上传图片</Button>
              </Upload>
            </Form.Item>

            <Form.Item >
              <Space>
                <Button type="primary" htmlType="submit" >保存</Button>
                <Button htmlType="reset" >重置</Button>
                <Button onClick={ () => navigate("/admin/activities")}>取消</Button>
              </Space>
            </Form.Item>

          </Form>
        </div>
      </Card>
    </div>
  );
}
