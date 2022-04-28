import { Route, Routes }  from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import MainPage from '../pages/MainPage';
import NotFoundPage from '../pages/NotFoundPage';
import RegistrationPage from '../pages/RegistrationPage';
import VirtualRoomPage from '../pages/VirtualRoomPage';
import ProtectedRoutes from './ProtectedRoutes';

const Views = () => {

  return (
    <Routes>
        <Route path="/register" element={<RegistrationPage />} /> 
        <Route path="/login" element={<LoginPage  />} /> 
        <Route element={<ProtectedRoutes />}>
          <Route 
            path="/" 
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