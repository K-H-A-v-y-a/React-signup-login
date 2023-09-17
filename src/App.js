import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/React-signup-login/" element={<Login />} />
        <Route path="/React-signup-login/sign" element={<Signup />} />
        <Route path="/React-signup-login/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



