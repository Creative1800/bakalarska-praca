import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import '../styles/App.css';

const ActiveUsers = (props) => {
  const [responseData, setResponseData] = useState({data: []});



  useEffect(() => {
    const  interval = setInterval(async () => {
      await Axios.post("http://localhost:3001/activeusers", {
        id: props.id
      })
      .then((response) => {
        let data = response.data
        setResponseData({data: data});
      }) 
    }, 3000);
    return () => clearInterval(interval);
  }, []); 

  let activeUser = []
  if(responseData.data.length > 0) {
    activeUser = responseData.data.map(item => <p key={item.username}>{item.username}</p> )
  }  

  return (
    <div className='vr--active--users' >
      <h2 className='active--users--header'>Aktívni študenti</h2>
      {activeUser}
    </div>
  )
}

export default ActiveUsers