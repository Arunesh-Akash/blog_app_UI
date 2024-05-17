import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Otp from './components/Otp';
import Dashboard from './components/Dashboard';
import UserProvider from './Context/UserContext'

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/otp' element={<Otp />} />
            <Route path='/home' element={<Dashboard />} />
          </Routes>
        </BrowserRouter>

      </UserProvider>
    </>
  );
}

export default App;
