import { Routes, Route } from 'react-router-dom';

import SignUp from './pages/Signup';
import VerificationPage from './components/VerificationPage';
import ResetPassword from './components/resetPassword';
import Login from './pages/Login';

import Dashboard from './pages/Dashboard';


function App() {
  return (
    <div className="h-[100vh]">
      <Routes>
          <Route path="/email-verification" element={<VerificationPage />} />
          <Route path='/signuphiddenfromusers' element={<SignUp/>}/>
          <Route path='/reset-password' element={<ResetPassword/>} />
          <Route path='/' element={<Login/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
    </div>
  );
}

export default App;
