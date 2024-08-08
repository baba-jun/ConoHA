import './App.css';
import Header from "./components/Header";
import { Routes, Route, Navigate } from 'react-router-dom';
import Vps from './components/Vps';
import Game from './components/Game';
import Fare from './components/Fare';
import ServerList from './components/ServerList';
// import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  const randomInt = Math.floor(Math.random() * 100);
  return (
    <div className="app">
      <Header />
      <div className="content">
        {/* <Sidebar /> */}
        <Routes>
        <Route path="/" element={<Navigate to="/server-list"/>} />
        <Route path="/vps" element={<Vps randomInt={randomInt}/>} />
        <Route path="/game" element={<Game />} />
        <Route path="/fare" element={<Fare/>} />
        <Route path="/server-list" element={<ServerList/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
