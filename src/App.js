import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import NavigationBar from './components/NavigationBar';
import { useState } from 'react';
import ErrorPage from './pages/ErrorPage';

function App() {
  const [menuOpen, setMenuOpen] = useState(false)


  return (
    <BrowserRouter>
      <NavigationBar setMenuOpen={setMenuOpen}/>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route path='*' element={<ErrorPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
