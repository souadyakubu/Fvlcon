import { Routes, Route } from 'react-router-dom';
import Logo from './pages/Logo'; 
import CompanyCodePage from './pages/CompanyCodePage';
import SignUp from './pages/Signup';
import VerificationPage from './components/VerificationPage';
import ResetPassword from './components/resetPassword'; // Correct case sensitivity if needed
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="h-[100vh]">
      <Routes>
        <Route path="/" element={<Logo />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/company-code" element={<CompanyCodePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verification" element={<VerificationPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        
      </Routes>
    </div>
  );
}

export default App;
