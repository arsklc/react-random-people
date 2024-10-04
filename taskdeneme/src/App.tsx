import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Home from './pages/Home';
import Random from './pages/Random';
import Location from './pages/Location';
import { GenderProvider } from './context/GenderContext'; 
import './App.css';

const App = () => {
  return (
    <GenderProvider> 
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/random" element={<Random />} />
          <Route path="/location" element={<Location />} />
        </Routes>
        <Footer />
      </Router>
    </GenderProvider>
  );
};

export default App;

