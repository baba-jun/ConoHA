import '../App.css';
import React from 'react';

const MainContent: React.FC = () => {
	return (
		<main>
			<div className='left-area'>
				<section>
					<h2>サービス</h2>
					<div className="service-grid">
						<div className="service-item active">VPS</div>
						<div className="service-item">Windows Server</div>
						<div className="service-item">GPUサーバー</div>
						<div className="service-item">メールサーバー</div>
						<div className="service-item">DBサーバー</div>
					</div>
				</section>
			</div>
		</main>
	);
	}
export default MainContent;