import Axios from 'axios';
import React, { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import ActiveUsers from '../components/ActiveUsers';
import Navbar from '../components/Navbar';
import Question from '../components/Question';
import Solution from '../components/Solution';
import TestInfo from '../components/TestInfo';
import '../styles/App.css';

const VirtualRoomPage = (props) => {
  const params = useParams();
  const [questionNumber, setQuestionNumber] = useState(0);
  
  
  
  function addQuestNumber() {
    setQuestionNumber(prevCount => prevCount + 1)
  }

  function subQuestNumber() {
    setQuestionNumber(prevCount => prevCount > 0 ? prevCount - 1 : prevCount)
  }

  

  return (
    <div className='page'>
      <Navbar />
      <div>
        <button onClick={subQuestNumber}>predchazajuca otazka</button>
        <button onClick={addQuestNumber}>dalsia otazka</button>
      </div>
      <div className='vr--page'>
        <TestInfo />
        
        <main className='vr--main'>
          <Question
            questionNumber={questionNumber}
            vRoomId={params.id}
          /> 
          <Solution />
        </main>
        <ActiveUsers  
          id={params.id}
        />
      </div>
    </div>
  )
}

export default VirtualRoomPage