import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import '../styles/App.css';

const ActiveUsers = (props) => {

  let listOfActiveUsers = []

  if(props.activeUsers.length > 0) {
    listOfActiveUsers = props.activeUsers.map(item => <p key={item.id}>{item.username}</p>)
  }  

  return (
    <div className='vr--active--users' >
      <h5 className='active--users--header'>Aktívni študenti</h5>
      {listOfActiveUsers}
    </div>
  )
}

export default ActiveUsers