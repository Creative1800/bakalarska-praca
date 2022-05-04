import React from 'react';
import '../styles/App.css';

const TestInfo = (props) => {
  let questionArray = []
  for(let i = 1 ; i <= props.questionCount; i++) {
    questionArray.push(i)
  }

  const question = questionArray.map((item) => {
    return (
      item - 1 != props.currentQuestion ?
      <li key={item}>{item}</li>
      : 
      <li 
        className='current--question' 
        key={item}
      >{item}</li>
    )
  })

  return (
    <aside className='vr--info'>
      <h5 className='info--header'>Navigácia testu</h5>
      <ul className='info--list'>
        {question}
      </ul>
    </aside>
  )
}

export default TestInfo