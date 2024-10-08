import { useState } from 'react';
import '../App.css';
import Chat from './Chat';
import Fare from './Fare';


type PricingCardProps = {
  type: string;
  service: number | null;
  image: number | null;
  fareType: number | null;
  plan: number | null;
  realFare: number | null;
  fare: number | null;
};

const PricingCard = (props: PricingCardProps) => {
  const serviceList = ["VPS", "WindowsServer", "GPUサーバー", "メールサーバー", "DBサーバー"];
  const imageList = ["CentOS", "Ubuntu", "Debian", "Rocky Linux", "AlmaLinux", "Oracle Linux", "MIRACLE LINUX", "FreeBSD", "Arch Linux", "NetBSD", "OpenBSD"];
  const planList = [
    {ram: "512MB", cpu: "1Core", ssd: "30GB"},
    {ram: "1GB", cpu: "2Core", ssd: "100GB"},
    {ram: "2GB", cpu: "3Core", ssd: "100GB"},
    {ram: "4GB", cpu: "4Core", ssd: "100GB"},
    {ram: "8GB", cpu: "6Core", ssd: "100GB"},
    {ram: "16GB", cpu: "8Core", ssd: "100GB"},
    {ram: "32GB", cpu: "12Core", ssd: "100GB"},
    {ram: "64GB", cpu: "24Core", ssd: "100GB"},
  ]

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
      {isFareButton && <div className="fare-button"><Fare handleFareButton={function (): void {
        throw new Error('Function not implemented.');
      } }/></div>}
      {isChatButton && <div className="chat-button"><Chat/></div>}
      {!isFareButton && !isChatButton && props.type === "VPS" && (
      <div className="pricing-card-wrapper-wrapper">
        <div className="pricing-card-wrapper">
          <table className="pricing-card">
            <tbody>
              <tr>
                <td className='itemName'>サービス</td>
                <td className='itemValue'>
                  {
                    props.service != null && serviceList[props.service]
                  }
                </td>
              </tr>
              <tr>
                <td className='itemName'>イメージタイプ</td>
                <td className='itemValue'>
                  {
                    props.image != null && imageList[props.image]
                  }
                </td>
              </tr>
              <tr>
                <td className='itemName'>CPU</td>
                <td className='itemValue'>
                  {
                    props.plan != null && planList[props.plan].cpu
                  }
                </td>
              </tr>
              <tr>
                <td className='itemName'>メモリ</td>
                <td className='itemValue'>
                  {
                    props.plan != null && planList[props.plan].ram
                  }
                </td>
              </tr>
              <tr>
                <td className='itemName'>SSD</td>
                <td className='itemValue'>
                  {
                    props.plan != null && planList[props.plan].ssd
                  }
                </td>
              </tr>
              <tr>
                <td className='itemName'>合計</td>
                {
                  props.fareType == 0 && <td className='max-price-per-month'>月額最大</td>
                }
              </tr>
              <tr>
                <td className="price" colSpan={2}>{props.fare} 円/月</td>
              </tr>
            </tbody>
          </table>
          <button className="add-button">追加</button>
        </div>
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
