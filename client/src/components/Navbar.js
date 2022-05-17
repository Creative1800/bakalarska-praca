import React from "react";
import { useEffect, useState } from 'react';
import Axios from 'axios';
import '../styles/App.css';
import img from '../assets/boy.jpg';
import { useNavigate } from "react-router-dom";

function Navbar(props) {
  const [username, setUsername] = useState('');
  Axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const logout = () => {

    Axios.delete('http://localhost:3001/login')
    .then((response)=> {
      console.log(response)
      if(response.data === "") {
        if(props.handleNavigate) {
          props.handleNavigate(false);
        }
        navigate("/login");
      } else {
        console.log("Odhlásenie neúspešné!")
      }
    })
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/login")
    .then((response) => {
      if (response.data.loggedIn === true){
        setUsername(response.data.user)
      } 
    })
  }, [])

  return (
    <div className="navbar">
      <div className="navbar-context">
        <div className="navbar--user--info">
          <img className="navbar--user--avatar" src={img} alt="avatar" />
          <h2 className="navbar--user--name" >
            {username.charAt(0).toUpperCase() + username.slice(1)}
          </h2>
        </div>
        <button onClick={logout} className="navbar--sign-out--button">Odhlásiť sa</button>
      </div>
    </div>
  )
}

export default Navbar
