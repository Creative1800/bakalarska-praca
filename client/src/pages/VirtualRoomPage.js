import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar';
import '../styles/App.css';

const VirtualRoomPage = (props) => {
  const params = useParams();
  
  return (
    <div className='page'>
      <Navbar />
      <div className='vr--page'>
        <aside className='vr--info'>
          qestions
        </aside>
        <main className='vr--main'>
          <div className='vr--main--question'>question</div>
          <div className='vr--main--solution'>solution</div>
        </main>
        <aside className='vr--active--users'>
          active users
        </aside>
      </div>
    </div>
  )
}

export default VirtualRoomPage