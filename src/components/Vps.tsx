
const Vps = () => {
    return (
      <main>
        <section className="os-selection">
        <h2>イメージタイプ</h2>
        <div className="os-grid">
        <div className="radio-button">
              <input type="radio" id="centos" name="os" value="CentOS" />
              <label htmlFor="centos">CentOS</label>
            </div>
            <div className="radio-button">
              <input type="radio" id="ubuntu" name="os" value="Ubuntu" />
              <label htmlFor="ubuntu">Ubuntu</label>
            </div>
            <div className="radio-button">
              <input type="radio" id="debian" name="os" value="Debian" />
              <label htmlFor="debian">Debian</label>
            </div>
            <div className="radio-button">
              <input type="radio" id="rocky" name="os" value="Rocky Linux" />
              <label htmlFor="rocky">Rocky Linux</label>
            </div>
            <div className="radio-button">
              <input type="radio" id="alma" name="os" value="AlmaLinux" />
              <label htmlFor="alma">AlmaLinux</label>
            </div>
            <div className="radio-button">
              <input type="radio" id="oracle" name="os" value="Oracle Linux" />
              <label htmlFor="oracle">Oracle Linux</label>
            </div>
            <div className="radio-button">
              <input type="radio" id="freebsd" name="os" value="FreeBSD" />
              <label htmlFor="freebsd">FreeBSD</label>
            </div>
            <div className="radio-button">
              <input type="radio" id="arch" name="os" value="Arch Linux" />
              <label htmlFor="arch">Arch Linux</label>
            </div>
          </div>
        </section>
        </main>
    );
  };

  export default Vps;