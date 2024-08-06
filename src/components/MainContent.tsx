import Vps from './Vps';
import Game from './Game';

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
export default MainContent;