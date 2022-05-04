import React from 'react';
import '../styles/App.css';
import Input from './Input';

const Solution = (props) => {
  let inputCounter = -1;
  let solutionArray = []
  let correctSolutionCounter = 0;
  let correctSolutionArray = [];
  
  //console.log(props)
  const handleChange = (id, inputValue) => {
    solutionArray[id] = inputValue;
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

  const checkSolutions = () => {
    const areArraysSame = compareArrays();
    if(areArraysSame) {
      alert("Spravne riesenie") 
      props.addQuestNumber()
    } else {
      alert("Riesenie nie je spravne")
    }
  }

  
  const compareArrays = () => {
    for (let i = 0; i < correctSolutionArray.length; ++i) {
      if ((solutionArray[i].toLowerCase()).replace(/\s/g,'') !== correctSolutionArray[i].toLowerCase()) return false;
    }
    return true
  }
  //console.log(props.picNameFromModal)
  //console.log("tu", props.picsArray)
  
  
  
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
        />
        )
      })
      

  return (
    <div className='vr--main--solution'>
      <div className='vr--solution--inputs'>
        {questionData}
      </div>
      <div className='vr--solution--btn--section'>
        <button onClick={checkSolutions} className='vr--solution--btn'>Skontrolovať odpoveď</button>
      </div>
    </div>
  )
}

export default Solution