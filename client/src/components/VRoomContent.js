import Axios from 'axios';
import React, { useEffect, useState } from 'react'

import ActiveUsers from '../components/ActiveUsers';
import InputModal from '../components/InputModal';
import Question from '../components/Question';
import Solution from '../components/Solution';
import TestInfo from '../components/TestInfo';
import '../styles/App.css';
import { socket } from '../App'

const VRoomContent = (props) => {
  const [username, setUsername] = useState('');
  Axios.defaults.withCredentials = true;

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [ modalPositions, setModalPositions ] = useState([])
  const [ picNameFromModal, setPicNameFromModal ] = useState('');
  const [ inputId, setInputId ] = useState();

  const [ isModalOpenedArray, updateIsModalOpenedArray ] = useState([])


  useEffect(() => {
    Axios.get("http://localhost:3001/login")
    .then((response) => {
      if (response.data.loggedIn === true){
        setUsername(response.data.user)
      } 
    })
  }, [])
  
  useEffect(() => {
    socket.on('picClick', function(data) {
      if(data.isInputInteracted[data.inputId].room === (props.vRoomId).toString()) {
        updateIsModalOpenedArray(data.isInputInteracted) 
      }
    })
  }, [])
  
  useEffect(() => {
    socket.on('picArrayChange', function(data) {
      if(data.room === (props.vRoomId).toString()) {
        props.updatePicsArray(data.solutionArray) 
      }
    })
  }, [])

  
  

  const toggleModal = (bottomPosition, leftPosition, inputId) => {
    setIsModalOpened(prevState => {
      let newArr = [...isModalOpenedArray];
      newArr[inputId] = {
        userId: socket.id,
        isInteracted: !prevState,
        room: (props.vRoomId).toString()
      }

      socket.emit(
        'picClick', { 
          inputId: inputId, 
          isInputInteracted: newArr
      })

      updateIsModalOpenedArray(newArr);
      return ( 
        !prevState
      )
    })
    setModalPositions([leftPosition, bottomPosition]);
    setInputId(inputId)

  }

  const getPicNameIdFromModal = (name, id) => {
    setPicNameFromModal([name, id])
    props.addPicsArray(id, name)
  }

  return (
    <div className='vr--page'>
        <TestInfo 
          currentQuestion={props.currentQuestion}
          questionCount={props.questCount}
        />
        
        <main className='vr--main'>
          <Question
            currentQuestion={props.currentQuestion}
            questionContent={props.vRoomData[props.currentQuestion].question_content}
          /> 
          { isModalOpened ?
            <InputModal  
              piktogramList={props.shuffledArrayOfPictograms}
              isModalOpened={isModalOpened}
              toggleModal={toggleModal}
              modalPositions={modalPositions}
              getPicNameIdFromModal={getPicNameIdFromModal}
              inputId={inputId}
              
            />
            : <></>
          }
          {<Solution
            toggleModal={toggleModal}
            addQuestNumber={props.addQuestNumber} 
            currentQuestion={props.currentQuestion}
            questionContent={props.vRoomData[props.currentQuestion].question_content}
            picNameFromModal={picNameFromModal}
            picsArray={props.picsArray}
            vRoomId={props.vRoomId}
            username={username}
            solutionArray={props.solutionArray}
            isModalOpenedArray={isModalOpenedArray}
            updatePicsArray={props.updatePicsArray}
            updateSolutionArray={props.updateSolutionArray}
          />}
        </main>
        <ActiveUsers  
          id={props.vRoomId}
          activeUsers={props.activeUsers}
        />
      </div>
  )
}

export default VRoomContent