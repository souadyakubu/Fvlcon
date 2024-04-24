import { Routes, Route } from 'react-router-dom';

import SignUp from './pages/Signup';
import VerificationPage from './components/VerificationPage';
import ResetPassword from './components/resetPassword';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/gh" element={<VerificationPage />} />
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/r' element={<ResetPassword/>} />
          <Route path='/' element={<Login/>} />
        </Routes>
    </div>
  );
}

export default App;
