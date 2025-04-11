import './App.css';
import { useEffect } from 'react';
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages'
import Projects from './pages/projects'

function App() {
  useEffect(() => {
    document.title = "MaxFlorescence"
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/projects/' element={<Projects />} />
      </Routes>
    </Router>
  );
}

export default App;
