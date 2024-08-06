import './App.css';



const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <div className="content">
        <MainContent />
      </div>
    </div>
  );
}

export default App;

const Header: React.FC = () => {
  return (
    <header>
      <div className="logo">ConoHa</div>
      <nav>
        <ul>
          <li>VPS</li>
          <li>GAME</li>
        </ul>
      </nav>
    </header>
  );
}

// Sidebar.tsx
// const Sidebar: React.FC = () => {
//   return (
//     <aside>
//       <button className="add-server">サーバー追加</button>
//       <ul>
//         <li>サーバー</li>
//       </ul>
//       <div className="version">Ver.3.0</div>
//     </aside>
//   );
// }

// MainContent.tsx
const MainContent: React.FC = () => {
  return (
    <main>
        <div className='left-area'>
      <section className="services">
        <h2>サービス</h2>
        <div className="service-grid">
          <div className="service-item active">VPS</div>
          <div className="service-item">Windows Server</div>
          <div className="service-item">GPUサーバー</div>
          <div className="service-item">メールサーバー</div>
          <div className="service-item">DBサーバー</div>
        </div>
      </section>
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
      <section className="server-info">
        {/* Add server information */}
      </section>
      </div>
      <div className='right-area'>
        aaa
      </div>
    </main>
  );
}