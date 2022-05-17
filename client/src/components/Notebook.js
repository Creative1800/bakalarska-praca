import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../styles/App.css';
import { socket } from '../App'
import UniversalModal from './universalModal'

const Notebook = (props) => {
  let navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const startDate = new Date(props.startTime).toLocaleDateString('uk');
  const startTime = new Date(props.startTime);
  
  const endDate = new Date(props.endTime).toLocaleDateString('uk');
  const endTime = new Date(props.endTime);
  const startDateTime = `${startDate} ${startTime.getHours()}:${startTime.getMinutes()}`; 
  const endDateTime = `${endDate} ${endTime.getHours()}:${endTime.getMinutes()}`; 

  const [modalShow, setModalShow] = React.useState(false);
  
 
  useEffect(() => {
    Axios.get("http://localhost:3001/login")
    .then((response) => {
      if (response.data.loggedIn === true){
        setUsername(response.data.user)
      } 
    })
  }, [])

  const isUserLoggedIn = () => {
    if (username != '') {
/*       Axios.post("http://localhost:3001/activeusers/1", {
        user: username,
        vRoomId: props.id
      }) */
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
      Axios.post("http://localhost:3001/vroom/activeusers/add",{
        id: props.id,
        username: username
      })
    }
  };

  const isTestActive = () => {
    const currentTime = new Date()
    if(currentTime >= startTime && currentTime <= endTime){
      return true
    }
    return false
  }
  
  return (
    <div className='notebook' >
      <div className='notebook--context'>
        <h2 className='notebook--h2' >TEST {props.testCounter}</h2>
        <p className='notebook--p notebook--p1' >
          <span className='from--to'>OD:</span> {startDateTime}
        </p>
        <p className='notebook--p notebook--p2' >
          <span className='from--to'>DO:</span> {endDateTime}
        </p>
        { props.isSent ?
          <p className='notebook--p notebook--p3' >Odoslané</p> :
          <p className='notebook--p notebook--p4' >Neodoslané</p>
        }
        { props.isSent ?
          <button className='notebook--button' onClick={() => setModalShow(true)}>
            Vstúpiť do testu
          </button> :
           <button 
            onClick={() => {
              isTestActive() ?
              isUserLoggedIn() :
              alert(`Test ${props.testCounter} je neaktívny!`)
            }} 
            className='notebook--button'
          >
            Vstúpiť do testu
          </button>
          
        }
        < UniversalModal
          show={modalShow}
          color={"text-danger"}
          message={"Zvolená miestnosť už bola odoslaná!"}
          onHide={() => setModalShow(false)}
        />
      </div>
    </div>
  )
}

export default Notebook