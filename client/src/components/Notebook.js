import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../styles/App.css';
import { socket } from '../App'

const Notebook = (props) => {
  let navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const startDate = new Date(props.startTime).toLocaleDateString('uk');
  const startTime = new Date(props.startTime);
  
  const endDate = new Date(props.endTime).toLocaleDateString('uk');
  const endTime = new Date(props.endTime);
  const startDateTime = `${startDate} ${startTime.getHours()}:${startTime.getMinutes()}`; 
  const endDateTime = `${endDate} ${endTime.getHours()}:${endTime.getMinutes()}`; 
 
  useEffect(() => {
    Axios.get("http://localhost:3001/login")
    .then((response) => {
      if (response.data.loggedIn === true){
        setUsername(response.data.user)
      } 
    })
  }, [])

  const addActiveUser = () => {
    if (username != '') {
      Axios.post("http://localhost:3001/activeusers/1", {
        user: username,
        vRoomId: props.id
      })
      navigate(`/virtualroom/${props.id}`, {state:{username: username}});

      joinRoom()
    } else {
      alert("Prihlaste sa!")
    }
  }

  const joinRoom = () => {
    if ((props.id).toString() !== "") {
      socket.emit("join_room", { 
        room: (props.id).toString(), 
        username: username
      });
    }
  };
  
  return (
    <div className='notebook' >
      <div className='notebook--context'>
        <h2 className='notebook--h2' >TEST {props.testCounter}</h2>
        <p className='notebook--p notebook--p1' >{startDateTime}</p>
        <p className='notebook--p notebook--p2' >{endDateTime}</p>
        <p className='notebook--p notebook--p3' >Neodoslané</p>
        <button 
          onClick={() => {
            addActiveUser()
          }} 
          className='notebook--button'>Vstúpiť do testu</button>
      </div>
    </div>
  )
}

export default Notebook