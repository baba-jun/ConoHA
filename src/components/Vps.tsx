import PricingCard from "./PricingCard";

const Vps = () => {
  return (
    <main>
      <div className="left-area">
      <section className="service-section">
        <h2>サービス</h2>
        <div className="os-grid">
        <div className="radio-button">
          <input type="radio" id="VPS" name="service" value="VPS" />
          <label htmlFor="VPS">
            <img src="src/assets/games/CoreKeeper.png" alt="VPS" />
          </label>
          <p className="undercaption">VPS</p>
        </div>

        <div className="radio-button">
          <input type="radio" id="WindowsServer" name="service" value="Windows Server" />
          <label htmlFor="WindowsServer">
            <img src="src/assets/games/CoreKeeper.png" alt="WindowsServer" />
          </label>
          <p className="undercaption">WindowsServer</p>
        </div>

        <div className="radio-button">
          <input type="radio" id="GPUServer" name="service" value="GPUServer" />
          <label htmlFor="GPUServer">
            <img src="src/assets/games/CoreKeeper.png" alt="GPUServer" />
          </label>
          <p className="undercaption">GPUサーバー</p>
        </div>

        <div className="radio-button">
          <input type="radio" id="MailServer" name="service" value="MailServer" />
          <label htmlFor="MailServer">
            <img src="src/assets/games/CoreKeeper.png" alt="MailServer" />
          </label>
          <p className="undercaption">メールサーバー</p>
        </div>

        <div className="radio-button">
          <input type="radio" id="DBServer" name="service" value="DBServer" />
          <label htmlFor="DBServer">
            <img src="src/assets/games/CoreKeeper.png" alt="DBServer" />
          </label>
          <p className="undercaption">DBサーバー</p>
        </div>


        </div>
      </section>

      <section className="os-selection">
        <h2>イメージタイプ</h2>
        <div className="os-grid">
          <div className="radio-button">
            <input type="radio" id="centos" name="image" value="CentOS" />
            <label htmlFor="centos">
              <img src="src/assets/games/CoreKeeper.png" alt="CentOS" />
            </label>
            <p className="undercaption">CentOS</p>
          </div>
          <div className="radio-button">
            <input type="radio" id="ubuntu" name="image" value="Ubuntu" />
            <label htmlFor="ubuntu">
              <img src="src/assets/games/CoreKeeper.png" alt="Ubuntu" />
            </label>
            <p className="undercaption">Ubuntu</p>
          </div>
          <div className="radio-button">
            <input type="radio" id="debian" name="image" value="Debian" />
            <label htmlFor="debian">
              <img src="src/assets/games/CoreKeeper.png" alt="Debian" />
            </label>
              <p className="undercaption">Debian</p>
          </div>
          <div className="radio-button">
            <input type="radio" id="rocky" name="image" value="Rocky Linux" />
            <label htmlFor="rocky">
              <img src="src/assets/games/CoreKeeper.png" alt="Rocky Linux" />
            </label>
            <p className="undercaption">Rocky Linux</p>
          </div>
          <div className="radio-button">
            <input type="radio" id="alma" name="image" value="AlmaLinux" />
            <label htmlFor="alma">
              <img src="src/assets/games/CoreKeeper.png" alt="AlmaLinux" />
            </label>
            <p className="undercaption">AlmaLinux</p>
          </div>
          <div className="radio-button">
            <input type="radio" id="oracle" name="image" value="Oracle Linux" />
            <label htmlFor="oracle">
              <img src="src/assets/games/CoreKeeper.png" alt="Oracle Linux" />
            </label>
            <p className="undercaption">Oracle Linux</p>
          </div>
          <div className="radio-button">
            <input type="radio" id="freebsd" name="image" value="FreeBSD" />
            <label htmlFor="freebsd">
              <img src="src/assets/games/CoreKeeper.png" alt="FreeBSD" />
            </label>
            <p className="undercaption">FreeBSD</p>
          </div>
          <div className="radio-button">
            <input type="radio" id="arch" name="image" value="Arch Linux" />
            <label htmlFor="arch">
              <img src="src/assets/games/CoreKeeper.png" alt="Arch Linux" />
            </label>
            <p className="undercaption">Arch Linux</p>
          </div>
        </div>
      </section>
      <section className="fare-type-selection">
        <h2>料金タイプ</h2>
        <div className="fare-grid">
          <div className="radio-button-landscape">
            <input type="radio" id="timefare" name="fare" value="timefare" />
            <label htmlFor="timefare">
              時間料金
            </label>
          </div>
          <div className="radio-button-landscape">
            <input type="radio" id="1month" name="fare" value="1month" />
            <label htmlFor="1month">
              1ヶ月
            </label>
          </div>
          <div className="radio-button-landscape">
            <input type="radio" id="3months" name="fare" value="3months" />
            <label htmlFor="3months">
              3ヶ月
            </label>
          </div>
          <div className="radio-button-landscape">
            <input type="radio" id="6months" name="fare" value="6months" />
            <label htmlFor="6months">
              6ヶ月
            </label>
          </div>
          <div className="radio-button-landscape">
            <input type="radio" id="12months" name="fare" value="12months" />
            <label htmlFor="12months">
              12ヶ月
            </label>
          </div>
          <div className="radio-button-landscape">
            <input type="radio" id="24months" name="fare" value="24months" />
            <label htmlFor="24months">
              24ヶ月
            </label>
          </div>
          <div className="radio-button-landscape">
            <input type="radio" id="36months" name="fare" value="36months" />
            <label htmlFor="36months">
              36ヶ月
            </label>
          </div>
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
      <PricingCard />
    </div>
    </main>
  );
};

export default Vps;