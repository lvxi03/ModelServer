import React from 'react';
import './index.scss'; // 假设你的CSS文件名为BalancePage.scss

const BalancePage = () => {
  return (
    <div className="container">
      <div className="warning">
        余额预警已开启 <a href="#">去设置</a>
      </div>
      <div className="balance-section">
        <div className="balance">14元</div>
        <div className="balance-info">
          <div>充值余额 <span>0元</span></div>
          <div>赠送余额 <span>14元</span></div>
        </div>
      </div>
      <div className="section">
        <div className="section-title">在线充值</div>
        <div className="section-content">
          提示：请先完成 <a href="#">个人实名认证</a>，通过后可进行在线充值。
        </div>
      </div>
      <div className="section">
        <div className="section-title">对公转账</div>
        <div className="section-content">
          提示：请先完成 <a href="#">企业实名认证</a>，通过后可进行对公打款。
        </div>
      </div>
    </div>
  );
};

export default BalancePage;