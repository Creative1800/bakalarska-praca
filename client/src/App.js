import React from 'react';
import Views from './components/views.jsx'
import './styles/App.css';
import './styles/custom.scss';
import io from "socket.io-client";

export const socket = io.connect("http://localhost:5000");


function App() {
  return (
    <Views />
    );
  }
  
export default App;
  {/* <Router> */}
    /* </Router> */

/* <div className="d-flex justify-content-center align-items-center vh-100 ">
  <Register />
  <Login />
</ div> */