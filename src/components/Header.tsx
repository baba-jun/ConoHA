import { Link } from 'react-router-dom';



const Header: React.FC = () => {
	return (
	  <header>
		<div className="logo">
		  <img src="logo.png" alt="logo" />
		</div>
		<nav>
		  <ul>
			<li>VPS</li>
			<li>GAME</li>
		  </ul>
		</nav>
	  </header>
	);
}

export default Header;