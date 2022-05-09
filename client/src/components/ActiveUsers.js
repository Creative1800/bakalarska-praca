import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import '../styles/App.css';

const ActiveUsers = (props) => {
  const [responseData, setResponseData] = useState({data: []});

  /* useEffect(() => {
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
  }, []);  */

  console.log("tu", props.activeUsers.length)

  let activeUser = []
  useEffect(() => {
    console.log("tuuuuu")
    if(props.activeUsers.length > 0) {
    
      activeUser = props.activeUsers.map(item => <p key={item.id}>{item.username}</p> )
      //activeUser = responseData.data.map(item => <p key={item.username}>{item.username}</p> )
    }
  }, [activeUser])
    

  return (
    <div className='vr--active--users' >
      <h5 className='active--users--header'>Aktívni študenti</h5>
      {activeUser}
    </div>
  )
}

export default ActiveUsers