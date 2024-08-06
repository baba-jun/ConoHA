import './App.css';
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Vps from './components/Vps';
import Game from './components/Game';
// import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <div className="content">
        {/* <Sidebar /> */}
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/vps" element={<Vps />} />
          <Route path="/game" element={<Game />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
