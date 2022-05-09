import Axios from 'axios';
import React, { useEffect, useState } from 'react'

import { useParams, useHistory, useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar';
import VRoomContent from '../components/VRoomContent';
import '../styles/App.css';
import { socket } from '../App'


const VirtualRoomPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [vRoomData, setVRoomData] = useState();
  //const [socket, setSocket] = useState(null)
  //const [currentVRoom, setCurrentVRoom] = useState();

  const [questCount, setQuestCount] = useState(0);
  const [isLoading, setLoading] = useState(true);


  
  var input = navigator.onLine ;
  //console.log(window.location.href, params.id, input)
  
  // ----------------------------------------------

  const [room, setRoom] = useState((params.id).toString());
  const [users, updateUsers] = useState([])
  const [ username, setUsername ] = useState("")

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("received")
      setMessageReceived(data.message);
    });
  }, [socket]);

  useEffect(()=> {
    socket.on('questionChange', function(data) {
      if(data.vRoomId === params.id) {
        setCurrentQuestion(data.current_question)
      }
    })
    /* socket.on('connect', ()=>console.log(socket.id))
    socket.on('connect_error', ()=>{
      setTimeout(()=>socket.connect(),5000)
    })
    socket.on('time', (data)=>setTime(data))
    socket.on('disconnect',()=>setTime('server disconnected')) */
    
  },[])

  useEffect(() => {
    socket.on("joined", (data) => {
      updateUsers(data.users);
      setUsername(data.username)
      console.log(data)
    })
  },[socket])

  window.addEventListener("beforeunload", function (event) {
    console.log("unload has begun", event) 
  });

  // ----------------------------------------------
  

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
    picsArray[id] = name
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

  const handleNavigate = () => {
    socket.emit("left_room", { 
      room: (params.id).toString(), 
      username: username
    });
    navigate("/")
  }


  return (
    <div className='page'>
      <Navbar />
      <div>
        <button onClick={handleNavigate}>Domov</button>
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
      />
    </div>
  )
}

export default VirtualRoomPage