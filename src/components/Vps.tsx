import { useEffect, useState } from "react";
import PricingCard from "./PricingCard";

const Vps = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedFare, setSelectedFare] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [originalPare, setOriginalFare] = useState<number | null>(0);
  const [realFareValue, setFareValue] = useState<number | null>(0);

  interface Price {
    OriginalPrice: number;
    RealPrice?: number;
  }

  useEffect(() => {
    if (selectedFare !== null && selectedPlan !== null) {
      fetchPrice(selectedFare, selectedPlan)
    }
  }, [selectedFare, selectedPlan]);

  const fetchPrice = async (type_id: number, plan_id: number): Promise<Price | 'error'> => {
    try {
      const response = await fetch(`http://160.251.180.174/api/price?type_id=${type_id}&plan_id=${plan_id}`);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      setOriginalFare(data.OriginalPrice);
      setFareValue(data.RealPrice);
      return data.RealPrice
    } catch (error) {
      console.error(`Failed to fetch price for type_id=${type_id}, plan_id=${plan_id}:`, error);
      return 'error';
    }
  };

  const services =[
    { id: "VPS", value: "VPS", alt: "VPS", caption: "VPS", check: "checked" },
    { id: "WindowsServer", value: "Windows Server", alt: "WindowsServer", caption: "WindowsServer", check: "" },
    { id: "GPUServer", value: "GPUServer", alt: "GPUServer", caption: "GPUサーバー", check: "" },
    { id: "MailServer", value: "MailServer", alt: "MailServer", caption: "メールサーバー", check: "" },
    { id: "DBServer", value: "DBServer", alt: "DBServer", caption: "DBサーバー", check: "" },
  ]

  const images = [
    { id: "centos", value: "CentOS", alt: "CentOS", caption: "CentOS" },
    { id: "ubuntu", value: "Ubuntu", alt: "Ubuntu", caption: "Ubuntu" },
    { id: "debian", value: "Debian", alt: "Debian", caption: "Debian" },
    { id: "rocky", value: "Rocky Linux", alt: "Rocky", caption: "Rocky Linux" },
    { id: "alma", value: "AlmaLinux", alt: "Alma", caption: "AlmaLinux" },
    { id: "oracle", value: "Oracle Linux", alt: "Oracle", caption: "Oracle Linux" },
    { id: "miracle", value: "MIRACLE LINUX", alt: "Miracle", caption: "MIRACLE LINUX" },
    { id: "freebsd", value: "FreeBSD", alt: "FreeBSD", caption: "FreeBSD" },
    { id: "arch", value: "Arch Linux", alt: "Arch", caption: "Arch Linux" },
    { id: "netbsd", value: "NetBSD", alt: "NetBSD", caption: "NetBSD" },
    { id: "openbsd", value: "OpenBSD", alt: "OpenBSD", caption: "OpenBSD" },
  ]

  const fares = [
    { id: "timefare", value: "timefare", caption: "時間料金" },
    { id: "1month", value: "1month", caption: "1ヶ月" },
    { id: "3months", value: "3months", caption: "3ヶ月" },
    { id: "6months", value: "6months", caption: "6ヶ月" },
    { id: "12months", value: "12months", caption: "12ヶ月" },
    { id: "24months", value: "24months", caption: "24ヶ月" },
    { id: "36months", value: "36months", caption: "36ヶ月" },
  ]

  const plans = [
    { size: '512MB', price: '750円/月', cpu: '1Core', ssd: '30GB', value: '512MB' },
    { size: '1GB', price: '1,064円/月', cpu: '2Core', ssd: '100GB', value: '1GB', highlighted: true },
    { size: '2GB', price: '2,032円/月', cpu: '3Core', ssd: '100GB', value: '2GB' },
    { size: '4GB', price: '3,968円/月', cpu: '4Core', ssd: '100GB', value: '4GB' },
    { size: '8GB', price: '8,082円/月', cpu: '6Core', ssd: '100GB', value: '8GB' },
    { size: '16GB', price: '15,730円/月', cpu: '8Core', ssd: '100GB', value: '16GB' },
    { size: '32GB', price: '31,460円/月', cpu: '12Core', ssd: '100GB', value: '32GB' },
    { size: '64GB', price: '59,290円/月', cpu: '24Core', ssd: '100GB', value: '64GB' },
  ];

  const selectServiceItem = (index:number) => {
    setSelectedService(index)
  }

  const selectImageItem = (index:number) => {
    setSelectedService(index)
  }

  const selectFareitem = (index:number) => {
    setSelectedFare(index)
  }

  const selectPlanitem = (index:number) => {
    setSelectedPlan(index)
  }

  return (
    <main>
      <div className="left-area">
        <section className="service-section">
          <h2>サービス</h2>
          <div className="os-grid">
            {services.map((item, index) => (
              <div className="radio-button" key={item.id}>
                <input type="radio" id={item.id} name="service" value={item.value} onChange={() => selectServiceItem(index)}/>
                <label htmlFor={item.id}>
                  <img src={`src/assets/VPSs/${item.alt}.png`} alt={item.alt} />
                </label>
                <p className="undercaption">{item.caption}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="os-selection">
          <h2>イメージタイプ</h2>
          <div className="os-grid">
            {images.map((item, index) => (
              <div className="radio-button" key={item.id}>
                <input type="radio" id={item.id} name="image" value={item.value} onChange={() => selectImageItem(index)}/>
                <label htmlFor={item.id}>
                  <img src={`src/assets/VPSs/${item.alt}.png`} alt={item.alt} />
                </label>
                <p className="undercaption">{item.caption}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="fare-type-selection">
          <h2>料金タイプ</h2>
          <div className="fare-grid">
            {fares.map((item, index) => (
              <div className="radio-button-landscape" key={item.id}>
                <input type="radio" id={item.id} name="fare" value={item.value} onChange={() => selectFareitem(index)}/>
                <label htmlFor={item.id}>{item.caption}</label>
              </div>
            ))}
          </div>
        </section>

        <section className="plan-selection">
          <h2>プラン</h2>
          <div className="os-grid">
          {plans.map((item, index) => (
              <div className="radio-button" key={item.size}>
                <input type="radio" id={item.size} name="service" value={item.value} onChange={() => selectPlanitem(index)}/>
                <label htmlFor={item.size}>
                <div className="pricing-table">
                <div className="size">{item.size}</div>
                <div className="price">{item.price}</div>
                <div className="cpu">CPU {item.cpu}</div>
                <div className="ssd">SSD {item.ssd}</div>
                </div>
                </label>
              </div>
            ))}
            </div>
        </section>

        <section className="root-password">
          <h2>Rootパスワード</h2>
          <div className="root-password-area">
            <input type="password" className="text-input" id="root-password" name="root-password" />
          </div>
        </section>

        <section className="name-tag">
          <h2>ネームタグ</h2>
          <div className="name-tag-area">
            <input type="text" className="text-input" id="name-tag" name="name-tag" />
          </div>
        </section>
      </div>
      <div className="right-area">
        {realFareValue ===0 &&
        <PricingCard service={selectedService} image={selectedService} realFare={realFareValue} fare={originalPare} />
        }
        {realFareValue !==0 &&
        <PricingCard  service={selectedService} image={selectedService} realFare={realFareValue} fare={realFareValue} />
    }
      </div>
    </main>
  );
};

export default Vps;