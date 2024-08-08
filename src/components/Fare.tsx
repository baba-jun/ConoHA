import React, { useState } from 'react';
import '../Fare.css';
import PricingCard from './PricingCard';

const SelectionForm: React.FC = () => {
  const [selectedOS, setSelectedOS] = useState<string>('centos');
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
  const [selectedStorages, setSelectedStorages] = useState<string[]>([]);

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

  const planNumbers = selectedPlans.map(plan => planOptions.indexOf(plan)).join(', ');
  const storageNumbers = selectedStorages.map(storage => storageOptions.indexOf(storage)).join(', ');

  const renderTableRows = () => {
    const rows: JSX.Element[] = [];
    const sortedPlans = [...selectedPlans].sort((a, b) => planOptions.indexOf(a) - planOptions.indexOf(b));
    const sortedStorages = [...selectedStorages].sort((a, b) => storageOptions.indexOf(a) - storageOptions.indexOf(b));
    
    sortedPlans.forEach((plan, i) => {
      sortedStorages.forEach((storage, j) => {
        const planIndex = planOptions.indexOf(plan);
        const storageIndex = storageOptions.indexOf(storage);
        rows.push(
          <tr key={`${i}-${j}`}>
            <td>{plan}</td>
            <td>{storage}</td>
            <td>{planIndex},{storageIndex}</td>
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
          <p>料金タイプ: {selectedPlans.join(', ')}</p>
          <p>ストレージ: {selectedStorages.join(', ')}</p>
        </div>
        <table className="pricing-table">
          <thead>
            <tr>
              <th>料金タイプ</th>
              <th>プラン</th>
              <th>番号</th>
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
      {isCloseButton && <div><PricingCard /></div>}
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
