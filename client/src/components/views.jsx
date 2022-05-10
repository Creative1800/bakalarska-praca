import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate }  from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';
import NotFoundPage from '../pages/NotFoundPage';
import RegistrationPage from '../pages/RegistrationPage';
import VirtualRoomPage from '../pages/VirtualRoomPage';
import ProtectedRoutes from './ProtectedRoutes';

const Views = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.substring(0, location.pathname.lastIndexOf('/')) == "/virtualroom") {
      navigate("/");
    }
  }, []);

  return (
    <Routes>
        <Route path="/register" element={<RegistrationPage />} /> 
        <Route path="/login" element={<LoginPage  />} /> 
        <Route element={<ProtectedRoutes />}>
          <Route 
            exact path="/" 
            element={<MainPage />} 
          /> 
          <Route 
            path="/virtualroom/:id" 
            element={ <VirtualRoomPage /> } 
          /> 
        </Route>
        <Route path="*" element={<NotFoundPage />} /> 
    </Routes>
  )
}

export default Views