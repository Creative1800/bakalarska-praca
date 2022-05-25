import React, { useState } from "react";
import Axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/App.css';
import { BsPerson } from "react-icons/bs"; 
import { AiFillLock } from "react-icons/ai";
import Alert from 'react-bootstrap/Alert';

function Register(props) {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [showDangerAlert, setShowDangerAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const register = async () => {
    await Axios.post('http://localhost:3001/register', {
      username: usernameReg,
      password: passwordReg, 
    }).then((response)=> {
      if(response.data.isRegSuccessful === true) {
        setShowDangerAlert(false)
        setShowSuccessAlert(true)
      } else {
        setShowSuccessAlert(false)
        setShowDangerAlert(true)
      }
    })
  }

  return (
    <div className="login--form">
        { showDangerAlert === true 
          ? <div className="alert--message">
              <Alert variant="danger" className="w-100" onClose={() => setShowDangerAlert(false)} dismissible>
                Používateľské meno je obsadené!
              </Alert>
            </div>
          : null
        }
        { showSuccessAlert === true 
          ? <div className="alert--message">
              <Alert variant="secondary" className="w-100" onClose={() => setShowSuccessAlert(false)} dismissible>
                Registrácia bola úspešná! <br />
                Prosím prihláste sa.
              </Alert>
            </div>
          : null
        }
      <div className="login--context">
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
          <Link to="/login" className="register--form--link">Prihlásiť sa</Link>
        </div>
      </div>
    </div>
  )
}

export default Register