import React, { useState } from 'react';
import { Layout, Form, Input, Button, Select, Checkbox, message } from 'antd';
import { UserOutlined, IdcardOutlined } from '@ant-design/icons';
import axios from 'axios';
import './index.scss';

const { Option } = Select;

const Person = () => {
  const [form] = Form.useForm();
  const [isAgreed, setIsAgreed] = useState(false);

  const onFinish = async (values) => {
    if (!isAgreed) {
      message.error('请先同意相关条款');
      return;
    }

    try {
      const response = await axios.post('/api/real-name-authentication', values);
      const data = response.data;
      if (data.success) {
        message.success('实名认证成功！');
        form.resetFields();
      } else {
        message.error(data.message || '实名认证失败');
      }
    } catch (error) {
      message.error('网络错误，请稍后再试！');
      console.error('Error:', error);
    }
  };

  return (
    <Layout>
      <div className="real-name-authentication-content">
        <div className="real-name-authentication-form">
          <h1>实名认证</h1>
          <div className="warning-message">
            根据相关法律法规，我们不对未满14周岁的个人提供在线实名认证服务。
          </div>
          <Form
            form={form}
            name="real_name_authentication"
            onFinish={onFinish}
            initialValues={{ remember: true }}
            size="large"
            className="no-border-form" // 添加自定义类名
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: '请输入您的姓名!' }]}
              label="真实姓名"
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="姓名"
                allowClear
              />
            </Form.Item>
            <Form.Item
              name="idType"
              rules={[{ required: true, message: '请选择证件类型!' }]}
              label="证件类型"
            >
              <Select placeholder="证件类型">
                <Option value="idCard">中国大陆二代居民身份证</Option>
                <Option value="hkPassport">港澳居民来往内地通行证</Option>
                <Option value="twPassport">台湾居民来往内地通行证</Option>
                <Option value="hkId">港澳居民证居住</Option>
                <Option value="twId">台湾居民居住证</Option>
                <Option value="foreignPermanent">外国人永久居留证</Option>
                <Option value="other">其他类型用户</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="idNumber"
              rules={[{ required: true, message: '请输入您的证件号码!' }]}
              label="证件号码"
            >
              <Input
                prefix={<IdcardOutlined />}
                placeholder="证件号码"
                allowClear
              />
            </Form.Item>
            <Form.Item name="agreement" valuePropName="checked">
              <Checkbox onChange={(e) => setIsAgreed(e.target.checked)}>
                我已阅读并同意<a href="/terms">相关条款</a>
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                提交认证
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default Person;