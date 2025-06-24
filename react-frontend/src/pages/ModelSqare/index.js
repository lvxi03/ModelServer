import React, { useState } from 'react';
import { Card, Row, Col, Typography, Space, Modal, List, Button, Tooltip, Divider, message } from 'antd';
import {
  RobotOutlined,
  ExperimentOutlined,
  CloudOutlined,
  DatabaseOutlined,
  CodeOutlined,
  EyeOutlined,
  LineChartOutlined,
  MessageOutlined,
  SettingOutlined,
  LinkOutlined, CopyOutlined, BookOutlined, PlayCircleOutlined, WalletOutlined, GiftOutlined
} from '@ant-design/icons';
import './index.scss';
import MetaTraceLogo from '@/assets/MetaTracelogo.png';

// 模拟模型数据
const modelData = [
  { id: 1, name: 'MetaTrace-1.0-26m', logo: <img src={MetaTraceLogo} style={{ width: '40px', height: '40px' }} />, description: '通用基础语言模型，支持文本生成与理解', features: ['文本生成与摘要', '语义理解与分类', '多轮对话能力', '支持10+种语言'], pricing: [{ tier: '免费版', price: '0元/月', limit: '100次调用/天' }, { tier: '专业版', price: '99元/月', limit: '10,000次调用/天' }, { tier: '企业版', price: '定制', limit: '无限次调用' }], apiDoc: 'https://docs.example.com/models/language', demoUrl: 'https://demo.example.com/language', inputPrice: '￥4/M Tokens', outputPrice: '￥16/M Tokens', publishDate: '2023-06-15' },
  { id: 2, name: 'MetaTrace-1.0-108m', logo: <img src={MetaTraceLogo} style={{ width: '40px', height: '40px' }} />, description: '专注于多轮对话的智能交互模型', features: ['上下文理解记忆', '情绪识别与回应', '个性化对话风格', '知识库对接能力'], pricing: [{ tier: '免费版', price: '0元/月', limit: '50次对话/天' }, { tier: '专业版', price: '149元/月', limit: '1,000次对话/天' }, { tier: '企业版', price: '定制', limit: '无限次对话' }], apiDoc: 'https://docs.example.com/models/chat', demoUrl: 'https://demo.example.com/chat', inputPrice: '￥4/M Tokens', outputPrice: '￥16/M Tokens', publishDate: '2023-07-22' },
  { id: 3, name: 'MetaTrace-1.0-Moe-145m', logo: <img src={MetaTraceLogo} style={{ width: '40px', height: '40px' }} />, description: '高精度图像识别与分类模型', features: ['物体检测与分类', '场景识别', '图像分割', '支持自定义训练'], pricing: [{ tier: '免费版', price: '0元/月', limit: '50张图片/天' }, { tier: '专业版', price: '199元/月', limit: '1,000张图片/天' }, { tier: '企业版', price: '定制', limit: '无限量处理' }], apiDoc: 'https://docs.example.com/models/vision', demoUrl: 'https://demo.example.com/vision', inputPrice: '￥4/M Tokens', outputPrice: '￥16/M Tokens', publishDate: '2023-05-10' },
  { id: 4, name: 'MetaTrace-v1-26m', logo: <img src={MetaTraceLogo} style={{ width: '40px', height: '40px' }} />, description: '结构化数据快速分析与挖掘', features: ['自动数据清洗', '多维统计分析', '异常检测', '可视化报告生成'], pricing: [{ tier: '免费版', price: '0元/月', limit: '10次分析/天' }, { tier: '专业版', price: '299元/月', limit: '100次分析/天' }, { tier: '企业版', price: '定制', limit: '无限次分析' }], apiDoc: 'https://docs.example.com/models/analytics', demoUrl: 'https://demo.example.com/analytics', inputPrice: '￥4/M Tokens', outputPrice: '￥16/M Tokens', publishDate: '2023-08-05' },
  { id: 5, name: 'MetaTrace-v1-Moe-4*26m', logo: <img src={MetaTraceLogo} style={{ width: '40px', height: '40px' }} />, description: '多语言代码自动生成与优化', features: ['10+编程语言支持', '代码补全与优化', 'Bug检测与修复', '文档自动生成'], pricing: [{ tier: '免费版', price: '0元/月', limit: '500行代码/天' }, { tier: '专业版', price: '199元/月', limit: '10,000行代码/天' }, { tier: '企业版', price: '定制', limit: '无限量生成' }], apiDoc: 'https://docs.example.com/models/code', demoUrl: 'https://demo.example.com/code', inputPrice: '￥4/M Tokens', outputPrice: '￥16/M Tokens', publishDate: '2023-09-18' },
  { id: 6, name: 'MetaTrace-v1-108m', logo: <img src={MetaTraceLogo} style={{ width: '40px', height: '40px' }} />, description: '基于时序数据的趋势预测模型', features: ['时间序列预测', '季节性分析', '异常预警', '多变量预测支持'], pricing: [{ tier: '免费版', price: '0元/月', limit: '10次预测/天' }, { tier: '专业版', price: '249元/月', limit: '100次预测/天' }, { tier: '企业版', price: '定制', limit: '无限次预测' }], apiDoc: 'https://docs.example.com/models/forecast', demoUrl: 'https://demo.example.com/forecast', inputPrice: '￥4/M Tokens', outputPrice: '￥16/M Tokens', publishDate: '2023-04-30' },
]


const { Title, Text } = Typography;

const ModelSqare = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);

  const handleCardClick = (model) => {
    setSelectedModel(model);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedModel(null);
  };

  return (
    <div className="model-square-container">
      <Title level={2} className="page-title">模型广场</Title>
      
      {/* 3×3卡片网格布局 */}
      <Row gutter={[16, 16]} className="model-card-grid">
        {modelData.map(model => (
          <Col xs={24} sm={12} md={8} key={model.id} className="model-card-col">
            <Card
              hoverable
              className="model-card" onClick={() => handleCardClick(model)}
              cover={
                <div className="model-logo-container">
              {model.logo}
              <Title level={4} className="model-name" style={{ display: 'inline-block', margin: 0 }}>{model.name}</Title>
            </div>
              }
            >
              <Card.Meta
            description={
              <Space direction="vertical" size="small">
                <Text type="secondary">{model.description}</Text>
              </Space>
            }
          />
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {selectedModel?.name}
            <Tooltip title="复制模型名称" style={{ marginLeft: 8 }}>
              <Button
                icon={<CopyOutlined />}
                size="small"
                onClick={() => {
                  navigator.clipboard.writeText(selectedModel?.name || '');
                  message.success('模型名称已复制');
                }}
              />
            </Tooltip>
          </div>
        }
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={600}
      >
        {selectedModel && (
          <div className="model-modal-content">
            <Typography.Paragraph>{selectedModel.description}</Typography.Paragraph>
            
            <Space style={{ margin: '16px 0' }}>
              <Button type="primary" href={selectedModel.apiDoc} target="_blank" icon={<BookOutlined />}>API文档</Button>
              <Button href={selectedModel.demoUrl} target="_blank" icon={<PlayCircleOutlined />}>在线体验</Button>
            </Space>
            
            <Divider orientation="left">模型信息</Divider>
            
            <Typography.Paragraph strong>价格:</Typography.Paragraph>
            <List
              dataSource={[
                `输入: ${selectedModel.inputPrice}`,
                `输出: ${selectedModel.outputPrice}`
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
              split={false}
            />
            
            <Space style={{ margin: '16px 0' }}>
              <Button type="default" icon={<WalletOutlined />}> 充值余额</Button>
              <Button type="default" icon={<GiftOutlined />}> 赠送余额</Button>
            </Space>
            
            <Typography.Paragraph strong>上下文:</Typography.Paragraph>
            <List
              dataSource={[
                `发布日期: ${selectedModel.publishDate}`,
                `介绍: ${selectedModel.description}`
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
              bordered={false}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ModelSqare;