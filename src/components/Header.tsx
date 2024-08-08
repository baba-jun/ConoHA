import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src="logo.png" alt="logo" />
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link
              to="/vps"
              className={`header-nav-link ${location.pathname === '/vps' ? 'active' : ''}`}
            >
              VPS
            </Link>
          </li>
          <li>
            <Link
              to="/game"
              className={`header-nav-link ${location.pathname === '/game' ? 'active' : ''}`}
            >
              Game
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
