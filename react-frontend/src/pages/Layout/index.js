import { Layout, Menu, Popconfirm } from 'antd';
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
  UserOutlined,
  DollarOutlined,
  FileOutlined,
  IdcardOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import './index.scss';
import { useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchUserInfo, ClearUserInfo } from '../../store/modules/user';
import { useDispatch, useSelector } from 'react-redux';

const { Header, Sider } = Layout;

const items = [
  {
    label: '模型', // 添加小标题
    key: 'model-title',
    disabled: true, // 禁用点击
    style: { fontWeight: 'bold', fontSize: '12px', color: '#000' },
  },
  {
    label: '模型广场',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: '模型微调',
    key: '/model-tuning',
    icon: <DiffOutlined />,
  },
  {
    label: '批量处理',
    key: '/batch-process',
    icon: <EditOutlined />,
  },
  {
    label: '体验中心', // 添加小标题
    key: 'experience-center-title',
    disabled: true, // 禁用点击
    style: { fontWeight: 'bold', fontSize: '12px', color: '#000' },
  },
  {
    label: '体验中心1',
    key: '/experience-center1',
    icon: <HomeOutlined />,
  },
  {
    label: '体验中心2',
    key: '/experience-center2',
    icon: <DiffOutlined />,
  },
  {
    label: '账号管理', // 添加小标题
    key: 'account-management-title',
    disabled: true, // 禁用点击
    style: { fontWeight: 'bold', fontSize: '12px', color: '#000' },
  },
  {
    label: '实名认证',
    key: '/person',
    icon: <IdcardOutlined />,
  },
  {
    label: '余额充值',
    key: '/recharge',
    icon: <WalletOutlined />,
  },
  {
    label: '费用账单',
    key: '/expense-bills',
    icon: <DollarOutlined />,
  },
    {
    label: 'API密钥',
    key: '/expense-bills',
    icon: <DollarOutlined />,
  },
];

const GeekLayout = () => {
  const navigate = useNavigate();
  const onMenuClick = (route) => {
    console.log('菜单被点击了', route);
    const path = route.key;
    navigate(path);
  };

  const onConfirm = () => {
    console.log('确认退出');
    dispatch(ClearUserInfo());
    navigate('/login');
  };

  const location = useLocation();
  console.log(location.pathname); // 检查当前路径
  const selectedkey = [location.pathname];

  const dispatch = useDispatch();
  const name = useSelector((state) => state.user.userInfo?.name || '默认用户名');
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onConfirm}>
              <LogoutOutlined style={{ color: '#C27BA0' }} /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="light"
            selectedKeys={selectedkey}
            onClick={onMenuClick}
            items={items}
            style={{ height: '100%', borderRight: 0, backgroundColor: '#F0E1F6' }} // 修改背景颜色为淡粉紫色
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default GeekLayout;