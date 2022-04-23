import React, { useState } from "react";
import Axios from 'axios';
import '../styles/Login.css';
import { BsPerson } from "react-icons/bs"; 
import { AiFillLock } from "react-icons/ai";

function Register(props) {
  const [usernameReg, setUsernameReg] = useState("")
  const [passwordReg, setPasswordReg] = useState("")

  const register = () => {
    Axios.post('http://localhost:3001/register', {
      username: usernameReg,
      password: passwordReg, 
    }).then((response)=> {
      console.log(response);
    })
  }

  return (
    <div className="login--form">
      <h2 className="login--heading">Registrácia</h2>
      <div className="form--inputs">
        <div className="form--input">
          <BsPerson className="form--input--icon"/>
          <input 
            type="text" 
            className="login--from-input" 
            placeholder="Prihlasovacie meno"
            onChange={(e) => {
              setUsernameReg(e.target.value);
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
              setPasswordReg(e.target.value);
            }} 
          />
        </div>
      </div>
      <div className="form--clickable">
        <button onClick={register} className="login--register--button">Registrovať</button>
      </div>
    </div>
  )
}

export default Register