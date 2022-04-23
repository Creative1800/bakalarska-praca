import React, { useState } from "react";
import Axios from 'axios';
import '../styles/Login.css';
import { BsPerson } from "react-icons/bs"; 
import { AiFillLock } from "react-icons/ai";

function Login(props) {
  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const login = () => {
    Axios.post('http://localhost:3001/login', {
      username: usernameLog,
      password: passwordLog, 
    }).then((response)=> {
      console.log(response);
    })
  }

  return (
    <div className="login--form">
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
        <button onClick={login} className="login--register--button">Prihlásiť</button>
        <a className="register--form--link">Zaregistrovať sa</a>
      </div>
      <h1>{loginStatus}</h1>
    </div>
  )
}

export default Login