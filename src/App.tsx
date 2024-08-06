import './App.css';
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import { Routes, Route } from 'react-router-dom';
import Vps from './components/Vps';
import Game from './components/Game';
// import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <div className="content">
        {/* <Sidebar /> */}
        <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/vps" element={<Vps />} />
        <Route path="/game" element={<Game />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
