import './App.css';
import Header from "./components/Header";
import MainContent from "./components/MainContent";
// import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <div className="content">
        {/* <Sidebar /> */}
        <MainContent />
      </div>
    </div>
  );
}

export default App;
