import { createBrowserRouter } from 'react-router-dom';

import Login from '@/pages/Login';
import Layout from '@/pages/Layout'; // 确保路径正确
import ModelTuning from '@/pages/ModelTuning';
import BatchProcess from '@/pages/BatchProcess';
import ModelSqare from '@/pages/ModelSqare';
import Person from '@/pages/Person'; // 添加实名认证页面
import BalanceRecharge from '@/pages/BalanceRecharge'
import AuthRoute from '@/components/AuthRoute'; // 确保路径正确


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        index: true,
        element: <ModelSqare />,
      },
      {
        path: 'model-tuning',
        element: <ModelTuning />,
      },
      {
        path: 'batch-process',
        element: <BatchProcess />,
      },
      {
        path: 'person',
        element: <Person />, // 实名认证页面
      },
            {
        path: 'recharge',
        element: <BalanceRecharge />, // 实名认证页面
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;