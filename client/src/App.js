import React from 'react';
import './styles/App.css';
import './styles/custom.scss';
import Login from './components/Login';
import Register from './components/Register';


function App() {

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 ">
      <Register />
      <Login />
    </ div>
  );
}

export default App;
