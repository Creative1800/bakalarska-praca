import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from 'react';
import Axios from 'axios';

const ProtectedRoutes =  () => {
  const [loginStatus, setLoginStatus] = useState(false);
  let isAuth = true
  Axios.defaults.withCredentials = true;
  
  useEffect(() => {
    const getData = async () => {
      const res = await Axios.get("http://localhost:3001/login");
      setLoginStatus(res.data);
    };
    getData();
  }, []);
  
  if(loginStatus){
    isAuth = loginStatus.loggedIn
  }
  
  return isAuth ? <Outlet/> : <Navigate to="/login" />;
}

export default ProtectedRoutes