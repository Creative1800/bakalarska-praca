import Axios from 'axios';
import React, { useEffect, useState } from 'react'

import { useParams, useHistory, useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar';
import VRoomContent from '../components/VRoomContent';
import '../styles/App.css';
import { socket } from '../App'


const VirtualRoomPage = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [ picsArray, setPicsArray ] = useState([]);
  
  const [solutionArray, setSolutionArray ] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [vRoomData, setVRoomData] = useState();

  const [questCount, setQuestCount] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const [room, setRoom] = useState((params.id).toString());
  const [users, updateUsers] = useState([])
  const [ username, setUsername ] = useState("")

  useEffect(()=> {
    socket.on('questionChanged', function(data) {
      setCurrentQuestion(data.questionData.current_question)
      setSolutionArray(data.solutionArray)
    })  
  },[])

  useEffect(() => {
    let isMounted = true;
    socket.on("joined", (data) => {
      if(isMounted){
        updateUsers(data.users);
        setUsername(location.state.username)
        setSolutionArray(data.solutionArray)
        console.log("data", data)
        if(data.username === location.state.username) {
          setPicsArray(data.solutionArray)
        }
      } 
    })

    return () => {
      isMounted = false;
    };
  },[socket])

  window.addEventListener("beforeunload", function (event) {
    socket.emit("left_room", { 
      room: (params.id).toString(), 
      username: username
    });
  });

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
  
  useEffect(() => {
    Axios.post("http://localhost:3001/vroom",{
      id: params.id
    })
    .then((response) => {
      setCurrentQuestion(response.data[0].current_question)
    })
  }, [])

  if(isLoading) {
    return (
      <div className='vr--main--question'>
        
      </div>
    )
  }


  let shuffledArrayOfPictograms = [];
  if(vRoomData[currentQuestion]) {
    for(let i = 0; i < vRoomData[currentQuestion].question_content.content.length; i++) {
      shuffledArrayOfPictograms[i] = vRoomData[currentQuestion].question_content.content[i].pic
    }
  }


  const randomModalImages = (array)=>{
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    let uniqueChars = [];
    array.forEach((c) => {
      if (!uniqueChars.includes(c)) {
          uniqueChars.push(c);
      }
    });
    shuffledArrayOfPictograms = uniqueChars
  }

  randomModalImages(shuffledArrayOfPictograms)

  const addPicsArray = (id, name) => {
    let newArr = [...picsArray];
    newArr[id] = name;
    socket.emit(
      'picArrayChange', {  
        questionType: true,
        room: (params.id).toString(),
        solutionArray: newArr
    })
    setPicsArray(newArr);
    //picsArray[id] = name
  }

  const updatePicsArray = (array) => {
    console.log("array: ", array)
    setPicsArray(array)
  }

  function  addQuestNumber() {
    if( currentQuestion < questCount - 1) {
      Axios.post("http://localhost:3001/vroom/cq",{
        id: params.id,
        currentQuestion: currentQuestion + 1
      })
      .then((response) => {
        setCurrentQuestion(response.data[0].current_question)
        socket.emit(
          'questionChange', { 
            current_question: response.data[0].current_question, 
            room
        })
      })
    }
  }

  function subQuestNumber() {
    if( currentQuestion > 0 ) {
      Axios.post("http://localhost:3001/vroom/cq",{
        id: params.id,
        currentQuestion: currentQuestion - 1
      })
      .then((response) => {
        setCurrentQuestion(response.data[0].current_question)

        socket.emit(
          'questionChange', { 
            current_question: response.data[0].current_question, 
            room
        })
      })
    }
  }

  const handleNavigate = (boolean) => {
    socket.emit("left_room", { 
      room: (params.id).toString(), 
      username: username
    });
    if(boolean) {
      navigate("/")
    }
  }

  return (
    <div className='page'>
      <Navbar 
        handleNavigate={handleNavigate}
      />
      <div>
        <button onClick={() => handleNavigate(true)}>Domov</button>
        <button onClick={subQuestNumber}>predchazajuca otazka</button>
        <button onClick={addQuestNumber}>dalsia otazka</button>
      </div>
      <VRoomContent 
        currentQuestion={currentQuestion}
        questCount={questCount}
        vRoomData={vRoomData}
        addQuestNumber={addQuestNumber}
        vRoomId={params.id}
        addPicsArray={addPicsArray}
        picsArray={picsArray}
        shuffledArrayOfPictograms={shuffledArrayOfPictograms}
        activeUsers={users}
        solutionArray={solutionArray}
        updatePicsArray={updatePicsArray}
      />
    </div>
  )
}

export default VirtualRoomPage