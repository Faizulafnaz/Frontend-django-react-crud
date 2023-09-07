import './App.css';
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import { Route, Router, Routes} from 'react-router-dom'
import Header from './components/Header';
import PrivateRoute from './utils/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    
    <div>

        <Header />
      <Routes>
        <Route  path="/" element={<PrivateRoute />} exact />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/admin" element={<AdminPage/>} />
      </Routes>
    </div>
  );
}

export default App;
