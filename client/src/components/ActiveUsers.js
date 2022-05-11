import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import '../styles/App.css';
import { FaUser } from "react-icons/fa";

const ActiveUsers = (props) => {

  let listOfActiveUsers = []

  if(props.activeUsers.length > 0) {
    listOfActiveUsers = props.activeUsers.map(
      item => 
      <p className='active--user--name' key={item.id}>
        <FaUser className='active--user--icon' /> {item.username.charAt(0).toUpperCase() + item.username.slice(1)}
      </p>
    )
  }  

  return (
    <div className='vr--active--users' >
      <h5 className='active--users--header'>Aktívni študenti</h5>
      {listOfActiveUsers}
    </div>
  )
}

export default ActiveUsers