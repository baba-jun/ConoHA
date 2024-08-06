import { Button } from "@mui/material";
import styled from "@emotion/styled";

const TextButton = styled(Button)`
  text-transform: none;
  background-color: #e0e0e0;
  color:black;
  &:hover {
    background-color: #00bcd4;
    color: white;
  }
  max-height: 100px;
  max-width: 100px;
  min-height: 100px;
  min-width: 100px;
  border-radius: 20px;
  aspect-ratio: 1 / 1;
`;

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
			<TextButton>CentOS</TextButton>
			<TextButton>Ubuntu</TextButton>
			<TextButton>Debian</TextButton>
		  </div>
		</section>
		<section className="server-info">
		  {/* Add server information */}
		</section>
	  </main>
	);
}

export default MainContent;