import React from 'react';
import '../styles/App.css';
import { useNavigate } from 'react-router-dom';

const Notebook = (props) => {
  let navigate = useNavigate();
  const startDate = new Date(props.startTime).toLocaleDateString('uk');
  const startTime = new Date(props.startTime);
  
  const endDate = new Date(props.endTime).toLocaleDateString('uk');
  const endTime = new Date(props.endTime);
  const startDateTime = `${startDate} ${startTime.getHours()}:${startTime.getMinutes()}`; 
  const endDateTime = `${endDate} ${endTime.getHours()}:${endTime.getMinutes()}`; 
 

  
  return (
    <div className='notebook' >
      <div className='notebook--context'>
        <h2 className='notebook--h2' >TEST {props.testCounter}</h2>
        <p className='notebook--p notebook--p1' >{startDateTime}</p>
        <p className='notebook--p notebook--p2' >{endDateTime}</p>
        <p className='notebook--p notebook--p3' >Neodoslané</p>
        <button onClick={() => {
          navigate(`/virtualroom/${props.id}`)
        }} className='notebook--button'>Vstúpiť do testu</button>
      </div>
    </div>
  )
}

export default Notebook