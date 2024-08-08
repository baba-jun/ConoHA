import React, { useState } from 'react';
import '../App.css';
import Chat from './Chat';
import Fare from './Fare';


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
      {isFareButton && <div className="fare-button"><Fare/></div>}
      {isChatButton && <div className="chat-button"><Chat/></div>}
      {!isFareButton && !isChatButton && (
        <div className="pricing-card-wrapper">
          <table className="pricing-card">
            <tbody>
              <tr>
                <td>サービス</td>
                <td>VPS</td>
              </tr>
              <tr>
                <td>CPU</td>
                <td>6Core</td>
              </tr>
              <tr>
                <td>メモリ</td>
                <td>8GB</td>
              </tr>
              <tr>
                <td>SSD</td>
                <td>100GB</td>
              </tr>
              <tr>
                <td>リージョン</td>
                <td>東京</td>
              </tr>
              <tr>
                <td>サーバー料金</td>
                <td>14.6 円/時間</td>
              </tr>
              <tr>
                <td>VPS割引きっぷ</td>
                <td>利用しない</td>
              </tr>
              <tr>
                <td>合計</td>
                <td>月額最大</td>
              </tr>
              <tr>
                <td className="price" colSpan={2}>8,082 円/月</td>
              </tr>
            </tbody>
          </table>
          <button className="add-button">追加</button>
        </div>
      )}
      {!isFareButton && !isChatButton && (
      <div className="button-container">
            <button id="fare-button" className="circle-button" onClick={handleFareButton}>料金比較</button>
            <button id="chat-button" className="circle-button" onClick={handleChatButton}>何かお困りですか？</button>
          </div>
      )}
    </div>
  );
};

export default PricingCard;
