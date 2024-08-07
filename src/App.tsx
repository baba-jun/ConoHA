import './App.css';
import Header from "./components/Header";
import { Routes, Route, Navigate } from 'react-router-dom';
import Vps from './components/Vps';
import Game from './components/Game';
import Fare from './components/Fare';
// import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <div className="content">
        {/* <Sidebar /> */}
        <Routes>
        <Route path="/" element={<Navigate to="/vps"/>} />
        <Route path="/vps" element={<Vps />} />
        <Route path="/game" element={<Game />} />
        <Route path="/fare" element={<Fare/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
