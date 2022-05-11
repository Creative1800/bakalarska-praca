import React, { useEffect, useState } from 'react'
import insertImage from '../assets/1.png';
import '../styles/InputModal.scss';

const Input = (props) => {
  const [disabledInput, setDisabledInput] = useState(false);
  const [disabledPicInput, setDisabledPicInput] = useState(false);
  const [ inputValue, setInputValue ] = useState(props.solutionArray)


  useEffect(() => {
    setInputValue(props.solutionArray)
  }, [props.solutionArray])  

  const el = document.getElementsByClassName('input--input')
  if(el[props.id]) {
    el[props.id].onblur = function() { // not focused
      props.handleInputClick(props.id, false)
      props.updateInputValue(props.id)
    };
  
    el[props.id].onfocus = function() { // focused
      props.handleInputClick(props.id, true)
    };
  }

  useEffect(() => {
    const el = document.getElementsByClassName('input--img')
    if(props.isModalOpenedArray) {
      if( props.isModalOpenedArray.isInteracted && 
        props.isModalOpenedArray.userId === props.userId) {

          setDisabledPicInput(false) // interacted by me
          el[props.id].style.opacity= "1"
          el[props.id].style.cursor= "pointer";
          
      } else if(props.isModalOpenedArray.isInteracted && 
        props.isModalOpenedArray.userId !== props.userId) {

        setDisabledPicInput(true)  // interacted by somebody else
        el[props.id].style.opacity= "0.25"
        el[props.id].style.cursor= "not-allowed";

        
      } else if(!props.isModalOpenedArray.isInteracted) {

        setDisabledPicInput(false) // not interacted 
        el[props.id].style.opacity= "1"
        el[props.id].style.cursor= "pointer";
      }
    }
  }, [props.isModalOpenedArray])
    
  useEffect(() => {
    if(props.isInputInteracted) {
      if( props.isInputInteracted.isInteracted && 
        props.isInputInteracted.userId === props.userId) {
          setDisabledInput(false) // interacted by me
          
      } else if(props.isInputInteracted.isInteracted && 
        props.isInputInteracted.userId !== props.userId) {
          setDisabledInput(true)  // interacted by somebody else

      } else if(!props.isInputInteracted.isInteracted) {
          setDisabledInput(false) // not interacted 
      }
    }
  }, [props.isInputInteracted])

  const getInputValue = (event)=>{
    const inputValue = event.target.value;
    props.handleChange(props.id, inputValue);
  };

  const handle = () => {
    const elem = document.getElementsByClassName("input--comp");
    let rect = elem[props.id].getBoundingClientRect();
    props.toggleModal(rect.bottom, rect.left, props.id)
    
  }

  return (
    <>
    { props.questionType ?
      <div  className='input--comp'>
        { props.picsArray && props.picsArray[props.id] !== undefined ?
          <img 
            onClick={disabledPicInput ? null : handle} 
            className='input--img input--img--inserted' 
            id='four'
            src={require(`../assets/piktograms/${props.picsArray[props.id]}.png`)}
          />
          :
          <img 
            onClick={disabledPicInput ? null : handle} 
            className='input--img input--insert--image'
            id='four'
            src={insertImage}
          />
        }
        <p className='input--p'>{props.inputContent.text}</p>
      </div>
      :
      <div className='input--comp'>
        <img  
          className='input--img' 
          src={require(`../assets/piktograms/${props.inputContent.pic}.png`)} 
          alt="piktogram" 
        />
        <input 
          onChange={getInputValue} 
          value={inputValue ? inputValue : ""}
          disabled={disabledInput}
          className='input--input' 
          />
      </div>
    }
    </>
  )
}

export default Input