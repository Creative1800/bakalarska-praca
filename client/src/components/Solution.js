import '../styles/App.css';
import Input from './Input';
import React, { useEffect, useState } from 'react'
import { socket } from '../App'
import UsersModal from '../components/UsersModal'
import UniversalModal from '../components/universalModal'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const Solution = (props) => {
  const navigate = useNavigate();
  let inputCounter = -1;
  let correctSolutionCounter = 0;
  let correctSolutionArray = [];
  const [isInputEmpty, setIsInputEmpty] = useState(false)
  const [isInputInteracted, setIsInputInteracted ] = useState([])
  const [modalShow, setModalShow] = useState(false);
  const [universalModalShow, setUniversalModalShow] = useState(false);
  const [ message, setMessage] = useState("")
  const [ color, setColor] = useState("")

  useEffect(() => {
    socket.on('questionChanged', (data) => {
      props.updatePicsArray(data.solutionArray)
      props.updateSolutionArray(data.solutionArray)
    })
  }, [props.picsArray, props.solutionArray])

  useEffect(()=> {
    socket.on('inputClick', function(data) {
      if(data.isInputInteracted[data.inputId].room === (props.vRoomId).toString()) {
        setIsInputInteracted(data.isInputInteracted) 
      }
    })
   
  },[socket]) 
  
  useEffect(()=> {
    socket.on('inputChange', function(data) {
      props.updateSolutionArray(data.solutionArray)
    })   
  },[socket]) 
  

  useEffect(()=> {
    socket.on('showUniversalModal', function(data) {
      console.log(data)
      setUniversalModalShow(true)
      setMessage(data.message)
      setColor(data.color)
    })    
  },[message, universalModalShow])
  
  useEffect(()=> {
    socket.on('showModal', function(data) {
      setModalShow(true)
    })    
  },[ modalShow])

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
    let newArr = [...props.solutionArray];
    newArr[id] = inputValue;
    props.updateSolutionArray(newArr);
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
    /* if(props.questionContent.type) {
      socket.emit(
        'inputChange', {  
          questionType: props.questionContent.type,
          room: (props.vRoomId).toString(),
          inputId: id,
          solutionArray: props.picsArray 
      })
    } else { */
      socket.emit(
        'inputChange', {  
          questionType: props.questionContent.type,
          room: (props.vRoomId).toString(),
          inputId: id,
          inputValue: props.solutionArray[id],
          solutionArray: props.solutionArray 
      })
    //}

      
  }

  const checkSolutions = () => {
    const areArraysSame = compareArrays();

    if(areArraysSame) {
      props.addQuestNumber()
      Array.from(document.querySelectorAll("input")).forEach(
        input => (input.value = "")
      );
      if(props.currentQuestion === (props.questCount - 1)) {
        socket.emit('showModal', {  
          room: props.vRoomId
        })
      } else {
        socket.emit('showUniversalModal', {  
          room: props.vRoomId,
          message: "Riešenie je správne!",
          color: "text-secondary"
        })
      }
    } else {
      socket.emit('showUniversalModal', {  
        room: props.vRoomId,
        message: "Riešenie nie je správne!",
        color: "text-danger"
      })
    }
  }
  
  const compareArrays = () => {
    for (let i = 0; i < correctSolutionArray.length; ++i) {
      if (!props.questionContent.type) {
        if (props.solutionArray.length === 0) return false
        if (props.solutionArray[i] === undefined) return false
        if ((props.solutionArray[i].toLowerCase()).replace(/\s/g,'') 
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
        solutionArray={props.solutionArray}
        updateInputValue={updateInputValue}
        isModalOpenedArray={props.isModalOpenedArray[inputCounter]}
        />
        )
  })
  
  const processOnHide = () => {
    setModalShow(false)
    
    Axios.post("http://localhost:3001/vroom/issent",{
      id: props.vRoomId
    })

    navigate("/")
  }
      

  return (
    <div className='vr--main--solution'>
      <UsersModal 
        show={modalShow}
        onHide={processOnHide}
        activeStudents={props.activeStudents}
      />
      < UniversalModal
          show={universalModalShow}
          color={color}
          message={message}
          onHide={() => setUniversalModalShow(false)}
        />
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