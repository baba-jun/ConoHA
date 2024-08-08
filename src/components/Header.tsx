import { Link } from 'react-router-dom';

const Header: React.FC = () => {
	return (
		<header>
		<div className="logo">
			<img src="logo.png" alt="logo" />
		</div>
		<nav>
			<ul>
				<Link to="/vps" className='header-nav-link'>VPS</Link>
				<Link to="/game" className='header-nav-link'>Game</Link>
			</ul>
		</nav>
		</header>
	);
}

export default Header;