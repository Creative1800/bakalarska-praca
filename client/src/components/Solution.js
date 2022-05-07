import '../styles/App.css';
import Input from './Input';
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import { Axios } from 'axios';

const Solution = (props) => {
  let inputCounter = -1;
  //let solutionArray = []
  const [solutionArray, updateSolutionArray ] = useState([])
  let correctSolutionCounter = 0;
  let correctSolutionArray = [];
  const [isInputEmpty, setIsInputEmpty] = useState(false)
  const [isInputInteracted, setIsInputInteracted ] = useState([])

  const socket = io('http://localhost:5000')


  useEffect(()=> {
    socket.emit("USER_ONLINE", props.username);

    socket.on('inputClick', function(data) {
      if(data.isInputInteracted[data.inputId].vRoomId === props.vRoomId) {
        setIsInputInteracted(data.isInputInteracted) 
      }
    })
    socket.on('inputChange', function(data) {
      console.log("data: ", data.isInputInteracted[data.inputId].vRoomId)
      if(data.isInputInteracted[data.inputId].vRoomId === props.vRoomId) {
        updateSolutionArray(data.solutionArray)
      }
    })    
  },[socket, props.username])
  
  const handleChange = (id, inputValue) => {
    //solutionArray[id] = inputValue;
    let newArr = [...solutionArray];
    newArr[id] = inputValue;
    updateSolutionArray(newArr);
  }

  props.questionContent      
      .content.map(item => {
        if(props.questionContent.type) {
          correctSolutionArray[correctSolutionCounter] = item.pic
          correctSolutionCounter += 1
        } else {
          correctSolutionArray[correctSolutionCounter] = item.text
          correctSolutionCounter += 1
        }
  });

  const updateInputValue = (id) => {
    socket.emit(
      'inputChange', { 
        inputId: id, 
        isInputInteracted: isInputInteracted, 
        picsArray: props.picsArray,
        solutionArray: solutionArray  
    })
  }

  const checkSolutions = () => {
    const areArraysSame = compareArrays();

    if(areArraysSame) {
      alert("Spravne riesenie") 
      props.addQuestNumber()
      Array.from(document.querySelectorAll("input")).forEach(
        input => (input.value = "")
      );
    } else {
      alert("Riesenie nie je spravne")
    }
  }
  
  const compareArrays = () => {
    for (let i = 0; i < correctSolutionArray.length; ++i) {
      if (!props.questionContent.type) {
        if (solutionArray.length === 0) return false
        if (solutionArray[i] === undefined) return false
        if ((solutionArray[i].toLowerCase()).replace(/\s/g,'') 
            !== correctSolutionArray[i].toLowerCase()
          ) {
            return false;
          }
      } else {
        if (props.picsArray[i] !== correctSolutionArray[i].toLowerCase()) {
            return false;
        }
      }
    }
    return true
  }

  const questionData = props
  .questionContent
  .content.map(item => {
    inputCounter += 1
    return (
      <Input 
        key={inputCounter}
        id={inputCounter}
        questionNumber={props.questionNumber}
        questionType={props.questionContent.type}
        inputContent={item}
        handleChange={handleChange}
        piktogramsList={correctSolutionArray}
        toggleModal={props.toggleModal}
        picNameFromModal={props.picNameFromModal}
        picsArray={props.picsArray}
        handleInputClick={handleInputClick}
        isInputEmpty={isInputEmpty}
        setIsInputEmpty={setIsInputEmpty}
        isInputInteracted={isInputInteracted[inputCounter]}
        username={props.username}
        solutionArray={solutionArray[inputCounter]}
        updateInputValue={updateInputValue}
        />
        )
  })
  
  function handleInputClick(id, booleanValue) {

    isInputInteracted[id] = {
      username: props.username,
      isInteracted: booleanValue,
      vRoomId: props.vRoomId 
    } 
    /* Axios.post("http://localhost:3001/inputfield/update", {
      
    })
    .then((response) => {
      if (response.data.loggedIn === true){
        setUsername(response.data.user)
      } 
    }) */
    //console.log(isInputInteracted)
    socket.emit(
      'inputClick', { 
        inputId: id, 
        isInputInteracted: isInputInteracted
    })
  }
      

  return (
    <div className='vr--main--solution'>
      <div className='vr--solution--inputs'>
        {questionData}
      </div>
      <div className='vr--solution--btn--section'>
        <button 
          onClick={checkSolutions} 
          className='vr--solution--btn'
        >
          Skontrolovať odpoveď
        </button>
      </div>
    </div>
  )
}

export default Solution