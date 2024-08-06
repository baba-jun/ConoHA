// App.tsx
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <div className="content">
        <Sidebar />
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
          <li>WING</li>
          <li>GAME</li>
          <li>AI</li>
        </ul>
      </nav>
      <div className="user-info">
        <span>ヘルプ</span>
        <span>お知らせ</span>
        <span>Intern2024-TeamB@gmo.jp</span>
      </div>
    </header>
  );
}

// Sidebar.tsx
const Sidebar: React.FC = () => {
  return (
    <aside>
      <button className="add-server">サーバー追加</button>
      <ul>
        <li>サーバー</li>
        <li>ストレージ</li>
        <li>イメージ</li>
        <li>ネットワーク</li>
        <li>セキュリティ</li>
        <li>オブジェクトストレージ</li>
        <li>DNS</li>
        <li>ライセンス</li>
        <li>ドメイン</li>
        <li>API</li>
      </ul>
      <div className="version">Ver.3.0</div>
    </aside>
  );
}

// MainContent.tsx
const MainContent: React.FC = () => {
  return (
    <main>
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
          <div className="os-item active">CentOS</div>
          <div className="os-item">Ubuntu</div>
          <div className="os-item">Debian</div>
          <div className="os-item">Rocky Linux</div>
          <div className="os-item">AlmaLinux</div>
          {/* Add more OS items */}
        </div>
      </section>
      <section className="server-info">
        {/* Add server information */}
      </section>
    </main>
  );
}