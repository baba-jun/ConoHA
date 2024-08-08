import React, { useState, useEffect } from 'react';
import '../Fare.css';
import PricingCard from './PricingCard';
import { API_URL } from '../main';

interface Price {
  OriginalPrice: number;
  RealPrice?: number;
}

const SelectionForm: React.FC = () => {
  const [selectedOS, setSelectedOS] = useState<string>('centos');
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
  const [selectedStorages, setSelectedStorages] = useState<string[]>([]);
  const [prices, setPrices] = useState<{ [key: string]: Price | 'loading' | 'error' }>({});

  const planOptions = ['時間課金', '1ヶ月', '3ヶ月', '6ヶ月', '12ヶ月', '24ヶ月', '36ヶ月'];
  const storageOptions = ['512MB', '1GB', '2GB', '4GB', '8GB', '16GB', '32GB', '64GB'];

  const handlePlanChange = (plan: string) => {
    setSelectedPlans(prevPlans => {
      if (prevPlans.includes(plan)) {
        return prevPlans.filter(p => p !== plan);
      } else if (prevPlans.length < 3) {
        return [...prevPlans, plan];
      } else {
        return prevPlans;
      }
    });
  };

  const handleStorageChange = (storage: string) => {
    setSelectedStorages(prevStorages => {
      if (prevStorages.includes(storage)) {
        return prevStorages.filter(s => s !== storage);
      } else if (prevStorages.length < 3) {
        return [...prevStorages, storage];
      } else {
        return prevStorages;
      }
    });
  };

  const handleOSChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOS(selectedValue);

    if (selectedValue === 'ubuntu' && selectedStorages.includes('512MB')) {
      setSelectedStorages(prevStorages => prevStorages.filter(s => s !== '512MB'));
    }
  };

  const [isNextButton, setIsNextButton] = useState(false);
  const handleNext = () => {
    setIsNextButton(true);
    setIsCloseButton(false);
  };

  const [isCloseButton, setIsCloseButton] = useState(false);
  const handleClose = () => {
    setIsCloseButton(true);
    setIsNextButton(false);
  };

  const isButtonDisabled = selectedPlans.length === 0 || selectedStorages.length === 0;

  const osDisplayName = (os: string) => {
    switch (os) {
      case 'centos':
        return 'CentOS';
      case 'ubuntu':
        return 'Ubuntu';
      case 'rocky':
        return 'Rocky Linux';
      case 'alma':
        return 'AlmaLinux';
      case 'oracle':
        return 'Oracle Linux';
      case 'miracle':
        return 'MIRACLE LINUX';
      case 'freebsd':
        return 'FreeBSD';
      case 'arch':
        return 'Arch Linux';
      case 'netbsd':
        return 'NetBSD';
      case 'openbsd':
        return 'OpenBSD';
      default:
        return '';
    }
  };

  const fetchPrice = async (type_id: number, plan_id: number): Promise<Price | 'error'> => {
    try {
      const response = await fetch(`${API_URL}/api/price?type_id=${type_id}&plan_id=${plan_id}`);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      return { OriginalPrice: data.OriginalPrice, RealPrice: data.RealPrice };
    } catch (error) {
      console.error(`Failed to fetch price for type_id=${type_id}, plan_id=${plan_id}:`, error);
      return 'error';
    }
  };

  useEffect(() => {
    const fetchPrices = async () => {
      const newPrices: { [key: string]: Price | 'loading' | 'error' } = {};
      for (const plan of selectedPlans) {
        for (const storage of selectedStorages) {
          const type_id = planOptions.indexOf(plan);
          const plan_id = storageOptions.indexOf(storage);
          newPrices[`${type_id}-${plan_id}`] = 'loading';
        }
      }
      setPrices(newPrices);

      const pricePromises = selectedPlans.flatMap(plan =>
        selectedStorages.map(async storage => {
          const type_id = planOptions.indexOf(plan);
          const plan_id = storageOptions.indexOf(storage);
          const priceKey = `${type_id}-${plan_id}`;
          const price = await fetchPrice(type_id, plan_id);
          return { priceKey, price };
        })
      );

      const resolvedPrices = await Promise.all(pricePromises);

      const updatedPrices: { [key: string]: Price | 'loading' | 'error' } = {};
      resolvedPrices.forEach(({ priceKey, price }) => {
        updatedPrices[priceKey] = price;
      });

      setPrices(updatedPrices);
    };

    if (selectedPlans.length > 0 && selectedStorages.length > 0) {
      fetchPrices();
    }
  }, [selectedPlans, selectedStorages, planOptions, storageOptions]);

  const renderTableRows = () => {
    const rows: JSX.Element[] = [];
    const sortedPlans = [...selectedPlans].sort((a, b) => planOptions.indexOf(a) - planOptions.indexOf(b));
    const sortedStorages = [...selectedStorages].sort((a, b) => storageOptions.indexOf(a) - storageOptions.indexOf(b));

    sortedPlans.forEach((plan, i) => {
      sortedStorages.forEach((storage, j) => {
        const type_id = planOptions.indexOf(plan);
        const plan_id = storageOptions.indexOf(storage);
        const priceKey = `${type_id}-${plan_id}`;
        const price = prices[priceKey];
        rows.push(
          <tr key={`${i}-${j}`}>
            <td>{plan}</td>
            <td>{storage}</td>
            <td>
              {price !== undefined ? (
                price !== 'loading' && price !== 'error' ? (
                  price.RealPrice ? (
                    <div>
                      <span className="real-price">{price.RealPrice} 円/月</span><br></br><span className="original-price">{price.OriginalPrice} 円/月</span>
                    </div>
                  ) : (
                    <span>{price.OriginalPrice} 円/月</span>
                  )
                ) : (
                  price === 'loading' ? 'Loading...' : 'Error'
                )
              ) : 'Loading...'}
            </td>
          </tr>
        );
      });
    });
    return rows;
  };

  return (
    <div>
      {isNextButton &&
      <div className="fare-container">
        <div className="selected-os">
          <p>OS: {osDisplayName(selectedOS)}</p>
          <p>料金タイプ: {[...selectedPlans].sort((a, b) => planOptions.indexOf(a) - planOptions.indexOf(b)).join(', ')}</p>
          <p>ストレージ: {[...selectedStorages].sort((a, b) => storageOptions.indexOf(a) - storageOptions.indexOf(b)).join(', ')}</p>
        </div>
        <table className="compare-table">
          <thead>
            <tr>
              <th>料金タイプ</th>
              <th>プラン</th>
              <th>料金</th>
            </tr>
          </thead>
          <tbody>
            {renderTableRows()}
          </tbody>
        </table>
        <div className="section">
          <button id="close-button" className="close-button" onClick={handleClose}>閉じる</button>
        </div>
      </div>}
      {isCloseButton && <div><PricingCard service={null} image={null} realFare={null} fare={null} plan={null}/></div>}
      {!isNextButton && !isCloseButton && (
        <div className="fare-container">
          <div className="section">
            <label htmlFor="os-select">1. OS選択</label>
            <select id="os-select" value={selectedOS} onChange={handleOSChange}>
              <option value="centos">CentOS</option>
              <option value="ubuntu">Ubuntu</option>
              <option value="rocky">Rocky Linux</option>
              <option value="alma">AlmaLinux</option>
              <option value="oracle">Oracle Linux</option>
              <option value="miracle">MIRACLE LINUX</option>
              <option value="freebsd">FreeBSD</option>
              <option value="arch">Arch Linux</option>
              <option value="netbsd">NetBSD</option>
              <option value="openbsd">OpenBSD</option>
            </select>
          </div>
          <div className="section">
            <p>2. 考えている料金タイプをすべて選択 (3つまで)</p>
            <div className="checkbox-group">
              {planOptions.map(plan => (
                <label key={plan} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={plan}
                    checked={selectedPlans.includes(plan)}
                    onChange={() => handlePlanChange(plan)}
                    disabled={!selectedPlans.includes(plan) && selectedPlans.length >= 3}
                  />
                  {plan}
                  <span className="checkmark"></span>
                </label>
              ))}
            </div>
          </div>
          <div className="section">
            <p>3. 考えているストレージをすべて選択 (3つまで)</p>
            <div className="checkbox-group">
              {storageOptions.map(storage => (
                <label key={storage} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={storage}
                    checked={selectedStorages.includes(storage)}
                    onChange={() => handleStorageChange(storage)}
                    disabled={(selectedOS === 'ubuntu' && storage === '512MB') || (!selectedStorages.includes(storage) && selectedStorages.length >= 3)}
                  />
                  {storage}
                  <span className="checkmark"></span>
                </label>
              ))}
            </div>
          </div>
          <div className="section">
            <button id="next-button" className="next-button" onClick={handleNext} disabled={isButtonDisabled}>次へ</button>
          </div>
          <div className="section">
            <button id="close-button" className="close-button" onClick={handleClose}>閉じる</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectionForm;
