import '../styles/App.css';
import Input from './Input';
import React, { useEffect, useState } from 'react'
import { socket } from '../App'

const Solution = (props) => {
  let inputCounter = -1;
  const [solutionArray, updateSolutionArray ] = useState(props.solutionArray)
  let correctSolutionCounter = 0;
  let correctSolutionArray = [];
  const [isInputEmpty, setIsInputEmpty] = useState(false)
  const [isInputInteracted, setIsInputInteracted ] = useState([])


  useEffect(()=> {
    /* socket.on('questionChanged', function(data) {
      updateSolutionArray(data.solutionArray)
    }) */
    socket.on('inputClick', function(data) {
      if(data.isInputInteracted[data.inputId].room === (props.vRoomId).toString()) {
        setIsInputInteracted(data.isInputInteracted) 
      }
    })
    socket.on('inputChange', function(data) {
      //console.log(data.solutionArray)
      updateSolutionArray(data.solutionArray)
    })    
  },[isInputInteracted, solutionArray])

  function handleInputClick(id, booleanValue) {
    let newArr = [...isInputInteracted];
    newArr[id] = {
      username: props.username,
      userId: socket.id,
      isInteracted: booleanValue,
      room: (props.vRoomId).toString(),
    };
    setIsInputInteracted(newArr);

    socket.emit(
      'inputClick', { 
        inputId: id, 
        isInputInteracted: newArr
    })
  }
  
  const handleChange = (id, inputValue) => {
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
    if(props.questionContent.type) {
      socket.emit(
        'inputChange', {  
          questionType: props.questionContent.type,
          room: (props.vRoomId).toString(),
          solutionArray: props.picsArray 
      })
    } else {
      socket.emit(
        'inputChange', {  
          questionType: props.questionContent.type,
          room: (props.vRoomId).toString(),
          solutionArray: solutionArray  
      })
    }
    
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
        userId={socket.id}
        /* username={props.username} */
        solutionArray={solutionArray[inputCounter]}
        updateInputValue={updateInputValue}
        isModalOpenedArray={props.isModalOpenedArray[inputCounter]}
        />
        )
  })
  
  
      

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