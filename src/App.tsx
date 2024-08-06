import './App.css';
import Game from './modules/Game';
import Vps from './modules/Vps';


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
        <Vps/>
        <Game/>
      <section className="server-info">
        {/* Add server information */}
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