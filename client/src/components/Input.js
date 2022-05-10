import React, { useEffect, useState } from 'react'
import insertImage from '../assets/1.png';
import '../styles/InputModal.scss';

const Input = (props) => {
  const [disabledInput, setDisabledInput] = useState(false);

 
  useEffect(() => {
    const el = document.getElementsByClassName('input--input')

    if(el[props.id]) {
      el[props.id].onblur = function() { // input if not focused
        props.handleInputClick(props.id, false)
        props.updateInputValue(props.id)
      };
    
      el[props.id].onfocus = function() { // input if focused
        props.handleInputClick(props.id, true)
      };
    }
    
  }, [])

  useEffect(() => {
    if(props.isInputInteracted) {
      if( props.isInputInteracted.isInteracted && 
        props.isInputInteracted.username === props.username) {
          setDisabledInput(false) // interacted by me
      } else if(props.isInputInteracted.isInteracted && 
        props.isInputInteracted.username !== props.username) {
          setDisabledInput(true) // interacte by somebody else
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
            onClick={handle} 
            className='input--img input--img--inserted' 
            id='four'
            src={require(`../assets/piktograms/${props.picsArray[props.id]}.png`)}
          />
          :
          <img 
            onClick={handle} 
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
        { disabledInput ?
          <input 
          defaultValue={props.solutionArray}
          disabled={true}
          className='input--input' 
          />
          :
          <input 
          onChange={getInputValue}
          disabled={false}
          className='input--input' 
          />
        }
      </div>
    }
    </>
  )
}

export default Input