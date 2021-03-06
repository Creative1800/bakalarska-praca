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
  const [message, setMessage] = useState("")
  
 
  useEffect(() => {
    Axios.get("http://localhost:3001/login")
    .then((response) => {
      if (response.data.loggedIn === true){
        setUsername(response.data.user)
      } 
    })
  }, [])

  const isUserLoggedIn = () => {
    if (username !== '') {
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
          <p className='notebook--p notebook--p3' >Odoslan??</p> :
          <p className='notebook--p notebook--p4' >Neodoslan??</p>
        }
        { props.isSent ?
          <button 
            className='notebook--button' 
            onClick={() => {
              setMessage(`Zvolen?? miestnos?? u?? bola odoslan??!`)
              setModalShow(true)
              }
            }
          >
            Vst??pi?? do testu
          </button> :
           <button 
            onClick={() => {
              isTestActive() ?
              isUserLoggedIn() :
              setMessage(`Test ${props.testCounter} je neakt??vny!`)
              setModalShow(true)
              //alert(`Test ${props.testCounter} je neakt??vny!`)
            }} 
            className='notebook--button'
          >
            Vst??pi?? do testu
          </button>
          
        }
        < UniversalModal
          show={modalShow}
          color={"text-danger"}
          message={message}
          onHide={() => setModalShow(false)}
        />
      </div>
    </div>
  )
}

export default Notebook