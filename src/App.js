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
      <div className='min-h-screen bg-slate-50'>
      <NavigationBar setMenuOpen={setMenuOpen}/>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route path='*' element={<ErrorPage/>} />
      </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;
