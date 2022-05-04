import React, { useEffect, useState } from 'react';
import '../styles/App.css';

const Question = (props) => {

  return (
    <>
    { props.questionContent
      .type ? 
      <div className='vr--main--question'>
      {props.questionContent.question}
      </div>
      : <></>
    }
    </>
  )
}

export default Question