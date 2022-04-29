import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Notebook from '../components/Notebook';
import Axios from 'axios';


const MainPage = (props) => {
  const [vRoomData, setVRoomData] = useState([]); 
  let testCounter = 0;

  useEffect(() => {
    Axios.get("http://localhost:3001/virtualrooms")
    .then((response) => {
      setVRoomData(response.data);
    })
  }, [])

  
  
  
  const notebook = vRoomData.map(item => {
    return (
      testCounter += 1,
      <Notebook 
        key={item.id}
        id={item.id}
        testCounter={testCounter}
        startTime={item.start_time}
        endTime={item.end_time}
      />
    )
  })

  return (
    <div className='page'>
      <Navbar />
      <div className='container--div'>
        {notebook}
      </div>
      
    </div>
  )
}

export default MainPage