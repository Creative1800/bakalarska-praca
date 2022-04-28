import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../styles/App.css';
import { BsPerson } from "react-icons/bs"; 
import { AiFillLock } from "react-icons/ai";
import Alert from 'react-bootstrap/Alert';

function Login(props) {
  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");
  const navigate = useNavigate();

  const [loginStatus, setLoginStatus] = useState(false);
  const [showDangerAlert, setShowDangerAlert] = useState(false);

  Axios.defaults.withCredentials = true;

  const login = () => {
    Axios.post('http://localhost:3001/login', {
      username: usernameLog,
      password: passwordLog, 
    }).then((response) => {
      if(response.data.message) {
        setLoginStatus(false)
        setShowDangerAlert(true)
      } else {
        setLoginStatus(true)
        setShowDangerAlert(false)
        navigate("/");
      }
    })
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/login")
    .then((response) => {
      if (response.data.loggedIn === true){
        setLoginStatus(true);
      } 
    })
  }, [])

  return (
    <div className="login--form">
      { showDangerAlert === true 
        ? <div className="alert--message">
            <Alert variant="danger" className="w-100" onClose={() => setShowDangerAlert(false)} dismissible>
              Zlé meno alebo heslo!
            </Alert>
          </div>
        : null
      }
      <div className="login--context">
        <h2 className="login--heading">Prihlásenie</h2>
        <div className="form--inputs">
          <div className="form--input">
            <BsPerson className="form--input--icon"/>
            <input 
              type="text" 
              className="login--from-input" 
              placeholder="Prihlasovacie meno"
              onChange={(e) => {
                setUsernameLog(e.target.value);
              }}  
            />
          </div>
          <div className="form--input">
            <AiFillLock className="form--input--icon" />
            <input 
              type="password" 
              className="login--from-input" 
              placeholder="Heslo"
              onChange={(e) => {
                setPasswordLog(e.target.value);
              }} 
            />
          </div>
        </div>
        <div className="form--clickable">
          <button onClick={login}  className="login--register--button">Prihlásiť</button>
          
          <Link to="/register" className="register--form--link">Zaregistrovať sa</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
//<h1>{loginStatus}</h1>