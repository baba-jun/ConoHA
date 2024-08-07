import React, { useState } from 'react';
import '../App.css';
import Chat from './Chat';


const PricingCard = () => {
  const [isFareButton, setIsFareBUtton] = useState(false);
  const [isChatButton, setIsChatbutton] = useState(false);

  const handleChatButton = () => {
    setIsChatbutton(true);
  }

  const handleFareButton = () => {
    setIsFareBUtton(true);
  }


  return (
    <div>
      {isFareButton && <div className="fare-button">料金比較</div>}
      {isChatButton && <div className="chat-button"><Chat/></div>}
      {!isFareButton && !isChatButton && (
        <div className="pricing-card-wrapper">
          <div className="pricing-card">
            <div className="card-content">
              <div className="service-details">
                <p>サービス <span>VPS</span></p>
                <p>CPU <span>6Core</span></p>
                <p>メモリ <span>8GB</span></p>
                <p>SSD <span>100GB</span></p>
                <p>リージョン <span>東京</span></p>
              </div>
              <div className="billing-details">
                <p>サーバー料金 <span>14.6 円/時間</span></p>
                <p>VPS割引きっぷ <span>利用しない</span></p>
              </div>
              <div className="total">
                <p>合計 <span>月額最大</span></p>
                <p className="price">8,082 円/月</p>
              </div>
              <button className="add-button">追加</button>
            </div>
          </div>
          <div className="button-container">
            <button id="fare-button" className="circle-button" onClick={handleFareButton}>料金比較</button>
            <button id="chat-button" className="circle-button" onClick={handleChatButton}>何かお困りですか？</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingCard;
