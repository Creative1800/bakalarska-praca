import Axios from 'axios';
import React, { useEffect, useState } from 'react'

import { useNavigate, useParams} from 'react-router-dom'
import ActiveUsers from '../components/ActiveUsers';
import InputModal from '../components/InputModal';
import Navbar from '../components/Navbar';
import Question from '../components/Question';
import Solution from '../components/Solution';
import TestInfo from '../components/TestInfo';
import '../styles/App.css';

const VirtualRoomPage = (props) => {
  const params = useParams();
  const [questionNumber, setQuestionNumber] = useState(0);
  const [vRoomData, setVRoomData] = useState();
  const [questCount, setQuestCount] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [ modalPositions, setModalPositions ] = useState([])
  const [ picNameFromModal, setPicNameFromModal ] = useState('');
  const [ inputId, setInputId ] = useState();

  let picsArray = [];

  



  useEffect(() => {
    Axios.post("http://localhost:3001/question",{
      id: params.id
    })
    .then((response) => {
      setVRoomData(response.data);
      setLoading(false)
      setQuestCount(response.data.length)
    })
  }, [])

  if(isLoading) {
    return (
      <div className='vr--main--question'>
        
      </div>
    )
  }

  const toggleModal = (bottomPosition, leftPosition, inputId) => {
    setIsModalOpened(prevState => !prevState)
    setModalPositions([leftPosition, bottomPosition]);
    setInputId(inputId)
  }

  const getPicNameIdFromModal = (name, id) => {
    setPicNameFromModal([name, id])
    picsArray[id] = name
    console.log(name, id, picsArray)
  }
  
  function addQuestNumber() {
    setQuestionNumber(prevCount => (prevCount < questCount - 1)  ? prevCount + 1 : prevCount)
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
        <TestInfo 
          currentQuestion={questionNumber}
          questionCount={questCount}
        />
        
        <main className='vr--main'>
          <Question
            questionNumber={questionNumber}
            questionContent={vRoomData[questionNumber].question_content}
          /> 
          { isModalOpened ?
            <InputModal  
              piktogramList={vRoomData[questionNumber].question_content.content}
              isModalOpened={isModalOpened}
              toggleModal={toggleModal}
              modalPositions={modalPositions}
              getPicNameIdFromModal={getPicNameIdFromModal}
              inputId={inputId}
              
            />
            : <></>
          }
          <Solution
            toggleModal={toggleModal}
            addQuestNumber={addQuestNumber} 
            questionNumber={questionNumber}
            questionContent={vRoomData[questionNumber].question_content}
            picNameFromModal={picNameFromModal}
            picsArray={picsArray}
          />
        </main>
        <ActiveUsers  
          id={params.id}
        />
      </div>
    </div>
  )
}

export default VirtualRoomPage