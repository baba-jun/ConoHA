const Vps = () => {
  return (
    <main className="vps-main">
      <section className="service-section">
        <h2>サービス</h2>
        <div className="os-grid">
        <div className="radio-button">
          <input type="radio" id="VPS" name="os" value="VPS" />
          <label htmlFor="VPS">
            <img src="src/assets/games/CoreKeeper.png" alt="VPS" />
          </label>
          <p className="undercaption">VPS</p>
        </div>

        <div className="radio-button">
          <input type="radio" id="WindowsServer" name="os" value="Windows Server" />
          <label htmlFor="WindowsServer">
            <img src="src/assets/games/CoreKeeper.png" alt="WindowsServer" />
          </label>
          <p className="undercaption">WindowsServer</p>
        </div>

        <div className="radio-button">
          <input type="radio" id="GPUServer" name="os" value="GPUServer" />
          <label htmlFor="GPUServer">
            <img src="src/assets/games/CoreKeeper.png" alt="GPUServer" />
          </label>
          <p className="undercaption">GPUサーバー</p>
        </div>

        <div className="radio-button">
          <input type="radio" id="MailServer" name="os" value="MailServer" />
          <label htmlFor="MailServer">
            <img src="src/assets/games/CoreKeeper.png" alt="MailServer" />
          </label>
          <p className="undercaption">メールサーバー</p>
        </div>

        <div className="radio-button">
          <input type="radio" id="DBServer" name="os" value="DBServer" />
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
            <input type="radio" id="centos" name="os" value="CentOS" />
            <label htmlFor="centos">
              <img src="src/assets/games/CoreKeeper.png" alt="CentOS" />
            </label>
            <p className="undercaption">CentOS</p>
          </div>
          <div className="radio-button">
            <input type="radio" id="ubuntu" name="os" value="Ubuntu" />
            <label htmlFor="ubuntu">
              <img src="src/assets/games/CoreKeeper.png" alt="Ubuntu" />
            </label>
            <p className="undercaption">Ubuntu</p>
          </div>
          <div className="radio-button">
            <input type="radio" id="debian" name="os" value="Debian" />
            <label htmlFor="debian">
              <img src="src/assets/games/CoreKeeper.png" alt="Debian" />
            </label>
              <p className="undercaption">Debian</p>
          </div>
          <div className="radio-button">
            <input type="radio" id="rocky" name="os" value="Rocky Linux" />
            <label htmlFor="rocky">
              <img src="src/assets/games/CoreKeeper.png" alt="Rocky Linux" />
            </label>
            <p className="undercaption">Rocky Linux</p>
          </div>
          <div className="radio-button">
            <input type="radio" id="alma" name="os" value="AlmaLinux" />
            <label htmlFor="alma">
              <img src="src/assets/games/CoreKeeper.png" alt="AlmaLinux" />
            </label>
            <p className="undercaption">AlmaLinux</p>
          </div>
          <div className="radio-button">
            <input type="radio" id="oracle" name="os" value="Oracle Linux" />
            <label htmlFor="oracle">
              <img src="src/assets/games/CoreKeeper.png" alt="Oracle Linux" />
            </label>
            <p className="undercaption">Oracle Linux</p>
          </div>
          <div className="radio-button">
            <input type="radio" id="freebsd" name="os" value="FreeBSD" />
            <label htmlFor="freebsd">
              <img src="src/assets/games/CoreKeeper.png" alt="FreeBSD" />
            </label>
            <p className="undercaption">FreeBSD</p>
          </div>
          <div className="radio-button">
            <input type="radio" id="arch" name="os" value="Arch Linux" />
            <label htmlFor="arch">
              <img src="src/assets/games/CoreKeeper.png" alt="Arch Linux" />
            </label>
            <p className="undercaption">Arch Linux</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Vps;