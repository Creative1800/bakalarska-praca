import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/App.css';

const Question = (props) => {
  const [vRoomData, setVRoomData] = useState();
  const [ questionContent, setQuestionContent ] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    Axios.post("http://localhost:3001/question",{
      id: props.vRoomId
    })
    .then((response) => {
      setVRoomData(response.data);
      setLoading(false)
    })
  }, [])

  if(isLoading) {
    return (
      <div className='vr--main--question'>
    </div>
    )
  }
  
  /* if(vRoomData[props.questionNumber] != undefined){
    console.log(vRoomData[props.questionNumber].question_content.type)
  } */

  console.log(vRoomData)
  
  /* if(vRoomData[props.questionNumber]
    .question_content
    .type === 'text' ) {
      console.log(vRoomData[props.questionNumber].question_content.content)
      const daata = vRoomData[props.questionNumber].question_content.content.map(item => item)
  } */
    
    
  //const daata = questionContent.map(item => item)

  

  return (
    <div className='vr--main--question'>
      {props.questionNumber}
      {/* daata */}
    </div>
  )
}

export default Question


/* {
  "type": text/obrazok,
  content: []
    item: {
      ques: vlk,
      answ: vlkovy
    },
    item: {
      ques: vlk,
      answ: vlkovy
    }
  }
} */
/* {
  "type": "text",
  "content": {
    "item": {
      "ques": "vlk",
      "answ": "vlkovy"
    },
    "item": {
      "ques": "vlk",
      "answ": "vlkovy"
    }
  }
} */