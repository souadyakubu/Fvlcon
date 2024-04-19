import { Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import SignUp from './pages/Signup';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<SignUp />} />
        </Routes>
    </div>
  );
}

export default App;
